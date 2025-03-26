import { geoip } from 'geoip-lite';
import { Request, Response } from "express";
import { authService } from "../../services/admin/index.service";
import jwt from "jsonwebtoken";
import Account from "../../models/accounts.model";
import uaParser, { UAParser } from "ua-parser-js";
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
        res.cookie("token", checkLogin.token);
        const userAgentString = req.headers["user-agent"];
        const parser = new UAParser(userAgentString);
        const uaResult = parser.getResult();
        const ipAddress =
          (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
          req.ip ||
          req.connection.remoteAddress;

        const geo = geoip.lookup(ipAddress) || {};
        let browserName = uaResult.browser.name || "Chưa rõ";
        if (navigator.userAgent.indexOf("Cốc Cốc") !== -1) {
          browserName = "Cốc Cốc";
        }

        const deviceInfo = {
          // Thông tin hiện có
          browser: browserName,
          browserVersion: uaResult.browser.version || "Chưa rõ", // Phiên bản trình duyệt
          os: uaResult.os.name || "Chưa rõ", // Hệ điều hành
          osVersion: uaResult.os.version || "Chưa rõ", // Phiên bản hệ điều hành
          device: uaResult.device.model || "Chưa rõ", // Model thiết bị
          deviceType: uaResult.device.type || "Chưa rõ", // Loại thiết bị
          deviceVendor: uaResult.device.vendor || "Chưa rõ", // Nhà sản xuất thiết bị
          ip: ipAddress, // Địa chỉ IP

          // Vị trí địa lý từ IP
          country: geo.country || "Chưa rõ", // Mã quốc gia (VN, US, ...)
          region: geo.region || "Chưa rõ", // Khu vực/bang
          city: geo.city || "Chưa rõ", // Thành phố
          latitude: geo.ll ? geo.ll[0] : "Chưa rõ", // Vĩ độ
          longitude: geo.ll ? geo.ll[1] : "Chưa rõ", // Kinh độ
          createdAt: Date.now(),
        };
        if (ipAddress != "::1")
          await Account.updateOne(
            {
              _id: new ObjectId(user.id),
            },
            {
              $push: {
                deviceInfo: deviceInfo,
              },
            }
          );
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
