import express from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/inforWebsite.controller";
import ROUTERS from "../../constants/routes/index.routes";
import * as CustomerValidate from "../../validation/admin/customers.validate";

const router = express.Router();
const upload = multer();

router.get(``, controller.index);

router.patch(``, controller.updatePatch);

export default router;
