import { ObjectId } from "mongoose";
import {
  ProductCollection,
  ProductStatus,
  ProductSize,
  ProductType,
  ProductChildSize,
  ProductShoesSize,
} from "../enums/product.enum";

export interface Product {
  _id: ObjectId;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize: ProductSize;
  productShoesSize: ProductShoesSize;
  productChildSize: ProductChildSize;
  productType: string;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productType?: ProductType;
  search?: string;
}

export interface ProductInput {
  productStatus?: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productType?: ProductType;
  productSize?: ProductSize;
  productChildSize?: ProductChildSize;
  productShoesSize?: ProductShoesSize;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
}

export interface ProductUpdateInput {
  _id: ObjectId;
  productStatus?: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productType?: ProductType;
  productSize?: ProductSize;
  productChildSize?: ProductChildSize;
  productShoesSize?: ProductShoesSize;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
}
