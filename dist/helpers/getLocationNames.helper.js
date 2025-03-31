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
exports.getLocationNames = getLocationNames;
const axios_1 = __importDefault(require("axios"));
function getLocationNames(cityId, districtId, wardId) {
    return __awaiter(this, void 0, void 0, function* () {
        const Parameter = {
            url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
            method: "GET",
        };
        try {
            const response = yield (0, axios_1.default)(Parameter);
            const data = response.data;
            const city = data.find((c) => c.Id == cityId);
            const cityName = city ? city.Name : "Không tìm thấy";
            const district = city
                ? city.Districts.find((d) => d.Id == districtId)
                : null;
            const districtName = district ? district.Name : "Không tìm thấy";
            const ward = district ? district.Wards.find((w) => w.Id == wardId) : null;
            const wardName = ward ? ward.Name : "Không tìm thấy";
            return { cityName, districtName, wardName };
        }
        catch (error) {
            console.error("Lỗi khi lấy dữ liệu địa lý:", error);
            return { cityName: "", districtName: "", wardName: "" };
        }
    });
}
