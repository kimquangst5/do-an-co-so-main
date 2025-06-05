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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
exports.changeStatusBank = exports.methodPay = exports.success = exports.create = exports.index = void 0;
=======
exports.changeStatusPolimeSuccess = exports.changeStatusBankSuccess = exports.methodPay = exports.success = exports.create = exports.index = void 0;
>>>>>>> a10ef2a3f66e1d3c97ac8c1d9f6f1e03292d5424
const products_model_1 = __importDefault(require("../../models/products.model"));
const productAssets_model_1 = __importDefault(require("../../models/productAssets.model"));
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const product_items_model_1 = __importDefault(require("../../models/product-items.model"));
const mongodb_1 = require("mongodb");
const carts_model_1 = __importDefault(require("../../models/carts.model"));
const colorProduct_model_1 = __importDefault(require("../../models/colorProduct.model"));
const sizeProduct_model_1 = __importDefault(require("../../models/sizeProduct.model"));
const order_model_1 = __importDefault(require("../../models/order.model"));
const capitalizeWords_helper_1 = require("../../helpers/capitalizeWords.helper");
const getLocationNames_helper_1 = require("../../helpers/getLocationNames.helper");
const enum_1 = require("../../constants/enum");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const carts = yield carts_model_1.default.find({
        customerId: res.locals.INFOR_CUSTOMER,
    });
    carts["totalPrice"] = 0;
    try {
        for (var _d = true, carts_1 = __asyncValues(carts), carts_1_1; carts_1_1 = yield carts_1.next(), _a = carts_1_1.done, !_a; _d = true) {
            _c = carts_1_1.value;
            _d = false;
            const it = _c;
            const productItems = yield product_items_model_1.default.findOne({
                _id: it.productItemId,
            });
            const product = yield products_model_1.default.findOne({
                _id: productItems.productId,
            });
            it["product_name"] = product.name;
            it["slug"] = product.slug;
            const color = yield colorProduct_model_1.default.findOne({
                _id: productItems.color,
            });
            it["product_color"] = color.name;
            const size = yield sizeProduct_model_1.default.findOne({
                _id: productItems.size,
            });
            it["product_size"] = size.name;
            it["price"] = Math.ceil(productItems.price - productItems.price * (productItems.discount / 100));
            it["priceNew"] = Math.ceil(it.quantity *
                (productItems.price -
                    productItems.price * (productItems.discount / 100)));
            carts["totalPrice"] += it["priceNew"];
            const productAsset = yield productAssets_model_1.default.findOne({
                productId: product.id,
            }).sort({
                type: 1,
            });
            const asset = yield assets_model_1.default.findOne({
                _id: productAsset.assetsId,
            });
            it["image"] = asset.path;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = carts_1.return)) yield _b.call(carts_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    res.render("client/pages/checkouts/index.pug", {
        pageTitle: "Thanh toán đơn hàng",
        pageDesc: "Thanh toán đơn hàng",
        carts: carts,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_2, _b, _c;
    let { fullname, email, phone, address, city, district, ward, note, cart } = req.body;
    const data = {
        expireAt: Date.now() + 24 * 60 * 60 * 1000,
        inforCustomer: {
            customerId: new mongodb_1.ObjectId(res.locals.INFOR_CUSTOMER.id),
            fullname: (0, capitalizeWords_helper_1.capitalizeWords)(fullname.trim().replace(/\s+/g, " ")),
            email: email,
            phone: phone,
            address: (0, capitalizeWords_helper_1.capitalizeWords)(address.trim().replace(/\s+/g, " ")),
            city: parseInt(city),
            district: parseInt(district),
            ward: parseInt(ward),
            note: note.trim().replace(/\s+/g, " "),
        },
        inforProductItem: [],
    };
    let listCartId = [];
    let totalPrice = 0;
    try {
        for (var _d = true, cart_1 = __asyncValues(cart), cart_1_1; cart_1_1 = yield cart_1.next(), _a = cart_1_1.done, !_a; _d = true) {
            _c = cart_1_1.value;
            _d = false;
            const cartId = _c;
            listCartId.push(new mongodb_1.ObjectId(cartId));
            const cartItem = yield carts_model_1.default.findOne({
                _id: cartId,
            });
            const items = yield product_items_model_1.default.findOne({
                _id: cartItem.productItemId,
            });
            if (items.quantity - cartItem.quantity < 0) {
                res.status(400).json({
                    message: "Thêm đơn hàng không thành công!",
                });
                return;
            }
            yield product_items_model_1.default.updateOne({
                _id: cartItem.productItemId,
            }, {
                quantity: items.quantity - cartItem.quantity,
            });
            totalPrice +=
                (items["price"] - items["price"] * (items["discount"] / 100)) *
                    cartItem["quantity"];
            const dataItem = {
                productItemId: new mongodb_1.ObjectId(items.id),
                price: items.price,
                discount: items.discount,
                quantity: cartItem.quantity,
            };
            data.inforProductItem.push(dataItem);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = cart_1.return)) yield _b.call(cart_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    if (totalPrice >= 500000)
        data["shipping_fee"] = 0;
    else
        data["shipping_fee"] = 20000;
    const order = new order_model_1.default(data);
    yield order.save();
    order.inforProductItem["totalPrice"] = totalPrice;
    yield carts_model_1.default.deleteMany({
        _id: listCartId,
    });
    res.json({
        code: 200,
        newOrder: order.id,
    });
});
exports.create = create;
const success = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_3, _b, _c;
    const id = req.query["id-don-hang"];
    const order = yield order_model_1.default.findOne({
        _id: id,
    });
    order.inforProductItem["totalPrice"] = 0;
    try {
        for (var _d = true, _e = __asyncValues(order.inforProductItem), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
            _c = _f.value;
            _d = false;
            const it = _c;
            const productItems = yield product_items_model_1.default.findOne({
                _id: it.productItemId,
            });
            const product = yield products_model_1.default.findOne({
                _id: productItems.productId,
            });
            it["product_name"] = product.name;
            it["slug"] = product.slug;
            const color = yield colorProduct_model_1.default.findOne({
                _id: productItems.color,
            });
            it["product_color"] = color.name;
            const size = yield sizeProduct_model_1.default.findOne({
                _id: productItems.size,
            });
            it["product_size"] = size.name;
            it["price"] = Math.ceil(productItems.price - productItems.price * (productItems.discount / 100));
            it["priceNew"] = Math.ceil(it.quantity *
                (productItems.price -
                    productItems.price * (productItems.discount / 100)));
            order.inforProductItem["totalPrice"] += it["priceNew"];
            const productAsset = yield productAssets_model_1.default.findOne({
                productId: product.id,
            }).sort({
                type: 1,
            });
            const asset = yield assets_model_1.default.findOne({
                _id: productAsset.assetsId,
            });
            it["image"] = asset.path;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
        }
        finally { if (e_3) throw e_3.error; }
    }
    console.log(order.method);
    res.render("client/pages/checkouts/success.pug", {
        pageTitle: "Đặt đơn thành công",
        pageDesc: "Đặt đơn thành công",
        order: order,
    });
});
exports.success = success;
const methodPay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.query["id-don-hang"];
    const order = yield order_model_1.default.findOne({
        _id: orderId,
    });
    const addressNew = yield (0, getLocationNames_helper_1.getLocationNames)(order.inforCustomer.city, order.inforCustomer.district, order.inforCustomer.ward);
    order["addressNew"] = addressNew;
    order["totalPrice"] = 0;
    for (const it of order.inforProductItem) {
        const items = yield product_items_model_1.default.findOne({
            _id: it.productItemId,
        }).select("productId color size");
        const productAssets = yield productAssets_model_1.default.findOne({
            productId: items.productId,
        }).select("assetsId");
        const assets = yield assets_model_1.default.findOne({
            _id: productAssets.assetsId,
        }).select("path");
        const product = yield products_model_1.default.findOne({
            _id: items.productId,
        }).select("name");
        const color = yield colorProduct_model_1.default.findOne({
            _id: items.color,
        }).select("name");
        const size = yield sizeProduct_model_1.default.findOne({
            _id: items.size,
        }).select("name");
        it["product_name"] = product.name;
        it["product_size"] = color.name;
        it["product_color"] = size.name;
        it["image"] = assets.path;
        it["priceNew"] = it.price - it.price * (it.discount / 100);
        it["newPrice"] = it["priceNew"] * it["quantity"];
        order["totalPrice"] += it["newPrice"];
    }
    res.render("client/pages/checkouts/method-pay.pug", {
        pageTitle: "Phương thức thanh toán",
        order,
    });
});
exports.methodPay = methodPay;
<<<<<<< HEAD
const changeStatusBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const order = yield order_model_1.default.findOne({
        _id: orderId,
    }).select("status");
    if (order.status == enum_1.STATUS_ORDER.INITIAL) {
        yield order_model_1.default.updateOne({
            _id: orderId,
        }, {
            status: enum_1.STATUS_ORDER.PAY_SUCCESS,
            inforTransfer: req.body,
            $unset: { expireAt: "" },
        });
    }
    res.json({
        code: 200,
    });
});
exports.changeStatusBank = changeStatusBank;
=======
const changeStatusBankSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const order = yield order_model_1.default.findOne({
        _id: orderId
    });
    if (order.status == enum_1.STATUS_ORDER.INITIAL || (order.method == 'polime' && order.status == enum_1.STATUS_ORDER.WAIT_CONFIRMATION)) {
        yield order_model_1.default.updateOne({
            _id: orderId
        }, {
            status: enum_1.STATUS_ORDER.WAIT_CONFIRMATION,
            statusPay: enum_1.STATUS_PAY.PAY_SUCCESS,
            $unset: { expireAt: '' },
            inforTransfer: req.body,
            method: 'transfer'
        });
    }
    res.json({
        code: 200
    });
});
exports.changeStatusBankSuccess = changeStatusBankSuccess;
const changeStatusPolimeSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const order = yield order_model_1.default.findOne({
        _id: orderId
    }).select('status');
    if (order.status == 'khoi-tao') {
        yield order_model_1.default.updateOne({
            _id: orderId
        }, {
            status: enum_1.STATUS_ORDER.WAIT_CONFIRMATION,
            statusPay: enum_1.STATUS_PAY.PAY_NOT_YET,
            $unset: { expireAt: '' },
            method: 'polime'
        });
    }
    res.json({
        code: 200
    });
});
exports.changeStatusPolimeSuccess = changeStatusPolimeSuccess;
>>>>>>> a10ef2a3f66e1d3c97ac8c1d9f6f1e03292d5424
