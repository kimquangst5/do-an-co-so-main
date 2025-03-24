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
exports.index = void 0;
const products_model_1 = __importDefault(require("../../models/products.model"));
const productNewAndFeatured_helper_1 = require("../../helpers/productNewAndFeatured.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield products_model_1.default.find({
        deleted: false,
        status: "active",
    })
        .sort({
        position: -1,
    })
        .limit(10);
    const productsFeatured = yield products_model_1.default.find({
        deleted: false,
        status: "active",
        featured: true,
    })
        .sort({
        position: -1,
    })
        .limit(10);
    yield (0, productNewAndFeatured_helper_1.productNewAnhFeature)(products);
    yield (0, productNewAndFeatured_helper_1.productNewAnhFeature)(productsFeatured);
    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        products,
        productsFeatured,
    });
});
exports.index = index;
