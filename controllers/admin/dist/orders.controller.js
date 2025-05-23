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
exports.update = exports.index = void 0;
var order_model_1 = require("../../models/order.model");
var product_items_model_1 = require("../../models/product-items.model");
var products_model_1 = require("../../models/products.model");
var sizeProduct_model_1 = require("../../models/sizeProduct.model");
var colorProduct_model_1 = require("../../models/colorProduct.model");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, _i, orders_1, it, _a, _b, ele;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, order_model_1["default"].find({
                    deleted: false
                }).sort({
                    createdAt: -1
                })];
            case 1:
                orders = _c.sent();
                for (_i = 0, orders_1 = orders; _i < orders_1.length; _i++) {
                    it = orders_1[_i];
                    it["totalPrice"] = 0;
                    for (_a = 0, _b = it["inforProductItem"]; _a < _b.length; _a++) {
                        ele = _b[_a];
                        it["totalPrice"] += ele.price - ele.price * (ele.discount / 100);
                    }
                    it["totalPrice"] += it["shipping_fee"];
                }
                res.render("admin/pages/orders/index.pug", {
                    pageTitle: "Đơn hàng",
                    orders: orders
                });
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order, _i, _a, it, items, product, size, color;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(req.params);
                id = req.params.id;
                console.log(id);
                return [4 /*yield*/, order_model_1["default"].findOne({
                        _id: id
                    })];
            case 1:
                order = _b.sent();
                _i = 0, _a = order['inforProductItem'];
                _b.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 8];
                it = _a[_i];
                return [4 /*yield*/, product_items_model_1["default"].findOne({
                        _id: it.productItemId
                    })];
            case 3:
                items = _b.sent();
                console.log(items);
                return [4 /*yield*/, products_model_1["default"].findOne({
                        _id: items.productId
                    })];
            case 4:
                product = _b.sent();
                return [4 /*yield*/, sizeProduct_model_1["default"].findOne({
                        _id: items.size
                    })];
            case 5:
                size = _b.sent();
                return [4 /*yield*/, colorProduct_model_1["default"].findOne({
                        _id: items.color
                    })];
            case 6:
                color = _b.sent();
                it['product'] = product;
                it['size'] = size;
                it['color'] = color;
                _b.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 2];
            case 8:
                res.render('admin/pages/orders/update.pug', {
                    pageTitle: 'Cập nhật đơn hàng',
                    order: order
                });
                return [2 /*return*/];
        }
    });
}); };
exports.update = update;
