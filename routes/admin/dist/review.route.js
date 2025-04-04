"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var controller = require("../../controllers/admin/review.controller");
var index_routes_1 = require("../../constants/routes/index.routes");
router.get("" + index_routes_1["default"].ADMIN.REVIEW.INDEX, controller.index);
router.patch(index_routes_1["default"].ADMIN.REVIEW.CHANGE_STATUS + "/:id", controller.changeStatus);
exports["default"] = router;
