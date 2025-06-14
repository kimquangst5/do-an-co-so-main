"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_PAY = exports.STATUS_ORDER = exports.TYPE_IMAGE = exports.STATUS = void 0;
const STATUS = {
    ACTIVE: "active",
    INACTIVE: "inactive",
};
exports.STATUS = STATUS;
const TYPE_IMAGE = {
    MAIN: "main",
    SUB: "sub",
};
exports.TYPE_IMAGE = TYPE_IMAGE;
const STATUS_ORDER = {
    INITIAL: "khoi-tao",
    WAIT_CONFIRMATION: "cho-xac-nhan",
    WAIT_PICK_UP_GOODS: "cho-lay-hang",
    IN_TRANSIT: "dang-giao-hang",
    DELIVERED: "da-giao-hang",
    DELIVERY_FAILED: "giao-hang-that-bai",
    RETURNING: "dang-hoan-tra",
    RETURNED: "da-hoan-tra",
    CANCELLED: "da-huy",
    COMPLETED: "hoan-thanh",
    PAY_SUCCESS: "thanh-toan-thanh-cong",
};
exports.STATUS_ORDER = STATUS_ORDER;
const STATUS_PAY = {
    PAY_SUCCESS: 'thanh-toan-thanh-cong',
    PAY_NOT_YET: 'chua-thanh-toan'
};
exports.STATUS_PAY = STATUS_PAY;
