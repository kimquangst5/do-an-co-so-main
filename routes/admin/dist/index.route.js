"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var products_route_1 = require("./products.route");
var roles_route_1 = require("./roles.route");
var account_route_1 = require("./account.route");
var colorProduct_route_1 = require("./colorProduct.route");
var sizeProduct_route_1 = require("./sizeProduct.route");
var auth_route_1 = require("./auth.route");
var productsCategory_route_1 = require("./productsCategory.route");
var customer_route_1 = require("./customer.route");
var orders_route_1 = require("./orders.route");
var review_route_1 = require("./review.route");
var path_route_1 = require("./path.route");
var inforWebsite_route_1 = require("./inforWebsite.route");
var index_routes_1 = require("../../constants/routes/index.routes");
var checkLogin_middlewares_1 = require("../../middlewares/admin/checkLogin.middlewares");
var index = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // app.use(checkRoute);
        app.use("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.INFOR_WEBSITE, checkLogin_middlewares_1["default"], inforWebsite_route_1["default"]);
        app.use("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.PRODUCT.PATH, checkLogin_middlewares_1["default"], products_route_1["default"]);
        app.use("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.PRODUCT_CATEGORY.PATH, checkLogin_middlewares_1["default"], productsCategory_route_1["default"]);
        app.use("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.ROLES.PATH, checkLogin_middlewares_1["default"], roles_route_1["default"]);
        app.use("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.ACCOUNT.PATH, checkLogin_middlewares_1["default"], account_route_1["default"]);
        app.use("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.COLOR_PRODUCT.PATH, checkLogin_middlewares_1["default"], colorProduct_route_1["default"]);
        app.use("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.SIZE.PATH, checkLogin_middlewares_1["default"], sizeProduct_route_1["default"]);
        app.use("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.CUSTOMERS.PATH, checkLogin_middlewares_1["default"], customer_route_1["default"]);
        app.use("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.ORDERS.PATH, checkLogin_middlewares_1["default"], orders_route_1["default"]);
        app.use("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.REVIEW.PATH, checkLogin_middlewares_1["default"], review_route_1["default"]);
        app.use("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.PATH.PATH, checkLogin_middlewares_1["default"], path_route_1["default"]);
        app.use("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.LOGIN, auth_route_1["default"]);
        return [2 /*return*/];
    });
}); };
exports["default"] = index;
