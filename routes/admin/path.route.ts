import express from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/path.controller";
import ROUTERS from "../../constants/routes/index.routes";
const router = express.Router();
const upload = multer();

router.get(`${ROUTERS.ADMIN.PATH.INDEX}`, controller.index);

export default router;
