import mongoose, {Schema} from "mongoose";
import { UserStatus, UserType } from "../libs/enums/user.enum";


const userSchema = new Schema ({
    userType: {
        type: String,
        enum: UserType,
        default: UserType.USER
    },
    userStatus: {
        type: String,
        enum: UserStatus,
        default: UserStatus.ACTIVE
    },

    userNick: {
        type: String,
        index:{unique: true, sparse: true},
        required: true
    },

    userPhone: {
        type:String,
        index: {unique: true, sparse: true},
        required: true
    },

    userPassword: {
        type: String,
        select: false,
         required: true
    },

    userAddress: {
        type: String
    },
    userDesc: {
        type: String
    },
    userImage: {
        type:String
    },
    userPoints: {
        type: Number,
        default: 0
    },
},
    {timestamps: true}
);

export default mongoose.model("User", userSchema)