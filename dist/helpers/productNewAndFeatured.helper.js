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
exports.productNewAnhFeature = void 0;
const productAssets_model_1 = __importDefault(require("../models/productAssets.model"));
const assets_model_1 = __importDefault(require("../models/assets.model"));
const product_items_model_1 = __importDefault(require("../models/product-items.model"));
const productNewAnhFeature = (array) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, array_1, array_1_1;
    var _b, e_1, _c, _d, _e, e_2, _f, _g;
    try {
        for (_a = true, array_1 = __asyncValues(array); array_1_1 = yield array_1.next(), _b = array_1_1.done, !_b; _a = true) {
            _d = array_1_1.value;
            _a = false;
            const it = _d;
            it["img_main"] = [];
            const img = yield productAssets_model_1.default.find({
                productId: it.id,
                type: "main",
            });
            if (img.length > 0) {
                try {
                    for (var _h = true, img_1 = (e_2 = void 0, __asyncValues(img)), img_1_1; img_1_1 = yield img_1.next(), _e = img_1_1.done, !_e; _h = true) {
                        _g = img_1_1.value;
                        _h = false;
                        const image = _g;
                        const assets__main = yield assets_model_1.default.findOne({
                            _id: image.assetsId,
                        });
                        it["img_main"].push(assets__main.path);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (!_h && !_e && (_f = img_1.return)) yield _f.call(img_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            const listItem = yield product_items_model_1.default.find({
                productId: it.id,
            });
            if (listItem.length > 0) {
                if (listItem.length > 1) {
                    const minItem = listItem.reduce((min, item) => {
                        return Math.ceil(item.price * item.discount) <
                            Math.ceil(min.price * min.discount)
                            ? item
                            : min;
                    }, listItem[0]);
                    it["priceNew"] = Math.ceil(minItem.price - minItem.price * (minItem.discount / 100));
                    it.price = minItem.price;
                    it.discount = minItem.discount;
                }
                else {
                    it["priceNew"] = Math.ceil(listItem[0].price - listItem[0].price * (listItem[0].discount / 100));
                    it.price = listItem[0].price;
                    it.discount = listItem[0].discount;
                }
            }
            else {
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_a && !_b && (_c = array_1.return)) yield _c.call(array_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
exports.productNewAnhFeature = productNewAnhFeature;
