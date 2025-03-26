"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const infoWebsiteSchema = new mongoose_1.default.Schema({
    nameWeb: String,
    nameCompany: String,
    hotline: String,
    phone: String,
    email: String,
    address: String,
    map: String,
    copyright: String,
    logo: String,
}, {
    timestamps: true,
    autoCreate: true,
});
const InfoWebsite = mongoose_1.default.model("InfoWebsite", infoWebsiteSchema);
exports.default = InfoWebsite;
