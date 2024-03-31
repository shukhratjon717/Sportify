import UserModel from "../schema/User.model";
import { User, UserInput } from "../libs/types/user";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { UserType } from "../libs/enums/user.enum";

class UserService {
  private readonly userModel;

  constructor() {
    this.userModel = UserModel;
  }

  public async processSignup(input: UserInput): Promise<User> {
    const exist = await this.userModel
      .findOne({ userType: UserType.SHOP })
      .exec();
      console.log("exist", exist)
    if(exist)throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
       
    try {
      const result = await this.userModel.create(input);
      result.userPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default UserService;
