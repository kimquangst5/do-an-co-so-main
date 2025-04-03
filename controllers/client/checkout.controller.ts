import { Request, Response } from "express";
import Product from "../../models/products.model";
import ProductAssets from "../../models/productAssets.model";
import Assets from "../../models/assets.model";
import ProductItem from "../../models/product-items.model";
import { ObjectId } from "mongodb";
import Cart from "../../models/carts.model";
import ColorProduct from "../../models/colorProduct.model";
import SizeProduct from "../../models/sizeProduct.model";
import Order from "../../models/order.model";
import { it } from "node:test";
import ROUTERS from "../../constants/routes/index.routes";
import axios from "axios";
import { capitalizeWords } from "../../helpers/capitalizeWords.helper";
import { getLocationNames } from "../../helpers/getLocationNames.helper";
import { STATUS_ORDER, STATUS_PAY } from "../../constants/enum";

const index = async (req: Request, res: Response) => {
  const carts = await Cart.find({
    customerId: res.locals.INFOR_CUSTOMER,
  });

  carts["totalPrice"] = 0;
  for await (const it of carts) {
    const productItems = await ProductItem.findOne({
      _id: it.productItemId,
    });
    const product = await Product.findOne({
      _id: productItems.productId,
    });
    it["product_name"] = product.name;
    it["slug"] = product.slug;

    const color = await ColorProduct.findOne({
      _id: productItems.color,
    });
    it["product_color"] = color.name;

    const size = await SizeProduct.findOne({
      _id: productItems.size,
    });
    it["product_size"] = size.name;
    it["price"] = Math.ceil(
      productItems.price - productItems.price * (productItems.discount / 100)
    );
    it["priceNew"] = Math.ceil(
      it.quantity *
      (productItems.price -
        productItems.price * (productItems.discount / 100))
    );
    carts["totalPrice"] += it["priceNew"];
    const productAsset = await ProductAssets.findOne({
      productId: product.id,
    }).sort({
      type: 1,
    });
    const asset = await Assets.findOne({
      _id: productAsset.assetsId,
    });
    it["image"] = asset.path;
  }

  res.render("client/pages/checkouts/index.pug", {
    pageTitle: "Thanh toán đơn hàng",
    pageDesc: "Thanh toán đơn hàng",
    carts: carts,
  });
};

const create = async (req: Request, res: Response) => {
  let { fullname, email, phone, address, city, district, ward, note, cart } =
    req.body;
  const data = {
    expireAt: Date.now() + 24 * 60 * 60 * 1000,
    inforCustomer: {
      customerId: new ObjectId(res.locals.INFOR_CUSTOMER.id),
      fullname: capitalizeWords(fullname.trim().replace(/\s+/g, " ")),
      email: email,
      phone: phone,
      address: capitalizeWords(address.trim().replace(/\s+/g, " ")),
      city: parseInt(city),
      district: parseInt(district),
      ward: parseInt(ward),
      note: note.trim().replace(/\s+/g, " "),
    },
    inforProductItem: [],
  };
  let listCartId = [];
  let totalPrice = 0;
  for await (const cartId of cart) {
    listCartId.push(new ObjectId(cartId));
    const cartItem = await Cart.findOne({
      _id: cartId,
    });

    const items = await ProductItem.findOne({
      _id: cartItem.productItemId,
    });

    if (items.quantity - cartItem.quantity < 0) {
      res.status(400).json({
        message: "Thêm đơn hàng không thành công!",
      });
      return;
    }
    await ProductItem.updateOne(
      {
        _id: cartItem.productItemId,
      },
      {
        quantity: items.quantity - cartItem.quantity,
      }
    );
    totalPrice +=
      (items["price"] - items["price"] * (items["discount"] / 100)) *
      cartItem["quantity"];

    const dataItem = {
      productItemId: new ObjectId(items.id),
      price: items.price,
      discount: items.discount,
      quantity: cartItem.quantity,
    };
    data.inforProductItem.push(dataItem);
  }
  if (totalPrice >= 500000) data["shipping_fee"] = 0;
  else data["shipping_fee"] = 20000;

  const order = new Order(data);
  await order.save();

  order.inforProductItem["totalPrice"] = totalPrice;

  await Cart.deleteMany({
    _id: listCartId,
  });

  // const nodemailer = require("nodemailer");
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false, // use false for STARTTLS; true for SSL on port 465
  //   auth: {
  //     user: "kimquangst5@gmail.com",
  //     pass: process.env.PASSWORD_APPLICATION,
  //   },
  // });

  // const newAddress = await getLocationNames(
  //   order.inforCustomer["city"],
  //   order.inforCustomer["district"],
  //   order.inforCustomer["ward"]
  // );
  // order.inforCustomer.address = `${order.inforCustomer.address}, ${newAddress.wardName}, ${newAddress.districtName}, ${newAddress.cityName}`;
  // const protocol =
  //   req.headers["x-forwarded-proto"] ||
  //   (req.socket["encrypted"] ? "https" : "http");
  // const domain = protocol + "://" + req.headers.host;
  // const mailOptions = {
  //   from: "kimquangst5@gmail.com",
  //   to: res.locals.INFOR_CUSTOMER.email,
  //   subject: "Đặt đơn hàng thành công!",
  //   html: `<h1><code><span style="font-family: verdana, geneva, sans-serif; color: #e03e2d;">Đặt hàng th&agrave;nh c&ocirc;ng</span></code></h1>
  // <p>&nbsp;</p>
  // <h2><code><span style="font-family: verdana, geneva, sans-serif;">I. Th&ocirc;ng tin kh&aacute;ch h&agrave;ng</span></code></h2>
  // <div>
  // <div>
  // <div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Họ v&agrave; t&ecirc;n kh&aacute;ch h&agrave;ng:&nbsp;<strong>${
  //   order.inforCustomer.fullname
  // }</strong></span></code></div>
  // <div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Email kh&aacute;ch h&agrave;ng: <strong><a href="mailto:kimquangst5@gmail.com">${
  //   order.inforCustomer.email
  // }</a></strong></span></code></div>
  // <div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Số điện thoại kh&aacute;ch h&agrave;ng&nbsp;<strong>${
  //   order.inforCustomer.phone
  // }</strong></span></code></div>
  // <div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Địa chỉ giao h&agrave;ng: <strong>${
  //   order.inforCustomer.address
  // }</strong></span></code></div>
  // <div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Ghi ch&uacute;: <strong>${
  //   order.inforCustomer.note ? order.inforCustomer.note : "Không có"
  // }</strong></span></code></div>
  // <div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Id đơn h&agrave;ng: <strong>${
  //   order.id
  // }</strong></span></code></div>
  // <div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Đường link đơn h&agrave;ng:&nbsp;<strong>${domain}${
  //     ROUTERS.CLIENT.CHECKOUT.PATH
  //   }${ROUTERS.CLIENT.CHECKOUT.SUCCESS}/${
  //     res.locals.INFOR_CUSTOMER.username
  //   }?id-don-hang=${order.id}</strong></span></code></div>
  // </div>
  // </div>
  // <h2><code><span style="font-family: verdana, geneva, sans-serif;">II. Th&ocirc;ng tin đơn h&agrave;ng (${
  //   order.inforProductItem.length
  // } sản phẩm)</span></code></h2>
  // <p style="padding-left: 40px;"><code><span style="font-family: verdana, geneva, sans-serif; font-size: 14pt;">Th&agrave;nh tiền: <strong>${
  //   order.inforProductItem["totalPrice"] + order.shipping_fee
  // } đồng</strong></span></code></p>
  // <p>&nbsp;</p>
  // <p style="text-align: right;"><code><em><span style="font-family: verdana, geneva, sans-serif; font-size: 14pt;">Xin cảm ơn qu&iacute; kh&aacute;ch đ&atilde; đặt h&agrave;ng của ch&uacute;ng t&ocirc;i, ch&uacute;ng t&ocirc;i sẽ sớm xử l&iacute; đơn h&agrave;ng của qu&iacute; kh&aacute;ch trong khoảng thời gian sớm nhất!</span></em></code></p>`,
  // };
  // transporter.sendMail(mailOptions, async (error: any, info: any) => {
  //   if (error) {
  //     res.status(400).json({
  //       message: "Gửi email không thành công!",
  //     });
  //     return;
  //   } else {
  //     console.log("Gửi thành công!");
  //   }
  // });

  res.json({
    code: 200,
    newOrder: order.id,
  });
};

const success = async (req: Request, res: Response) => {
  const id = req.query["id-don-hang"];
  const order = await Order.findOne({
    _id: id,
  });

  order.inforProductItem["totalPrice"] = 0;

  for await (const it of order.inforProductItem) {
    const productItems = await ProductItem.findOne({
      _id: it.productItemId,
    });

    const product = await Product.findOne({
      _id: productItems.productId,
    });
    it["product_name"] = product.name;
    it["slug"] = product.slug;

    const color = await ColorProduct.findOne({
      _id: productItems.color,
    });
    it["product_color"] = color.name;

    const size = await SizeProduct.findOne({
      _id: productItems.size,
    });
    it["product_size"] = size.name;
    it["price"] = Math.ceil(
      productItems.price - productItems.price * (productItems.discount / 100)
    );
    it["priceNew"] = Math.ceil(
      it.quantity *
      (productItems.price -
        productItems.price * (productItems.discount / 100))
    );
    order.inforProductItem["totalPrice"] += it["priceNew"];
    const productAsset = await ProductAssets.findOne({
      productId: product.id,
    }).sort({
      type: 1,
    });
    const asset = await Assets.findOne({
      _id: productAsset.assetsId,
    });
    it["image"] = asset.path;
  }
  console.log(order.method);


  res.render("client/pages/checkouts/success.pug", {
    pageTitle: "Đặt đơn thành công",
    pageDesc: "Đặt đơn thành công",
    order: order,
  });
};
const methodPay = async (req: Request, res: Response) => {
  const orderId = req.query["id-don-hang"];
  const order = await Order.findOne({
    _id: orderId,
  });
  // console.log(order);
  const addressNew = await getLocationNames(
    order.inforCustomer.city,
    order.inforCustomer.district,
    order.inforCustomer.ward
  );
  order["addressNew"] = addressNew;
  order["totalPrice"] = 0;
  for (const it of order.inforProductItem) {
    const items = await ProductItem.findOne({
      _id: it.productItemId,
    }).select("productId color size");
    const productAssets = await ProductAssets.findOne({
      productId: items.productId,
    }).select("assetsId");
    const assets = await Assets.findOne({
      _id: productAssets.assetsId,
    }).select("path");
    const product = await Product.findOne({
      _id: items.productId,
    }).select("name");
    const color = await ColorProduct.findOne({
      _id: items.color,
    }).select("name");
    const size = await SizeProduct.findOne({
      _id: items.size,
    }).select("name");
    it["product_name"] = product.name;
    it["product_size"] = color.name;
    it["product_color"] = size.name;
    it["image"] = assets.path;
    it["priceNew"] = it.price - it.price * (it.discount / 100);
    it["newPrice"] = it["priceNew"] * it["quantity"];
    order["totalPrice"] += it["newPrice"];
  }

  res.render("client/pages/checkouts/method-pay.pug", {
    pageTitle: "Phương thức thanh toán",
    order,
  });
};
const changeStatusBankSuccess = async (req: Request, res: Response) => {
  const { orderId } = req.params
  const order = await Order.findOne({
    _id: orderId
  })

  if (order.status == STATUS_ORDER.INITIAL || (order.method == 'polime' && order.status == STATUS_ORDER.WAIT_CONFIRMATION)) {
    await Order.updateOne({
      _id: orderId
    }, {
      status: STATUS_ORDER.WAIT_CONFIRMATION,
      statusPay: STATUS_PAY.PAY_SUCCESS,
      $unset: { expireAt: '' },
      inforTransfer: req.body,
      method: 'transfer'
    })
  }

  res.json({
    code: 200
  })

}

const changeStatusPolimeSuccess = async (req: Request, res: Response) => {
  const { orderId } = req.params
  const order = await Order.findOne({
    _id: orderId
  }).select('status')

  if (order.status == 'khoi-tao') {

    await Order.updateOne({
      _id: orderId
    }, {
      status: STATUS_ORDER.WAIT_CONFIRMATION,
      statusPay: STATUS_PAY.PAY_NOT_YET,
      $unset: { expireAt: '' },
      method: 'polime'
    })
  }

  res.json({
    code: 200
  })

}
export { index, create, success, methodPay, changeStatusBankSuccess, changeStatusPolimeSuccess };
