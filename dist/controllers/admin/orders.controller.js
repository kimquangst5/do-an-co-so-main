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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.index = void 0;
const order_model_1 = __importDefault(require("../../models/order.model"));
const product_items_model_1 = __importDefault(require("../../models/product-items.model"));
const products_model_1 = __importDefault(require("../../models/products.model"));
const sizeProduct_model_1 = __importDefault(require("../../models/sizeProduct.model"));
const colorProduct_model_1 = __importDefault(require("../../models/colorProduct.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default.find({
        deleted: false,
    }).sort({
        createdAt: -1,
    });
    for (const it of orders) {
        it["totalPrice"] = 0;
        for (const ele of it["inforProductItem"]) {
            it["totalPrice"] += ele.price - ele.price * (ele.discount / 100);
        }
        it["totalPrice"] += it["shipping_fee"];
    }
    res.render("admin/pages/orders/index.pug", {
        pageTitle: "Đơn hàng",
        orders: orders,
    });
});
exports.index = index;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const { id } = req.params;
    console.log(id);
    const order = yield order_model_1.default.findOne({
        _id: id
    });
    for (const it of order['inforProductItem']) {
        const items = yield product_items_model_1.default.findOne({
            _id: it.productItemId
        });
        console.log(items);
        const product = yield products_model_1.default.findOne({
            _id: items.productId
        });
        const size = yield sizeProduct_model_1.default.findOne({
            _id: items.size
        });
        const color = yield colorProduct_model_1.default.findOne({
            _id: items.color
        });
        it['product'] = product;
        it['size'] = size;
        it['color'] = color;
    }
    res.render('admin/pages/orders/update.pug', {
        pageTitle: 'Cập nhật đơn hàng',
        order: order
    });
});
exports.update = update;
