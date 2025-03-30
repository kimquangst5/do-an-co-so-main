import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import Customer from "../../models/customers.model";
import ProductItem from "../../models/product-items.model";
import Product from "../../models/products.model";
import ColorProduct from "../../models/colorProduct.model";
import SizeProduct from "../../models/sizeProduct.model";
import Cart from "../../models/carts.model";
require("dotenv").config();

const addValidate = async (req: Request, res: Response, next: NextFunction) => {
  let arrayError = "";
  try {
    if (!res.locals.INFOR_CUSTOMER) {
      res.status(400).json({
        message: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ!",
      });
      return;
    }
    const { colorId, sizeId, quantity } = req.body;
    const { productId } = req.params;
    const productItem = await ProductItem.findOne({
      productId: productId,
      size: sizeId,
      color: colorId,
    }).select("quantity");
    const product = await Product.findOne({
      _id: productId,
    }).select("name");
    const color = await ColorProduct.findOne({
      _id: colorId,
    }).select("name");
    const size = await SizeProduct.findOne({
      _id: sizeId,
    }).select("name");
    // console.log(productItem.quantity); // tồn kho
    // console.log(quantity); // khách hàng

    const cartCustomer = await Cart.findOne({
      customerId: res.locals.INFOR_CUSTOMER.id,
      productItemId: productItem.id,
    });
    if (cartCustomer) {
      let cntStockProduct = parseInt(quantity) + cartCustomer["quantity"];
      if (cntStockProduct > productItem.quantity)
        arrayError += `Chúng tôi xin lỗi! Sản phẩm <b class='text-[red]'>${product.name} (${color.name}, ${size.name})</b> chỉ còn  <b class='text-[red]'>${productItem.quantity}</b> cái\nGiỏ hàng của bạn đã có <b class='text-[red]'>${cartCustomer["quantity"]}</b> cái`;
    } else if (quantity > productItem.quantity)
      arrayError += `Chúng tôi xin lỗi! Sản phẩm <b class='text-[red]'>${product.name} (${color.name}, ${size.name})</b> chỉ còn  <b class='text-[red]'>${productItem.quantity}</b> cái`;
    if (arrayError) {
      res.status(400).json({
        message: arrayError,
      });
      return;
    }
    next();
  } catch (error) {
    arrayError +=
      "Thêm sản phẩm vào giỏ thất bại. Vui lòng liên hệ với quản trị viên!" +
      "\n";
    if (arrayError) {
      res.status(400).json({
        message: arrayError,
      });
      return;
    }
  }
};

export { addValidate };
