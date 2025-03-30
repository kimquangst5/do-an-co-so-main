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
exports.create = void 0;
const carts_model_1 = __importDefault(require("../../models/carts.model"));
const products_model_1 = __importDefault(require("../../models/products.model"));
const product_items_model_1 = __importDefault(require("../../models/product-items.model"));
const colorProduct_model_1 = __importDefault(require("../../models/colorProduct.model"));
const sizeProduct_model_1 = __importDefault(require("../../models/sizeProduct.model"));
require("dotenv").config();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let arrayError = "";
    try {
        let { fullname, email, phone, address, city, district, ward, note, cart } = req.body;
        if (!res.locals.INFOR_CUSTOMER) {
            res.status(400).json({
                message: "Vui lòng đăng nhập để thanh toán!",
            });
            return;
        }
        const requiredFields = [
            { value: fullname.trim(), message: "Vui lòng điền Họ và tên!" },
            { value: email.trim(), message: "Vui lòng điền email!" },
            { value: phone.trim(), message: "Vui lòng điền số điện thoại!" },
            { value: address.trim(), message: "Vui lòng điền địa chỉ!" },
            { value: city, message: "Vui lòng điền Tỉnh/thành phố!" },
            { value: district, message: "Vui lòng điền Quận/Huyện!" },
            { value: ward, message: "Vui lòng điền Xã/Phường!" },
        ];
        for (const field of requiredFields) {
            if (!field.value) {
                arrayError += field.message + "\n";
            }
        }
        const regexFullname = /^\s*\S+(\s+\S+)+\s*$/;
        if (fullname.trim() && regexFullname.test(fullname.trim()) == false) {
            arrayError += "Họ tên quá ngắn!" + "\n";
        }
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (email && emailRegex.test(email) == false) {
            arrayError += "Email không hợp lệ!" + "\n";
        }
        if (phone && phone.length != 10) {
            arrayError += "Số điện thoại không hợp lệ!" + "\n";
        }
        address = address.trim().replace(/\s+/g, " ");
        const addressRegex = /^\s*\d+\s+\p{L}[\p{L}\s]*$/u;
        if (addressRegex.test(address) == false) {
            arrayError += "Địa chỉ phải bao gồm số nhà và tên đường!" + "\n";
        }
        for (const idCart of cart) {
            const cartItem = yield carts_model_1.default.findOne({
                _id: idCart,
            });
            const productItem = yield product_items_model_1.default.findOne({
                _id: cartItem.productItemId,
            });
            const product = yield products_model_1.default.findOne({
                _id: productItem.productId,
            });
            const color = yield colorProduct_model_1.default.findOne({
                _id: productItem.color,
            });
            const size = yield sizeProduct_model_1.default.findOne({
                _id: productItem.size,
            });
            if (cartItem.quantity > productItem.quantity) {
                arrayError += `Chúng tôi xin lỗi! Sản phẩm <b class='text-[red]'>${product.name} (${color.name}, ${size.name})</b> chỉ còn  <b class='text-[red]'>${productItem.quantity}</b> cái`;
            }
        }
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
            "Xác nhận đơn thất bại. Vui lòng liên hệ với quản trị viên!" + "\n";
        if (arrayError) {
            res.status(400).json({
                message: arrayError,
            });
            return;
        }
    }
});
exports.create = create;
