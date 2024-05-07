import { HttpCode } from "../libs/Errors";
import { View, ViewInput } from "../libs/types/view";
import ViewModel from "../schema/View.model";
import { Message } from "../libs/Errors";
import Errors from "../libs/Errors";

class ViewService {
  private readonly viewModel;
  constructor() {
    this.viewModel = ViewModel;
  }

  public async checkViewExistance(input: ViewInput): Promise<View> {
    return await this.viewModel
      .findOne({
        userId: input.userId,
        viewRefId: input.viewRefId,
      })
      .exec();
  }

  public async insertUserView(input: ViewInput): Promise<View> {
    try {
      return await this.viewModel.create(input);
    } catch (err) {
      console.log("ERROR, model: InsertUserView", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default ViewService;
