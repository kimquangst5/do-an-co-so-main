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
exports.changeStatus = exports.index = void 0;
const reviews_model_1 = __importDefault(require("../../models/reviews.model"));
const products_model_1 = __importDefault(require("../../models/products.model"));
const customers_model_1 = __importDefault(require("../../models/customers.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield reviews_model_1.default.find({});
    for (const it of reviews) {
        const product = yield products_model_1.default.findOne({
            _id: it.product_id
        }).select('name');
        console.log(product);
        const customer = yield customers_model_1.default.findOne({
            _id: it.customer_id
        }).select('fullname');
        it['product_name'] = product.name;
        it['customer_name'] = customer.fullname;
    }
    res.render("admin/pages/reviews/index.pug", {
        pageTitle: "Danh sách đánh giá / bình luận",
        pageDesc: "Danh sách đánh giá / bình luận",
        reviews
    });
});
exports.index = index;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const { id } = req.params;
    console.log(id);
    let review = yield reviews_model_1.default.findOne({
        _id: id
    });
    yield reviews_model_1.default.updateOne({
        _id: id
    }, { is_approved: !review.is_approved });
    res.json({
        code: 200
    });
});
exports.changeStatus = changeStatus;
