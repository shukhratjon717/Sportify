import {ObjectId} from "mongoose"
import { UserStatus, UserType } from "../enums/user.enum";

export interface User {
    _id: ObjectId;
  userType?: UserType;
  userStatus?: UserStatus;
  userNick: string;
  userPhone: string;
  userPassword?: string;
  userAddress?: string;
  userDesc?: string;
  userImage?: string;
  userPoints: number;
  createdAt: Date;
  updatedAt: Date
}

export interface UserInput {
  userType?: UserType;
  userStatus?: UserStatus;
  userNick: string;
  userPhone: string;
  userPassword: string;
  userAddress?: string;
  userDesc?: string;
  userImage?: string;
  userPoints?: number;
}
