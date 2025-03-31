import axios from "axios";

async function getLocationNames(cityId: any, districtId: any, wardId: any) {
  const Parameter = {
    url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
    method: "GET",
    // responseType: "json",
  };
  try {
    const response = await axios(Parameter);
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
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu địa lý:", error);
    return { cityName: "", districtName: "", wardName: "" };
  }
}

export { getLocationNames };
