import OrderItemModel from "../schema/OrderItem.model";
import OrderModel from "../schema/Order.model";
import { User } from "../libs/types/user";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { Message } from "../libs/Errors";
import { ObjectId } from "mongoose";
import {
  OrderInquiry,
  OrderItemInput,
  OrderUpdateInput,
} from "../libs/types/order";
import { Order } from "../libs/types/order";
import UserService from "./User.service";
import { OrderStatus } from "../libs/enums/order.enum";

class OrderService {
  private readonly orderModel;
  private readonly orderItemModel;
  private readonly userService;

  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
    this.userService = new UserService();
  }

  public async createOrder(
    user: User,
    input: OrderItemInput[]
  ): Promise<Order> {
    const userId = shapeIntoMongooseObjectId(user._id);
    const amount = input.reduce((accumulator: number, item: OrderItemInput) => {
      return accumulator + item.itemPrice * item.itemQuantity;
    }, 0);
    const delivery = amount < 100 ? 5 : 0;

    try {
      const newOrder: Order = await this.orderModel.create({
        orderTotal: amount + delivery,
        orderDelivery: delivery,
        userId: userId,
      });

      const orderId = newOrder._id;
      console.log("orderId:", orderId);
      //TODO: create order Items
      await this.recordOrderItems(orderId, input);

      return newOrder;
    } catch (err) {
      console.log("Error, model:createOrder:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  private async recordOrderItems(
    orderId: ObjectId,
    input: OrderItemInput[]
  ): Promise<void> {
    const promisedList = input.map(async (item: OrderItemInput) => {
      item.orderId = orderId;
      item.poductId = shapeIntoMongooseObjectId(item.poductId);
      await this.orderItemModel.create(item);
      return "INSERTED";
    });

    const orderItemsState = await Promise.all(promisedList);
    console.log("orderItemState:", orderItemsState);
  }

  public async getMyOrders(
    user: User,
    inquiry: OrderInquiry
  ): Promise<Order[]> {
    const userId = shapeIntoMongooseObjectId(user._id);
    const matches = { userId: userId, orderStatus: inquiry.orderStatus };

    const result = await this.orderModel
      .aggregate([
        { $match: matches },
        { $sort: { updatedAt: -1 } },
        { $skip: (inquiry.page - 1) * inquiry.limit },
        { $limit: inquiry.limit },
        {
          $lookup: {
            from: "orderItems",
            localField: "_id",
            foreignField: "orderId",
            as: "orderItems",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.productId",
            foreignField: "_id",
            as: "productData",
          },
        },
      ])
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async orderUpdate(
    user: User,
    input: OrderUpdateInput
  ): Promise<Order> {
    const userId = shapeIntoMongooseObjectId(user._id),
      orderId = shapeIntoMongooseObjectId(input.orderId),
      orderStatus = input.orderStatus;

    const result = await this.orderModel
      .findByIdAndUpdate(
        {
          userId: userId,
          _id: orderId,
        },
        { orderStatus: orderStatus },
        { new: true }
      )
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    if (orderStatus === OrderStatus.PROCESS) {
      await this.userService.addUserPoints(user, 1);
    }
    return result;
  }
}

export default OrderService;
