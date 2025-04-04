"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var listColors = document.querySelectorAll("input[name='color']");
var sizeProduct = document.querySelector("sl-radio-group[size-product]");
listColors.forEach(function (color) {
  color.addEventListener("click", function () {
    // showLoader();
    var colorId = color.getAttribute("color-id");

    if (colorId) {
      axios.put("".concat(location.href, "/getSize"), {
        color: colorId
      }).then(function (res) {
        // if (res.status == 200) {
        //   console.log("ok");
        // }
        if (res.status == 200 && res.data.listSizes && res.data.listSizes.length > 0) {
          var sizeP = document.querySelector("sl-radio-group[size-product]");

          if (!res.data.listSizes.find(function (size) {
            return size == sizeP.value;
          })) {
            sizeP.value = "";
          }

          var listSizeBtn = sizeP.querySelectorAll("sl-radio-button");
          listSizeBtn.forEach(function (btn) {
            if (!res.data.listSizes.find(function (size) {
              return size == btn.value;
            })) {
              btn.disabled = true;
            } else {
              btn.disabled = false;

              if (btn.checked == true) {
                btn.click();
              } else {
                btn.checked = false;
              }
            }
          });
        }
      });
    }
  });
});
var sizeParent = document.querySelector("[size-product]");
var listSize = sizeParent.querySelectorAll("sl-radio-button");
listSize.forEach(function (size) {
  size.addEventListener("click", function () {
    var colorChecked = document.querySelector("[color-product] input:checked");

    if (colorChecked) {
      var colorId = colorChecked.getAttribute("color-id");
      axios.post("".concat(location.href, "/getItem"), {
        color: colorId,
        size: size.value
      }).then(function (res) {
        var item = res.data.productItem;

        if (item) {
          var _priceNew = document.querySelector("[price-new]");

          var _price = document.querySelector("[product-price]");

          var _discount = document.querySelector("[discount-product]");

          _priceNew.classList.remove("hidden");

          _priceNew.value = item.priceNew;

          if (item.discount == 0) {
            _price.classList.add("hidden");

            _discount.classList.add("hidden");
          } else {
            _price.value = item.price;
            _discount.innerHTML = "-".concat(item.discount, "%");

            _price.classList.remove("hidden");

            _discount.classList.remove("hidden");
          }

          var btnCart = document.querySelector("[add-cart]");

          if (item.quantity == 0) {
            btnCart.innerHTML = "HẾT HÀNG";
            btnCart.setAttribute("disabled", "");
          } else {
            btnCart.innerHTML = "Thêm vào giỏ hàng";
            btnCart.removeAttribute("disabled");
          }
        }
      });
    }
  });
});
var priceNew = document.querySelector("sl-format-number[price-new]");
var price = document.querySelector("[product-price]");
var discount = document.querySelector("[discount-product]");

if (priceNew && !priceNew.value) {
  priceNew.classList.add("hidden");
  price.classList.add("hidden");
  discount.classList.add("hidden");
}

{
  var carousel = document.querySelector(".carousel-thumbnails");
  var scroller = document.querySelector(".thumbnails__scroller");
  var thumbnails = document.querySelectorAll(".thumbnails__image");

  if (scroller) {
    scroller.addEventListener("click", function (e) {
      var target = e.target;

      if (target.matches(".thumbnails__image")) {
        var index = _toConsumableArray(thumbnails).indexOf(target);

        carousel.goToSlide(index);
      }
    });
  }

  if (carousel) {
    carousel.addEventListener("sl-slide-change", function (e) {
      var slideIndex = e.detail.index;

      _toConsumableArray(thumbnails).forEach(function (thumb, i) {
        thumb.classList.toggle("active", i === slideIndex);

        if (i === slideIndex) {
          thumb.scrollIntoView({
            block: "nearest"
          });
        }
      });
    });
  }
}

var comment = function comment() {
  var btnComment = document.querySelector("[btn-comment]");
  if (!btnComment) return;
  btnComment.addEventListener("click", function () {
    var link = btnComment.getAttribute("btn-comment");
    if (!link) return;
    var rating = document.querySelector("sl-rating");
    var comment = document.querySelector("sl-textarea");
    axios.post(link, {
      rating: parseInt(rating.value),
      content: comment.value
    }).then(function (res) {
      if (res.status == 200) {
        localStorage.setItem("alert-success", JSON.stringify({
          title: "Đánh giá sản phẩm thành công!",
          icon: "success"
        }));
        rating.value = 0;
        comment.value = "";
        showAlertSuccess();
      }
    })["catch"](function (error) {
      localStorage.setItem("alert-error", JSON.stringify({
        title: error.response.data.message,
        icon: "warning"
      }));
      showAlertError();
    });
  });
};

comment();

var addCart = function addCart() {
  var btnAdd = document.querySelector("[add-cart]");
  if (!btnAdd) return;
  btnAdd.addEventListener("click", function () {
    var link = btnAdd.getAttribute("add-cart");
    if (!link) return;
    var colorElement = document.querySelector("[color-product] input:checked");

    if (!colorElement) {
      localStorage.setItem("alert-error", JSON.stringify({
        title: "Vui lòng chọn màu sắc",
        icon: "warning"
      }));
      showAlertError();
      return;
    }

    var colorId = colorElement.getAttribute("color-id");
    var sizeId = document.querySelector("[size-product]").value;

    if (!sizeId) {
      localStorage.setItem("alert-error", JSON.stringify({
        title: "Vui lòng chọn kích thước",
        icon: "warning"
      }));
      showAlertError();
      return;
    }

    var quantity = document.querySelector("[quantity-product]");

    if (!quantity.innerHTML || quantity.innerHTML < 1) {
      localStorage.setItem("alert-error", JSON.stringify({
        title: "Số lượng không hợp lệ!",
        icon: "warning"
      }));
      showAlertError();
    }

    showLoader();
    axios.post(link, {
      colorId: colorId,
      sizeId: sizeId,
      quantity: parseInt(quantity.innerHTML)
    }).then(function (res) {
      if (res.status == 200) {
        localStorage.setItem("alert-success", JSON.stringify({
          title: "Thêm vào giỏ hàng thành công!",
          icon: "success"
        }));
        closeLoader();
        showAlertSuccess(); // const redirect = btnAdd.getAttribute("redirect");
        // location.href = redirect;

        reloadCart();
        var drawer = document.querySelector('sl-drawer');
        drawer.show();
      }
    })["catch"](function (error) {
      closeLoader();
      localStorage.setItem("alert-error", JSON.stringify({
        title: error.response.data.message,
        icon: "warning"
      }));
      showAlertError();
    });
  });
};

addCart();

var CongTruSoLuong = function CongTruSoLuong() {
  var cong = document.querySelector('[btn-cong]');
  var tru = document.querySelector('[btn-tru]');
  var quantityProduct = document.querySelector('[quantity-product]');
  if (!cong || !tru || !quantityProduct) return;
  cong.addEventListener('click', function () {
    return quantityProduct.innerHTML = parseInt(quantityProduct.innerHTML) + 1;
  });
  tru.addEventListener('click', function () {
    if (parseInt(quantityProduct.innerHTML) > 1) quantityProduct.innerHTML = parseInt(quantityProduct.innerHTML) - 1;
  });
};

CongTruSoLuong();

var viewImage = function viewImage() {
  document.addEventListener("DOMContentLoaded", function () {
    var carouselImageProduct = document.querySelector("[id = 'carousel-image-product']"); // new Viewer(carouselImageProduct)

    if (!carouselImageProduct) return;
    lightGallery(carouselImageProduct, {
      selector: 'img',
      thumbnail: true,
      plugins: [lgThumbnail, lgZoom],
      download: true,
      controls: true,
      thumbWidth: 100,
      counter: true
    });
  });
}; // viewImage()


lightGallery(document.getElementById('lightgallery')); // lightGallery(document.getElementById('aniimated-thumbnials'), {
//   // selector: 'img',
//   thumbnail: true,
//   plugins: [lgThumbnail, lgZoom],
//   download: true,
//   controls: true,
//   thumbWidth: 100,
//   counter: true
// });