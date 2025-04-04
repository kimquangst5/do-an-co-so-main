"use strict";

var changeStatus = function changeStatus() {
  var list = document.querySelectorAll("[change-status]");
  if (list.length == 0) return;
  list.forEach(function (btn) {
    btn.addEventListener("click", function () {
      showLoader();
      var status = btn.getAttribute("variant");
      var data = {};

      if (status == "success") {
        data.status = "inactive";
      } else {
        data.status = "active";
      }

      var link = btn.getAttribute("change-status");

      if (data.status && link) {
        axios.patch(link, data).then(function (res) {
          if (res.status == 200) {
            localStorage.setItem("alert-success", JSON.stringify({
              title: "Cập nhật trạng thái thành công!",
              icon: "success"
            }));
            location.reload();
          }
        });
      }
    });
  });
};

changeStatus();