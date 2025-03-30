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
exports.addValidate = void 0;
const product_items_model_1 = __importDefault(require("../../models/product-items.model"));
const products_model_1 = __importDefault(require("../../models/products.model"));
const colorProduct_model_1 = __importDefault(require("../../models/colorProduct.model"));
const sizeProduct_model_1 = __importDefault(require("../../models/sizeProduct.model"));
const carts_model_1 = __importDefault(require("../../models/carts.model"));
require("dotenv").config();
const addValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let arrayError = "";
    try {
        if (!res.locals.INFOR_CUSTOMER) {
            res.status(400).json({
                message: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ!",
            });
            return;
        }
        const { colorId, sizeId, quantity } = req.body;
        const { productId } = req.params;
        const productItem = yield product_items_model_1.default.findOne({
            productId: productId,
            size: sizeId,
            color: colorId,
        }).select("quantity");
        const product = yield products_model_1.default.findOne({
            _id: productId,
        }).select("name");
        const color = yield colorProduct_model_1.default.findOne({
            _id: colorId,
        }).select("name");
        const size = yield sizeProduct_model_1.default.findOne({
            _id: sizeId,
        }).select("name");
        const cartCustomer = yield carts_model_1.default.findOne({
            customerId: res.locals.INFOR_CUSTOMER.id,
            productItemId: productItem.id,
        });
        if (cartCustomer) {
            let cntStockProduct = parseInt(quantity) + cartCustomer["quantity"];
            if (cntStockProduct > productItem.quantity)
                arrayError += `Chúng tôi xin lỗi! Sản phẩm <b class='text-[red]'>${product.name} (${color.name}, ${size.name})</b> chỉ còn  <b class='text-[red]'>${productItem.quantity}</b> cái\nGiỏ hàng của bạn đã có <b class='text-[red]'>${cartCustomer["quantity"]}</b> cái`;
        }
        else if (quantity > productItem.quantity)
            arrayError += `Chúng tôi xin lỗi! Sản phẩm <b class='text-[red]'>${product.name} (${color.name}, ${size.name})</b> chỉ còn  <b class='text-[red]'>${productItem.quantity}</b> cái`;
        if (arrayError) {
            res.status(400).json({
                message: arrayError,
            });
            return;
        }
        next();
    }
    catch (error) {
        arrayError +=
            "Thêm sản phẩm vào giỏ thất bại. Vui lòng liên hệ với quản trị viên!" +
                "\n";
        if (arrayError) {
            res.status(400).json({
                message: arrayError,
            });
            return;
        }
    }
});
exports.addValidate = addValidate;
