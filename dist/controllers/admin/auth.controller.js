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
const geoip_lite_1 = require("geoip-lite");
const index_service_1 = require("../../services/admin/index.service");
const accounts_model_1 = __importDefault(require("../../models/accounts.model"));
const ua_parser_js_1 = require("ua-parser-js");
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
                res.cookie("token", checkLogin.token);
                const userAgentString = req.headers["user-agent"];
                const parser = new ua_parser_js_1.UAParser(userAgentString);
                const uaResult = parser.getResult();
                const ipAddress = ((_a = req.headers["x-forwarded-for"]) === null || _a === void 0 ? void 0 : _a.split(",")[0]) ||
                    req.ip ||
                    req.connection.remoteAddress;
                const geo = geoip_lite_1.geoip.lookup(ipAddress) || {};
                let browserName = uaResult.browser.name || "Chưa rõ";
                if (navigator.userAgent.indexOf("Cốc Cốc") !== -1) {
                    browserName = "Cốc Cốc";
                }
                const deviceInfo = {
                    browser: browserName,
                    browserVersion: uaResult.browser.version || "Chưa rõ",
                    os: uaResult.os.name || "Chưa rõ",
                    osVersion: uaResult.os.version || "Chưa rõ",
                    device: uaResult.device.model || "Chưa rõ",
                    deviceType: uaResult.device.type || "Chưa rõ",
                    deviceVendor: uaResult.device.vendor || "Chưa rõ",
                    ip: ipAddress,
                    country: geo.country || "Chưa rõ",
                    region: geo.region || "Chưa rõ",
                    city: geo.city || "Chưa rõ",
                    latitude: geo.ll ? geo.ll[0] : "Chưa rõ",
                    longitude: geo.ll ? geo.ll[1] : "Chưa rõ",
                    createdAt: Date.now(),
                };
                if (ipAddress != "::1")
                    yield accounts_model_1.default.updateOne({
                        _id: new mongodb_1.ObjectId(user.id),
                    }, {
                        $push: {
                            deviceInfo: deviceInfo,
                        },
                    });
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
