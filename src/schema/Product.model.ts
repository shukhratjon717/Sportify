import mongoose, { Schema } from "mongoose";
import { ProductChildSize, ProductSize } from "../libs/enums/product.enum";
import { ProductShoesSize } from "../libs/enums/product.enum";
import { ProductCollection } from "../libs/enums/product.enum";
import { ProductStatus } from "../libs/enums/product.enum";

const productSchema = new Schema(
  {
    productStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.PAUSE,
    },
    productCollection: {
      type: String,
      enum: ProductCollection,
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productLeftcount: {
      type: Number,
      required: true,
    },

    productSize: {
      type: String,
      enum: ProductSize,
      default: ProductSize.M,
    },
    productShoesSize: {
      type: Number,
      enum: ProductShoesSize,
      default: ProductShoesSize.TWO_SEVEN_ZERO,
    },
    ProductChildSize: {
      type: String,
      enum: ProductChildSize,
      default: ProductChildSize.THREE_T,
    },

    productDesc: {
      type: String,
      required: true,
    },
    productImage: {
      type: [String],
      default: [],
    },

    productViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.index(
  { productname: 1, ProductSize: 1, ProductSize2: 1 },
  { unique: true }
);

export default mongoose.model("Product", productSchema);
