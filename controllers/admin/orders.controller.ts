import { Request, Response } from "express";
import { sizeProductService } from "../../services/admin/index.service";
import Order from "../../models/order.model";
import ProductItem from "../../models/product-items.model";
import Product from "../../models/products.model";
import SizeProduct from "../../models/sizeProduct.model";
import ColorProduct from "../../models/colorProduct.model";

const index = async (req: Request, res: Response) => {
  const orders = await Order.find({
    deleted: false,
  }).sort({
    createdAt: -1,
  });
  for (const it of orders) {
    it["totalPrice"] = 0;
    for (const ele of it["inforProductItem"]) {
      it["totalPrice"] += ele.price - ele.price * (ele.discount / 100);
    }
    it["totalPrice"] += it["shipping_fee"];
  }

  res.render("admin/pages/orders/index.pug", {
    pageTitle: "Đơn hàng",
    orders: orders,
  });
};
const update = async (req: Request, res: Response) => {
  console.log(req.params)
  const { id } = req.params
  console.log(id)
  const order = await Order.findOne({
    _id: id
  })
  for (const it of order['inforProductItem']) {
    const items = await ProductItem.findOne({
      _id: it.productItemId
    })
    console.log(items);
    const product = await Product.findOne({
      _id: items.productId
    })
    const size = await SizeProduct.findOne({
      _id: items.size
    })
    const color = await ColorProduct.findOne({
      _id: items.color
    })
    it['product'] = product
    it['size'] = size
    it['color'] = color


  }
  res.render('admin/pages/orders/update.pug', {
    pageTitle: 'Cập nhật đơn hàng',
    order: order
  })
}
export { index, update };
