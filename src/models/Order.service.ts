import OrderItemModel from "../schema/OrderItem.model";
import OrderModel from "../schema/Order.model";
import { User } from "../libs/types/user";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { Message } from "../libs/Errors";
import { ObjectId } from "mongoose";
import { OrderItemInput } from "../libs/types/order";
import { Order } from "../libs/types/order";

class OrderService {
  private readonly orderModel;
  private readonly orderItemModel;

  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
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
}

export default OrderService;