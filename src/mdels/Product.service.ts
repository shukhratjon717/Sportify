import { ProductInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model"
import { Product } from "../libs/types/product";
import Errors, { HttpCode, Message } from "../libs/Errors";

class ProductService {
    private readonly productModel;

    constructor() {
        this.productModel = ProductModel
    }

    /** SPA Starter */

    /** SPA Finisher */

    /** SSR Starter */
    public async createNewProduct(input: ProductInput): Promise<Product> {
        try {
            return await this.productModel.create(input)
        } catch (err) {
            console.log("Error of Database, model: createNewProduct:", err)
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
    }
}

export default ProductService;
