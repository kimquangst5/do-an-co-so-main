import express from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/colorProduct.controller";
import ROUTERS from "../../constants/routes/index.routes";
const router = express.Router();
const upload = multer();

export default router;
