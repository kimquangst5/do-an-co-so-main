import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/roles.controller";
import ROUTERS from "../../constants/routes/index.routes";

router.get(`${ROUTERS.ADMIN.ROLES.PERMISSION}`, controller.permission);
router.patch(`${ROUTERS.ADMIN.ROLES.PERMISSION}`, controller.permissionPatch);

export default router;
