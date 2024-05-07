import { ObjectId } from "mongoose";
import { ViewGroup } from "../enums/view.enum";

export interface View {
  _id: ObjectId;
  viewGroup: ViewGroup;
  userId: ObjectId;
  viewRefId: ObjectId;
  createdat: Date;
  updatedAt: Date;
}

export interface ViewInput {
  userId: ObjectId;
  viewRefId: ObjectId;
  viewGroup: ViewGroup;
}
