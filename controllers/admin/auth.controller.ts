import { Request, Response } from "express";
import { authService } from "../../services/admin/index.service";
import jwt from "jsonwebtoken";
import Account from "../../models/accounts.model";
import uaParser, { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import { ObjectId } from "mongodb";
const index = (req: Request, res: Response) => {
  res.render("admin/pages/auth/login.pug", {
    pageTitle: "Đăng nhập quản trị",
    pageDesc: "Đăng nhập quản trị",
  });
};

const checkLogin = async (req: Request, res: Response) => {
  const checkLogin = await authService.checkLogin(req.body);

  if (checkLogin) {
    try {
      const user = await authService.verifyToken(checkLogin.token);
      if (user) {
        console.log(user.id);

        res.cookie("token", checkLogin.token);
        const userAgentString = req.headers["user-agent"];
        const parser = new UAParser(userAgentString);
        const uaResult = parser.getResult();

        // Lấy địa chỉ IP chính xác
        const ipAddress =
          (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
          req.ip ||
          req.connection.remoteAddress;

        // Tra cứu vị trí địa lý từ IP
        const geo = geoip.lookup(ipAddress) || {};

        const deviceInfo = {
          // Thông tin hiện có
          browser: uaResult.browser.name || "Unknown", // Tên trình duyệt
          browserVersion: uaResult.browser.version || "Unknown", // Phiên bản trình duyệt
          os: uaResult.os.name || "Unknown", // Hệ điều hành
          osVersion: uaResult.os.version || "Unknown", // Phiên bản hệ điều hành
          device: uaResult.device.model || "Unknown", // Model thiết bị
          deviceType: uaResult.device.type || "Desktop", // Loại thiết bị
          deviceVendor: uaResult.device.vendor || "Unknown", // Nhà sản xuất thiết bị
          ip: ipAddress, // Địa chỉ IP

          // Vị trí địa lý từ IP
          country: geo.country || "Unknown", // Mã quốc gia (VN, US, ...)
          region: geo.region || "Unknown", // Khu vực/bang
          city: geo.city || "Unknown", // Thành phố
          latitude: geo.ll ? geo.ll[0] : "Unknown", // Vĩ độ
          longitude: geo.ll ? geo.ll[1] : "Unknown", // Kinh độ
        };
        console.log(deviceInfo);

        await Account.updateOne(
          {
            _id: new ObjectId(user.id),
          },
          {
            deviceInfo: deviceInfo,
          }
        );

        console.log("Device Info:", deviceInfo);
      }
    } catch (error) {
      const token = await authService.createToken(checkLogin.id);
      await Account.updateOne(
        {
          _id: checkLogin.id,
        },
        {
          token: token,
        }
      );
      res.cookie("token", token);
    }
    res.json({
      code: 200,
    });
  } else {
    res.json({
      code: 400,
    });
  }
};
export { index, checkLogin };
