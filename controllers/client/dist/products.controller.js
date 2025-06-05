"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.review = exports.search = exports.getItem = exports.getSize = exports.detail = exports.index = void 0;
var products_model_1 = require("../../models/products.model");
var colorProduct_model_1 = require("../../models/colorProduct.model");
var product_items_model_1 = require("../../models/product-items.model");
var sizeProduct_model_1 = require("../../models/sizeProduct.model");
var mongodb_1 = require("mongodb");
var productAssets_model_1 = require("../../models/productAssets.model");
var assets_model_1 = require("../../models/assets.model");
var index_routes_1 = require("../../constants/routes/index.routes");
var unidecode_1 = require("unidecode");
var getParentCategory_helper_1 = require("../../helpers/getParentCategory.helper");
var productNewAndFeatured_helper_1 = require("../../helpers/productNewAndFeatured.helper");
var reviews_model_1 = require("../../models/reviews.model");
var detail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var slug, product, colors, colors_1, colors_1_1, it, color, size, e_1_1, productsAssets, productsAssets_1, productsAssets_1_1, it, assets, e_2_1, listParentCategory, listIdParentCategory, findProduct, sortProduct, products;
    var e_1, _a, e_2, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                slug = req.params.slug;
                return [4 /*yield*/, products_model_1["default"].findOne({
                        slug: slug,
                        deleted: false,
                        status: "active"
                    })];
            case 1:
                product = _c.sent();
                return [4 /*yield*/, product_items_model_1["default"].find({
                        productId: product.id
                    })];
            case 2:
                colors = _c.sent();
                product["color"] = [];
                product["size"] = [];
                product["images"] = [];
                _c.label = 3;
            case 3:
                _c.trys.push([3, 10, 11, 16]);
                colors_1 = __asyncValues(colors);
                _c.label = 4;
            case 4: return [4 /*yield*/, colors_1.next()];
            case 5:
                if (!(colors_1_1 = _c.sent(), !colors_1_1.done)) return [3 /*break*/, 9];
                it = colors_1_1.value;
                return [4 /*yield*/, colorProduct_model_1["default"].findOne({
                        _id: it.color
                    })];
            case 6:
                color = _c.sent();
                if (!product["color"].find(function (co) { return co.id == color.id; }))
                    product["color"].push(color);
                return [4 /*yield*/, sizeProduct_model_1["default"].findOne({
                        _id: it.size
                    })];
            case 7:
                size = _c.sent();
                if (size && !product["size"].find(function (siz) { return siz.id == size.id; }))
                    product["size"].push(size);
                _c.label = 8;
            case 8: return [3 /*break*/, 4];
            case 9: return [3 /*break*/, 16];
            case 10:
                e_1_1 = _c.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 16];
            case 11:
                _c.trys.push([11, , 14, 15]);
                if (!(colors_1_1 && !colors_1_1.done && (_a = colors_1["return"]))) return [3 /*break*/, 13];
                return [4 /*yield*/, _a.call(colors_1)];
            case 12:
                _c.sent();
                _c.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 15: return [7 /*endfinally*/];
            case 16: return [4 /*yield*/, productAssets_model_1["default"].find({
                    productId: product.id
                }).sort({
                    type: 1
                })];
            case 17:
                productsAssets = _c.sent();
                _c.label = 18;
            case 18:
                _c.trys.push([18, 24, 25, 30]);
                productsAssets_1 = __asyncValues(productsAssets);
                _c.label = 19;
            case 19: return [4 /*yield*/, productsAssets_1.next()];
            case 20:
                if (!(productsAssets_1_1 = _c.sent(), !productsAssets_1_1.done)) return [3 /*break*/, 23];
                it = productsAssets_1_1.value;
                return [4 /*yield*/, assets_model_1["default"].findOne({
                        _id: it.assetsId
                    })];
            case 21:
                assets = _c.sent();
                product["images"].push(assets);
                _c.label = 22;
            case 22: return [3 /*break*/, 19];
            case 23: return [3 /*break*/, 30];
            case 24:
                e_2_1 = _c.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 30];
            case 25:
                _c.trys.push([25, , 28, 29]);
                if (!(productsAssets_1_1 && !productsAssets_1_1.done && (_b = productsAssets_1["return"]))) return [3 /*break*/, 27];
                return [4 /*yield*/, _b.call(productsAssets_1)];
            case 26:
                _c.sent();
                _c.label = 27;
            case 27: return [3 /*break*/, 29];
            case 28:
                if (e_2) throw e_2.error;
                return [7 /*endfinally*/];
            case 29: return [7 /*endfinally*/];
            case 30: return [4 /*yield*/, getParentCategory_helper_1["default"](product.categoryId[0])];
            case 31:
                listParentCategory = _c.sent();
                listIdParentCategory = listParentCategory.map(function (it) { return new mongodb_1.ObjectId(it.id); });
                findProduct = {
                    categoryId: {
                        $in: listIdParentCategory
                    },
                    status: "active",
                    deleted: false
                };
                sortProduct = {
                // position: -1,
                };
                return [4 /*yield*/, products_model_1["default"].find(findProduct).sort(sortProduct).limit(15)];
            case 32:
                products = _c.sent();
                return [4 /*yield*/, productNewAndFeatured_helper_1.productNewAnhFeature(products)];
            case 33:
                _c.sent();
                res.render("client/pages/products/detail.pug", {
                    pageTitle: product.name,
                    product: product,
                    products: products,
                    listParentCategory: listParentCategory
                });
                return [2 /*return*/];
        }
    });
}); };
exports.detail = detail;
var getSize = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var slug, product, listItems, listSizes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                slug = req.params.slug;
                return [4 /*yield*/, products_model_1["default"].findOne({
                        slug: slug
                    })];
            case 1:
                product = _a.sent();
                return [4 /*yield*/, product_items_model_1["default"].find({
                        productId: new mongodb_1.ObjectId(product.id),
                        color: new mongodb_1.ObjectId(req.body.color),
                        status: "active"
                    })];
            case 2:
                listItems = _a.sent();
                listSizes = [];
                listItems.forEach(function (it) {
                    if (!listSizes.find(function (size) { return size == it.size.toString(); })) {
                        listSizes.push(it.size.toString());
                    }
                });
                res.json({
                    code: 200,
                    listSizes: listSizes
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getSize = getSize;
var getItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, color, size, slug, product, listItems, productItem;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, color = _a.color, size = _a.size;
                slug = req.params.slug;
                return [4 /*yield*/, products_model_1["default"].findOne({
                        slug: slug
                    })];
            case 1:
                product = _b.sent();
                return [4 /*yield*/, product_items_model_1["default"].findOne({
                        productId: new mongodb_1.ObjectId(product.id),
                        color: new mongodb_1.ObjectId(color),
                        size: new mongodb_1.ObjectId(size)
                    }).lean()];
            case 2:
                listItems = _b.sent();
                productItem = __assign({}, listItems);
                productItem["priceNew"] = Math.ceil(productItem.price - productItem.price * (productItem.discount / 100));
                res.json({
                    code: 200,
                    productItem: productItem
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getItem = getItem;
var search = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var method, key, regexTitle, keySlug, regexSlug, find, products, newProduct, products_1, products_1_1, it, data, img, img_1, img_1_1, image, assets__main, e_3_1, listItem, minItem, e_4_1, error_1;
    var e_4, _a, e_3, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 29, , 30]);
                method = req.params.method;
                key = req.query["tu-khoa"].toString();
                regexTitle = new RegExp(key, "i");
                keySlug = unidecode_1["default"](key.trim().replace(/\s+/g, "-"));
                regexSlug = new RegExp(keySlug, "i");
                find = {
                    deleted: false,
                    status: "active",
                    $or: [
                        {
                            name: regexTitle
                        },
                        {
                            slug: regexSlug
                        },
                    ]
                };
                return [4 /*yield*/, products_model_1["default"].find(find).lean()];
            case 1:
                products = _c.sent();
                newProduct = [];
                _c.label = 2;
            case 2:
                _c.trys.push([2, 22, 23, 28]);
                products_1 = __asyncValues(products);
                _c.label = 3;
            case 3: return [4 /*yield*/, products_1.next()];
            case 4:
                if (!(products_1_1 = _c.sent(), !products_1_1.done)) return [3 /*break*/, 21];
                it = products_1_1.value;
                data = __assign({}, it);
                it["img_main"] = [];
                return [4 /*yield*/, productAssets_model_1["default"].find({
                        productId: it._id,
                        type: "main"
                    })];
            case 5:
                img = _c.sent();
                if (!(img.length > 0)) return [3 /*break*/, 18];
                _c.label = 6;
            case 6:
                _c.trys.push([6, 12, 13, 18]);
                img_1 = (e_3 = void 0, __asyncValues(img));
                _c.label = 7;
            case 7: return [4 /*yield*/, img_1.next()];
            case 8:
                if (!(img_1_1 = _c.sent(), !img_1_1.done)) return [3 /*break*/, 11];
                image = img_1_1.value;
                return [4 /*yield*/, assets_model_1["default"].findOne({
                        _id: image.assetsId
                    })];
            case 9:
                assets__main = _c.sent();
                it["img_main"].push(assets__main.path);
                _c.label = 10;
            case 10: return [3 /*break*/, 7];
            case 11: return [3 /*break*/, 18];
            case 12:
                e_3_1 = _c.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 18];
            case 13:
                _c.trys.push([13, , 16, 17]);
                if (!(img_1_1 && !img_1_1.done && (_b = img_1["return"]))) return [3 /*break*/, 15];
                return [4 /*yield*/, _b.call(img_1)];
            case 14:
                _c.sent();
                _c.label = 15;
            case 15: return [3 /*break*/, 17];
            case 16:
                if (e_3) throw e_3.error;
                return [7 /*endfinally*/];
            case 17: return [7 /*endfinally*/];
            case 18:
                data["img_main"] = it["img_main"];
                return [4 /*yield*/, product_items_model_1["default"].find({
                        productId: it._id
                    })];
            case 19:
                listItem = _c.sent();
                if (listItem.length > 0) {
                    if (listItem.length > 1) {
                        minItem = listItem.reduce(function (min, item) {
                            return Math.ceil(item.price * item.discount) <
                                Math.ceil(min.price * min.discount)
                                ? item
                                : min;
                        }, listItem[0]);
                        it["priceNew"] = Math.ceil(minItem.price - minItem.price * (minItem.discount / 100));
                        it.price = minItem.price;
                        it.discount = minItem.discount;
                        // data["priceNew"] = it["priceNew"];
                    }
                    else {
                        it["priceNew"] = Math.ceil(listItem[0].price - listItem[0].price * (listItem[0].discount / 100));
                        it.price = listItem[0].price;
                        it.discount = listItem[0].discount;
                    }
                    data["priceNew"] = it["priceNew"];
                    data["price"] = it["price"];
                    data["discount"] = it["discount"];
                    data["link"] = "" + index_routes_1["default"].CLIENT.PRODUCT.PATH + index_routes_1["default"].CLIENT.PRODUCT.DETAIL + "/" + it["slug"];
                    newProduct.push(data);
                }
                _c.label = 20;
            case 20: return [3 /*break*/, 3];
            case 21: return [3 /*break*/, 28];
            case 22:
                e_4_1 = _c.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 28];
            case 23:
                _c.trys.push([23, , 26, 27]);
                if (!(products_1_1 && !products_1_1.done && (_a = products_1["return"]))) return [3 /*break*/, 25];
                return [4 /*yield*/, _a.call(products_1)];
            case 24:
                _c.sent();
                _c.label = 25;
            case 25: return [3 /*break*/, 27];
            case 26:
                if (e_4) throw e_4.error;
                return [7 /*endfinally*/];
            case 27: return [7 /*endfinally*/];
            case 28:
                if (method == "trang") {
                    res.render("client/pages/products/search.pug", {
                        products: products,
                        key: key
                    });
                }
                else {
                    res.json({
                        code: 200,
                        products: newProduct
                    });
                }
                return [3 /*break*/, 30];
            case 29:
                error_1 = _c.sent();
                res.status(400);
                return [3 /*break*/, 30];
            case 30: return [2 /*return*/];
        }
    });
}); };
exports.search = search;
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, khoanggia, mausac, kichthuoc, findProduct, sortProduct, name, value, products, listProduct, name, value_1, pagination, paginatedList, listColors, listSizes;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, khoanggia = _a.khoanggia, mausac = _a.mausac, kichthuoc = _a.kichthuoc;
                findProduct = {
                    status: "active",
                    deleted: false
                };
                sortProduct = {};
                if (typeof req.query.sapxep === "string") {
                    name = req.query.sapxep.split("-")[0];
                    value = req.query.sapxep.split("-")[1];
                    if (name === "tensanpham") {
                        sortProduct["name"] = value === "tangdan" ? 1 : -1;
                    }
                    else if (name === "sanpham")
                        sortProduct["position"] = value === "moinhat" ? -1 : 1;
                }
                else {
                    sortProduct["position"] = -1;
                }
                return [4 /*yield*/, products_model_1["default"].find(findProduct).sort(sortProduct)];
            case 1:
                products = _b.sent();
                listProduct = [];
                return [4 /*yield*/, Promise.all(products.map(function (it) { return __awaiter(void 0, void 0, void 0, function () {
                        var find, color, size, items, _a, min, max, price, name, value;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    find = { productId: it.id };
                                    if (!mausac) return [3 /*break*/, 2];
                                    return [4 /*yield*/, colorProduct_model_1["default"].findOne({ slug: mausac })];
                                case 1:
                                    color = _b.sent();
                                    find["color"] = color ? color.id : it.id;
                                    _b.label = 2;
                                case 2:
                                    if (!kichthuoc) return [3 /*break*/, 4];
                                    return [4 /*yield*/, sizeProduct_model_1["default"].findOne({ slug: kichthuoc })];
                                case 3:
                                    size = _b.sent();
                                    find["size"] = size ? size.id : it.id;
                                    _b.label = 4;
                                case 4: return [4 /*yield*/, product_items_model_1["default"].findOne(find)];
                                case 5:
                                    items = _b.sent();
                                    if (items) {
                                        if (khoanggia) {
                                            _a = khoanggia.toString().split("-").map(Number), min = _a[0], max = _a[1];
                                            price = Math.ceil(items.price - items.price * (items.discount / 100));
                                            if (price >= min && price <= max) {
                                                listProduct.push(it);
                                            }
                                        }
                                        else if (typeof req.query.sapxep === "string") {
                                            name = req.query.sapxep.split("-")[0];
                                            value = req.query.sapxep.split("-")[1];
                                            if (name == "danggiam") {
                                                if (value == "true" && items.discount > 0)
                                                    listProduct.push(it);
                                                if (value == "false" && items.discount == 0)
                                                    listProduct.push(it);
                                            }
                                            else if (name == "phobien") {
                                                if (value == "true" && it["featured"] == true)
                                                    listProduct.push(it);
                                            }
                                        }
                                        else {
                                            listProduct.push(it);
                                        }
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                _b.sent();
                // Thêm thông tin hình ảnh và giá cho sản phẩm
                return [4 /*yield*/, Promise.all(listProduct.map(function (it) { return __awaiter(void 0, void 0, void 0, function () {
                        var img, _a, _b, listItem, minItem;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    // Thêm hình ảnh chính
                                    it["img_main"] = [];
                                    return [4 /*yield*/, productAssets_model_1["default"].find({ productId: it.id, type: "main" })];
                                case 1:
                                    img = _c.sent();
                                    if (!(img.length > 0)) return [3 /*break*/, 3];
                                    _a = it;
                                    _b = "img_main";
                                    return [4 /*yield*/, Promise.all(img.map(function (image) { return __awaiter(void 0, void 0, void 0, function () {
                                            var assets__main;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, assets_model_1["default"].findOne({ _id: image.assetsId })];
                                                    case 1:
                                                        assets__main = _a.sent();
                                                        return [2 /*return*/, assets__main.path];
                                                }
                                            });
                                        }); }))];
                                case 2:
                                    _a[_b] = _c.sent();
                                    _c.label = 3;
                                case 3: return [4 /*yield*/, product_items_model_1["default"].find({ productId: it.id })];
                                case 4:
                                    listItem = _c.sent();
                                    if (listItem.length > 0) {
                                        minItem = listItem.reduce(function (min, item) {
                                            return Math.ceil(item.price - item.price * (item.discount / 100)) <
                                                Math.ceil(min.price - min.price * (min.discount / 100))
                                                ? item
                                                : min;
                                        });
                                        it["priceNew"] = Math.ceil(minItem.price - minItem.price * (minItem.discount / 100));
                                        it.price = minItem.price;
                                        it.discount = minItem.discount;
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 3:
                // Thêm thông tin hình ảnh và giá cho sản phẩm
                _b.sent();
                // Sắp xếp theo giá nếu có
                if (typeof req.query.sapxep === "string") {
                    name = req.query.sapxep.split("-")[0];
                    value_1 = req.query.sapxep.split("-")[1];
                    if (name === "gia") {
                        listProduct.sort(function (a, b) {
                            return value_1 === "tangdan" ? a.priceNew - b.priceNew : b.priceNew - a.priceNew;
                        });
                    }
                }
                else {
                    listProduct.sort(function (a, b) { return b.position - a.position; });
                }
                pagination = {
                    current: req.query.trang ? parseInt(req.query.trang) : 1,
                    limit: 9
                };
                pagination["totalProduct"] = listProduct.length;
                pagination["totalPage"] = Math.ceil(pagination["totalProduct"] / pagination.limit);
                if (pagination.current > pagination["totalPage"])
                    pagination.current = 1;
                pagination["skip"] = (pagination.current - 1) * pagination.limit;
                paginatedList = listProduct.slice(pagination["skip"], pagination["skip"] + pagination.limit);
                return [4 /*yield*/, colorProduct_model_1["default"].find({ status: "active" })];
            case 4:
                listColors = _b.sent();
                return [4 /*yield*/, sizeProduct_model_1["default"].find({ status: "active" })];
            case 5:
                listSizes = _b.sent();
                res.render("client/pages/products/index.pug", {
                    pageTitle: "Danh sách sản phẩm",
                    products: paginatedList,
                    listColors: listColors,
                    listSizes: listSizes,
                    pagination: pagination
                });
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var review = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newReview;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req.body.customer_id = new mongodb_1.ObjectId(res.locals.INFOR_CUSTOMER.id);
                req.body.product_id = new mongodb_1.ObjectId(req.params.id);
                newReview = new reviews_model_1["default"](req.body);
                return [4 /*yield*/, newReview.save()];
            case 1:
                _a.sent();
                res.json({
                    code: 200
                });
                return [2 /*return*/];
        }
    });
}); };
exports.review = review;
