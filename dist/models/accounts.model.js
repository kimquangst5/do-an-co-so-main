"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../constants/enum");
const mongoose_2 = __importDefault(require("mongoose"));
const accountsSchema = new mongoose_1.Schema({
    fullname: String,
    roles: mongoose_1.Types.ObjectId,
    usename: String,
    email: String,
    password: String,
    token: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: enum_1.STATUS.ACTIVE,
    },
    deviceInfo: [
        {
            browser: String,
            browserVersion: String,
            os: String,
            osVersion: String,
            device: String,
            deviceType: String,
            deviceVendor: String,
            ip: String,
            country: String,
            region: String,
            city: String,
            latitude: String,
            longitude: String,
        },
    ],
    createdBy: mongoose_2.default.SchemaTypes.ObjectId,
}, {
    timestamps: true,
    autoCreate: true,
});
const Account = (0, mongoose_1.model)("Account", accountsSchema);
exports.default = Account;
