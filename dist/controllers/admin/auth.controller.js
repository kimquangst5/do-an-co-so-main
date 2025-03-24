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
exports.checkLogin = exports.index = void 0;
const index_service_1 = require("../../services/admin/index.service");
const accounts_model_1 = __importDefault(require("../../models/accounts.model"));
const ua_parser_js_1 = require("ua-parser-js");
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const mongodb_1 = require("mongodb");
const index = (req, res) => {
    res.render("admin/pages/auth/login.pug", {
        pageTitle: "Đăng nhập quản trị",
        pageDesc: "Đăng nhập quản trị",
    });
};
exports.index = index;
const checkLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const checkLogin = yield index_service_1.authService.checkLogin(req.body);
    if (checkLogin) {
        try {
            const user = yield index_service_1.authService.verifyToken(checkLogin.token);
            if (user) {
                console.log(user.id);
                res.cookie("token", checkLogin.token);
                const userAgentString = req.headers["user-agent"];
                const parser = new ua_parser_js_1.UAParser(userAgentString);
                const uaResult = parser.getResult();
                const ipAddress = ((_a = req.headers["x-forwarded-for"]) === null || _a === void 0 ? void 0 : _a.split(",")[0]) ||
                    req.ip ||
                    req.connection.remoteAddress;
                const geo = geoip_lite_1.default.lookup(ipAddress) || {};
                const deviceInfo = {
                    browser: uaResult.browser.name || "Unknown",
                    browserVersion: uaResult.browser.version || "Unknown",
                    os: uaResult.os.name || "Unknown",
                    osVersion: uaResult.os.version || "Unknown",
                    device: uaResult.device.model || "Unknown",
                    deviceType: uaResult.device.type || "Desktop",
                    deviceVendor: uaResult.device.vendor || "Unknown",
                    ip: ipAddress,
                    country: geo.country || "Unknown",
                    region: geo.region || "Unknown",
                    city: geo.city || "Unknown",
                    latitude: geo.ll ? geo.ll[0] : "Unknown",
                    longitude: geo.ll ? geo.ll[1] : "Unknown",
                };
                console.log(deviceInfo);
                yield accounts_model_1.default.updateOne({
                    _id: new mongodb_1.ObjectId(user.id),
                }, {
                    deviceInfo: deviceInfo,
                });
                console.log("Device Info:", deviceInfo);
            }
        }
        catch (error) {
            const token = yield index_service_1.authService.createToken(checkLogin.id);
            yield accounts_model_1.default.updateOne({
                _id: checkLogin.id,
            }, {
                token: token,
            });
            res.cookie("token", token);
        }
        res.json({
            code: 200,
        });
    }
    else {
        res.json({
            code: 400,
        });
    }
});
exports.checkLogin = checkLogin;
