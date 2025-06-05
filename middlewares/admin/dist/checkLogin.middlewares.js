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
var index_routes_1 = require("../../constants/routes/index.routes");
var jsonwebtoken_1 = require("jsonwebtoken");
var accounts_model_1 = require("../../models/accounts.model");
var roles_models_1 = require("../../models/roles.models");
var checkLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var siderArray, user, INFOR_USER, role, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                siderArray = [
                    {
                        name: "Tổng quan",
                        icon: "grid"
                    },
                    // {
                    //   name: "Bài viết",
                    //   icon: "box",
                    //   childrent: [
                    //     {
                    //       name: "Thêm bài viết",
                    //       icon: "plus-circle",
                    //     },
                    //     {
                    //       name: "Danh sách",
                    //       icon: "list",
                    //     },
                    //     {
                    //       name: "Danh mục",
                    //       icon: "columns-gap",
                    //     },
                    //   ],
                    // },
                    // {
                    //   name: "Media",
                    //   icon: "image",
                    // },
                    {
                        name: "Sản phẩm",
                        icon: "box",
                        childrent: [
                            {
                                name: "Thêm sản phẩm",
                                icon: "plus-circle",
                                link: "/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.PRODUCT.PATH + index_routes_1["default"].ADMIN.PRODUCT.CREATE
                            },
                            {
                                name: "Danh sách",
                                icon: "list",
                                link: "/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.PRODUCT.PATH + index_routes_1["default"].ADMIN.PRODUCT.INDEX
                            },
                            {
                                name: "Danh mục",
                                icon: "columns-gap",
                                link: "/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.PRODUCT_CATEGORY.PATH + index_routes_1["default"].ADMIN.PRODUCT_CATEGORY.INDEX
                            },
                            {
                                name: "Màu sắc",
                                icon: "palette",
                                link: "/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.COLOR_PRODUCT.PATH + index_routes_1["default"].ADMIN.COLOR_PRODUCT.INDEX
                            },
                            {
                                name: "Kích thước",
                                icon: "rulers",
                                link: "/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.SIZE.PATH + index_routes_1["default"].ADMIN.SIZE.INDEX
                            },
                        ]
                    },
                    {
                        name: "Tài khoản quản trị",
                        icon: "person-plus",
                        childrent: [
                            {
                                name: "Thêm tài khoản",
                                icon: "plus-circle",
                                link: "/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.ACCOUNT.PATH + index_routes_1["default"].ADMIN.ACCOUNT.CREATE
                            },
                            {
                                name: "Danh sách",
                                icon: "list",
                                link: "/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.ACCOUNT.PATH + index_routes_1["default"].ADMIN.ACCOUNT.INDEX
                            },
                        ]
                    },
                    {
                        name: "Đánh giá/Bình luận",
                        icon: "pencil-square",
                        childrent: [
                            {
                                name: "Thêm đánh giá",
                                icon: "plus-circle",
                                link: "/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.REVIEW.PATH + index_routes_1["default"].ADMIN.REVIEW.CREATE
                            },
                            {
                                name: "Danh sách",
                                icon: "list",
                                link: "/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.REVIEW.PATH + index_routes_1["default"].ADMIN.REVIEW.INDEX
                            },
                        ]
                    },
                    {
                        name: "Nhóm quyền",
                        icon: "person-gear",
                        childrent: [
                            {
                                name: "Thêm nhóm quyền",
                                icon: "plus-circle",
                                link: "/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.ROLES.PATH + index_routes_1["default"].ADMIN.ROLES.CREATE
                            },
                            {
                                name: "Danh sách",
                                icon: "list",
                                link: "/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.ROLES.PATH + index_routes_1["default"].ADMIN.ROLES.INDEX
                            },
                        ]
                    }, {
                        name: "Khách hàng",
                        icon: "person",
                        childrent: [
                            {
                                name: "Thêm khách hàng mới",
                                icon: "plus-circle"
                            },
                            {
                                name: "Danh sách",
                                icon: "list",
                                link: "/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.CUSTOMERS.PATH + index_routes_1["default"].ADMIN.CUSTOMERS.INDEX
                            },
                        ]
                    }, {
                        name: "Đơn hàng",
                        icon: "person",
                        childrent: [
                            {
                                name: "Thêm đơn hàng",
                                icon: "plus-circle"
                            },
                            {
                                name: "Danh sách",
                                icon: "list",
                                link: "/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.ORDERS.PATH + index_routes_1["default"].ADMIN.ORDERS.INDEX
                            },
                        ]
                    },
                ];
                res.locals.siderArray = siderArray;
                if (!!req.cookies.token) return [3 /*break*/, 1];
                localStorage.setItem("alert-error", JSON.stringify({
                    icon: "error",
                    title: "Không tìm thấy tài khoản"
                }));
                res.redirect("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.LOGIN);
                return [2 /*return*/];
            case 1:
                user = jsonwebtoken_1["default"].verify(req.cookies.token, process.env.JWT_SECRET);
                return [4 /*yield*/, accounts_model_1["default"].findById({ _id: user.id }).select("-token -password")];
            case 2:
                INFOR_USER = _a.sent();
                if (!INFOR_USER) return [3 /*break*/, 4];
                res.locals.INFOR_USER = INFOR_USER;
                return [4 /*yield*/, roles_models_1["default"].findOne({
                        _id: INFOR_USER.roles
                    })];
            case 3:
                role = _a.sent();
                res.locals.ROLE = role;
                if (user.id)
                    next();
                return [3 /*break*/, 5];
            case 4:
                localStorage.setItem("alert-error", JSON.stringify({
                    icon: "error",
                    title: "Không tìm thấy tài khoản"
                }));
                res.redirect("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.LOGIN);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                res.cookie("closeSession", "true");
                res.redirect("/" + index_routes_1["default"].ADMIN.AUTH + index_routes_1["default"].ADMIN.LOGIN);
                return [2 /*return*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports["default"] = checkLogin;
