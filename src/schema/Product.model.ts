import mongoose, { Schema } from "mongoose";
import { ProductShoesSize } from "../libs/enums/product.enum";
import { ProductType } from "../libs/enums/product.enum";
import { ProductChildSize } from "../libs/enums/product.enum";
import { ProductSize } from "../libs/enums/product.enum";
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
      // required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productLeftCount: {
      type: Number,
      required: true,
    },

    productSize: {
      type: String,
      enum: ProductSize,
      default: ProductSize.XL,
    },

    productShoesSize: {
      type: String,
      enum: ProductShoesSize,
    },

    productChildSize: {
      type: String,
      enum: ProductChildSize,
    },

    productType: {
      type: String,
      enum: ProductType,
      required: true,
    },

    productDesc: {
      type: String,
    },

    productImages: {
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

// Correcting index definition
productSchema.index({ productName: 1, productSize: 1 }, { unique: true });

export default mongoose.model("Product", productSchema);
