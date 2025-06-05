import mongoose from "mongoose";
import { STATUS_ORDER, STATUS_PAY } from "../constants/enum";

const orderSchema = new mongoose.Schema(
  {
    inforCustomer: {
      customerId: mongoose.SchemaTypes.ObjectId,
      fullname: String,
      email: String,
      phone: String,
      address: String,
      city: Number,
      district: Number,
      ward: Number,
      note: String,
    },
    inforProductItem: [
      {
        productItemId: mongoose.SchemaTypes.ObjectId,
        price: Number,
        discount: Number,
        quantity: Number,
      },
    ],
    shipping_fee: Number,
    type: {
      type: String,
      default: "online",
    },
    inforTransfer: {
      time: Date,
      receive: Number,
      price: Number,
      // referenceCode: String,
      transactionCode: Number,
    },
    status: {
      type: String,
      enum: Object.values(STATUS_ORDER),
      default: STATUS_ORDER.INITIAL,
    },
    statusPay: {
      type: String,
      enum: Object.values(STATUS_PAY),
      default: STATUS_PAY.PAY_SUCCESS,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    expireAt: {
      type: Date,
      expires: 0,
    },
    method: String,
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
