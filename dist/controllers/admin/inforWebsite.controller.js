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
exports.updatePatch = exports.index = void 0;
const info_website_model_1 = __importDefault(require("../../models/info-website.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inforWebsite = yield info_website_model_1.default.findOne({});
    res.render("admin/pages/infor-website/index.pug", {
        pageTitle: "Thông tin website",
        pageDesc: "Thông tin website",
        inforWebsite,
    });
});
exports.index = index;
const updatePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    yield info_website_model_1.default.findOneAndUpdate({}, req.body, {
        upsert: true,
        new: true,
    });
    res.json({
        code: 200,
    });
});
exports.updatePatch = updatePatch;
