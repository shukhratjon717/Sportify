import express from "express";
const routerAdmin = express.Router();
import shopController from "./controllers/shop.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";

routerAdmin.get("/", shopController.goHome);
routerAdmin
  .get("/login", shopController.getLogin)
  .post("/login", shopController.processLogin);

routerAdmin
  .get("/signup", shopController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("userImage"),
    shopController.processSignup
  );
routerAdmin.get("/logout", shopController.logout);
routerAdmin.get("/check-me", shopController.checkAuthSession);

/** Product  */
routerAdmin.get(
  "/product/all",
  shopController.verifyShop,
  productController.getAllProducts
);
routerAdmin.post(
  "/product/create",
  shopController.verifyShop,
  makeUploader("products").array("productImage", 5),
  productController.createNewProduct
);
routerAdmin.post(
  "/product/:id",
  shopController.verifyShop,
  productController.updateChosenProduct
);

/** User */

export default routerAdmin;


// restaurantController.processSignup = async (
//   req: AdminRequest,
//   res: Response
// ) => {
//   try {
//     console.log("processSignup");

//     const newMember: MemberInput = req.body;
//     newMember.memberType = MemberType.RESTAURANT;
//     const result = await memberService.processSignup(newMember);
//     //TODO: SESSIONS AUTHENTICATON

//     req.session.member = result;
//     req.session.save(function () {
//       res.send(result);
//     });
//   } catch (err) {
//     console.log("Error, processSignup:", err);
//     const messsage =
//       err instanceof Errors ? err.message : Message.SOEMTHING_WENT_WRONG;
//     res.send(
//       `<script> alert("${messsage}) window.location.replace("admin/login") </script>`
//     );
//   }
// };


// public async processSignup(input: MemberInput): Promise<Member> {
//   const exist = await this.memberModel
//     .findOne({ memberType: MemberType.RESTAURANT })
//     .exec();
//   if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

//   const salt = await bcrypt.genSalt();
//   input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

//   try {
//     const result = await this.memberModel.create(input);
//     result.memberPassword = "";
//     return result;
//   } catch (err) {
//     throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
//   }
// }