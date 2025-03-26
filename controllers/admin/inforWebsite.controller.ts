import { Request, Response } from "express";
import { colorProductService } from "../../services/admin/index.service";
import Customer from "../../models/customers.model";
import { STATUS } from "../../constants/enum";
import axios from "axios";
import { ObjectId } from "mongodb";
import InfoWebsite from "../../models/info-website.model";

const index = async (req: Request, res: Response) => {
  const inforWebsite = await InfoWebsite.findOne({});

  res.render("admin/pages/infor-website/index.pug", {
    pageTitle: "Thông tin website",
    pageDesc: "Thông tin website",
    inforWebsite,
  });
};

const updatePatch = async (req: Request, res: Response) => {
  console.log(req.body);
  await InfoWebsite.findOneAndUpdate({}, req.body, {
    upsert: true,
    new: true,
  });
  res.json({
    code: 200,
  });
};
export { index, updatePatch };
