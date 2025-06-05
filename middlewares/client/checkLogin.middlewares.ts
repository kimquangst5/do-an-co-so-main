import { NextFunction, Request, Response } from "express";
import ROUTERS from "../../constants/routes/index.routes";
import jwt from "jsonwebtoken";
import Role from "../../models/roles.models";
import Customer from "../../models/customers.model";
import ProductCategory from "../../models/productsCategories.model";
import createTree from "../../helpers/createTree.helper";
import console from "console";
import Cart from "../../models/carts.model";
import InfoWebsite from "../../models/info-website.model";
import { STATUS, STATUS_ORDER, STATUS_PAY } from "../../constants/enum";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
<<<<<<< HEAD
    console.log(req.cookies["alert-success"]);

=======
    res.locals.STATUS_ORDER = STATUS_ORDER
    res.locals.STATUS = STATUS
    res.locals.STATUS_PAY = STATUS_PAY
>>>>>>> a10ef2a3f66e1d3c97ac8c1d9f6f1e03292d5424
    if (req.cookies["alert-success"] == "xoa-cookie") {
      res.clearCookie("alert-success");
    }
    const infoWebsite = await InfoWebsite.findOne({});
    res.locals.infoWebsite = infoWebsite;
    const categories = await ProductCategory.find({
      deleted: false,
      status: "active",
    });
    const treeCate = createTree(categories);
    res.locals.treeCategories = treeCate;

    if (req.cookies.tokenCustomer) {
      const user = jwt.verify(
        req.cookies.tokenCustomer,
        process.env.JWT_SECRET
      );

      const INFOR_USER = await Customer.findById({ _id: user.id }).select(
        "-token "
      );
      if (INFOR_USER) {
        res.locals.INFOR_CUSTOMER = INFOR_USER;
        const carts = await Cart.countDocuments({
          customerId: INFOR_USER.id,
        });
        res.locals.CART = carts;
      } else {
        res.clearCookie("tokenCustomer");
      }
      next();
    } else next();
  } catch (error) {
    res.clearCookie("tokenCustomer");
    next();
  }
};

export default checkLogin;
