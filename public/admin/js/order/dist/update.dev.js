"use strict";

var citis = document.getElementById("city");
var districts = document.getElementById("district");
var wards = document.getElementById("ward");
var Parameter = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
  method: "GET",
  responseType: "json"
};
var promise = axios(Parameter);

var renderCity = function renderCity(data) {
  // Điền danh sách tỉnh/thành
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var x = _step.value;
      citis.options[citis.options.length] = new Option(x.Name, parseInt(x.Id));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  $(citis).selectpicker("refresh"); // Sự kiện thay đổi tỉnh/thành

  citis.onchange = function () {
    var _this = this;

    districts.length = 1;
    wards.length = 1;
    $(districts).selectpicker("refresh");
    $(wards).selectpicker("refresh");

    if (this.value != "") {
      var result = data.find(function (n) {
        return n.Id === _this.value;
      });
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = result.Districts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var k = _step2.value;
          districts.options[districts.options.length] = new Option(k.Name, parseInt(k.Id));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      $(districts).selectpicker("refresh");
    }
  }; // Đặt giá trị mặc định cho city


  if (citis.getAttribute('value')) {
    citis.value = citis.getAttribute('value');
    $(citis).selectpicker("refresh");
    citis.onchange();
  } // Sự kiện thay đổi quận/huyện


  districts.onchange = function () {
    var _this2 = this;

    wards.length = 1;
    $(wards).selectpicker("refresh");
    var dataCity = data.find(function (n) {
      return parseInt(n.Id) === parseInt(citis.value);
    });

    if (this.value != "") {
      var dataDistrict = dataCity.Districts.find(function (n) {
        return parseInt(n.Id) === parseInt(_this2.value);
      });
      var dataWards = dataDistrict.Wards; // Điền danh sách xã/phường

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = dataWards[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var w = _step3.value;
          wards.options[wards.options.length] = new Option(w.Name, parseInt(w.Id));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      $(wards).selectpicker("refresh"); // Đặt giá trị mặc định cho ward

      var wardValue = wards.getAttribute('value');

      if (wardValue) {
        $(wards).selectpicker("val", wardValue);
      }
    }
  }; // Đặt giá trị mặc định cho district


  if (districts.getAttribute('value')) {
    districts.value = districts.getAttribute('value');
    $(districts).selectpicker("refresh");
    districts.onchange();
  }
}; // Gọi API và chạy hàm renderCity


promise.then(function (response) {
  return renderCity(response.data);
});

var main = function main() {
  var btn = document.querySelector('[btn-update-order]');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var status = document.querySelector("[name='status-order']");
    var statusPay = document.querySelector("[name='status-pay']");
    var method = document.querySelector("[name='method']");
    var fullname = document.querySelector("[name='fullname']");
    var email = document.querySelector("[name='email']");
    var phone = document.querySelector("[name='phone']");
    var address = document.querySelector("[name='address']");
    var ward = document.querySelector("[id='ward']");
    var district = document.querySelector("[id='district']");
    var city = document.querySelector("[id='city']");
    var note = document.querySelector("[id='note']");
    var data = {
      status: status.value,
      statusPay: statusPay.value,
      method: method.value,
      inforCustomer: {
        fullname: fullname.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        ward: ward.value,
        district: district.value,
        note: note.value,
        city: city.value
      }
    };
  });
};

main();