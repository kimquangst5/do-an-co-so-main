"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ROUTER_CLIENT = {
    PRODUCT: {
        PATH: "/san-pham",
        DETAIL: "/chi-tiet",
        SEARCH: "/ket-qua-tim-kiem",
        INDEX: "/danh-sach",
    },
    CUSTOMER: {
        PATH: "/khach-hang",
        LOGIN: "/dang-nhap",
        REGISTER: "/dang-ky",
        LOGOUT: "/dang-xuat",
        REVIEW: "/danh-gia",
        GOOGLE: "/dang-nhap-bang-google",
        GOOGLE_CALLBACK: "/dang-nhap-bang-google-tra-ve-ket-qua",
        FORGOT_PASSWORD: "/quen-mat-khau",
        FORGOT_PASSWORD_OTP: "/quen-mat-khau-nhap-ma-otp",
        FORGOT_PASSWORD_NEW_PASSWORD: "/quen-mat-khau-nhap-ma-mat-khau-moi",
        INFOR_CUSTOMER: "/thong-tin-khach-hang",
        INFOR_CUSTOMER_UPDATE_INFOR: "/sua-thong-tin",
        INFOR_CUSTOMER_UPDATE_EMAIL: "/sua-email",
        INFOR_CUSTOMER_UPDATE_PHONE: "/sua-so-dien-thoai",
        INFOR_CUSTOMER_UPDATE_PASSWORD: "/doi-mat-khau",
        INFOR_CUSTOMER_CREATE_OTP: "/tao-otp",
        ADDRESS: "/dia-chi-nhan-hang",
        UPDATE_ADDRESS_DEFAULT: "/cap-nhat-dia-chi-mac-dinh",
        CREATE_ADDRESS: "/them-dia-chi-nhan-hang",
        UPDATE_ADDRESS: "/cap-nhat-dia-chi-nhan-hang",
    },
    CART: {
        PATH: "/gio-hang",
        INDEX: "/tong-quan",
        ADD: "/them-san-pham-vao-gio",
        DELETE: "/xoa-san-pham-khoi-gio-hang",
        ADD_QUANTITY: "/them-so-luong",
        DECREASE: "/giam-so-luong",
        GET_CART: "/lay-san-pham-trong-gio",
    },
    CHECKOUT: {
        PATH: "/thanh-toan",
        INDEX: "",
        SUCCESS: "/thanh-cong",
        METHOD_PAY: "/phuong-thuc-thanh-toan",
        CHANGE_STATUS_BANK_SUCCESS: "/thanh-toan-online-thanh-cong",
        CHANGE_STATUS_POLIME_SUCCESS: "/xac-nhan-thanh-toan",
    },
    PRODUCT_CATEGORY: {
        PATH: "/danh-muc",
    },
};
exports.default = ROUTER_CLIENT;
