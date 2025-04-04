import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/review.controller";
import * as AccountValidate from "../../validation/admin/accounts.validate";
import ROUTERS from "../../constants/routes/index.routes";

router.get(`${ROUTERS.ADMIN.REVIEW.INDEX}`, controller.index);

router.patch(`${ROUTERS.ADMIN.REVIEW.CHANGE_STATUS}/:id`, controller.changeStatus);

export default router;
