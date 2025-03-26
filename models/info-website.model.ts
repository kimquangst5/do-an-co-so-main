import mongoose from "mongoose";
import { STATUS } from "../constants/enum";

const infoWebsiteSchema = new mongoose.Schema(
  {
    nameWeb: String,
    nameCompany: String,
    hotline: String,
    phone: String,
    email: String,
    address: String,
    map: String,
    copyright: String,
    logo: String,
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const InfoWebsite = mongoose.model("InfoWebsite", infoWebsiteSchema);

export default InfoWebsite;
