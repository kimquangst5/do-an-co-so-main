import { model, Schema, Types } from "mongoose";
import { STATUS } from "../constants/enum";
import mongoose from "mongoose";
const accountsSchema = new Schema(
  {
    fullname: String,
    roles: Types.ObjectId,
    usename: String,
    email: String,
    password: String,
    token: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: STATUS.ACTIVE,
    },
    deviceInfo: [
      {
        browser: String,
        browserVersion: String,
        os: String,
        osVersion: String,
        device: String,
        deviceType: String,
        deviceVendor: String,
        ip: String,
        country: String,
        region: String,
        city: String,
        latitude: String,
        longitude: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdBy: mongoose.SchemaTypes.ObjectId,
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Account = model("Account", accountsSchema);

export default Account;
