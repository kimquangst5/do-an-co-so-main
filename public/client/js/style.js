const showAlertSuccess = () => {
  const data = JSON.parse(localStorage.getItem("alert-success"));

  if (data && data != 'xoa-cookie') {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: data.icon,
      title: data.title,
    });
    localStorage.removeItem("alert-success");
  }
};
const setCookie = (name, value, days) => {
  const expires = days ?
    `expires=${new Date(
        Date.now() + days * 24 * 60 * 60 * 1000
      ).toUTCString()};` :
    "";
  document.cookie = `${name}=${value}; ${expires}`;
};
const getCookie = (cookieName) => {
  // Tách chuỗi thành một mảng các cặp name/value
  let cookieArray = document.cookie.split("; ");
  // Chuyển name/value từ dạng string thành object
  cookieArray = cookieArray.map((item) => {
    item = item.split("=");
    return {
      name: item[0],
      value: item[1],
    };
  });
  // Lấy ra cookie đang cần tìm
  const cookie = cookieArray.find((item) => {
    return item.name === cookieName;
  });

  return cookie ? decodeURIComponent(cookie.value) : null;
};
const deleteCookie = (cookieName) => {
  document.cookie = `cookieName=; expires=Thu, 08 Aug 2005 00:00:00 UTC`;
};
const showAlertSuccessCookie = () => {
  const data = getCookie("alert-success");
  if (data && data != 'xoa-cookie') {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: "success",
      title: decodeURIComponent(data),
    });
    setCookie("alert-success", "xoa-cookie");
  }
};

const showAlertError = () => {
  const error = JSON.parse(localStorage.getItem("alert-error"));
  if (error) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: error.icon,
      title: error.title,
    });
    localStorage.removeItem("alert-error");
  }
};

window.addEventListener("load", (event) => {
  showAlertSuccess();
  showAlertError();
  showAlertSuccessCookie();
});

const showLoader = () => {
  const loader = document.querySelector("[wait-load]");
  loader.classList.remove("hidden");
};

const showLoaderDrawer = () => {
  const loader = document.querySelector("[wait-load-drawer]");
  loader.classList.remove("hidden");
};

const closeLoader = () => {
  const loader = document.querySelector("[wait-load]");
  loader.classList.add("hidden");
};

const closeLoaderDrawer = () => {
  const loader = document.querySelector("[wait-load-drawer]");
  loader.classList.add("hidden");
};

const showCartLength0 = () => {
  const element = document.querySelector("[cart-0]");
  element.classList.remove("hidden");
};

const closeCartLength0 = () => {
  const element = document.querySelector("[cart-0]");
  element.classList.add("hidden");
};

// Get the button
const mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button

const scrollFunction = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.classList.remove("hidden");
  } else {
    mybutton.classList.add("hidden");
  }
};
const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

window.addEventListener("scroll", scrollFunction);

const formSearch = () => {
  const form = document.querySelector("[form-search]");
  if (!form) return;
  const link = form.getAttribute("form-search");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    showLoader();
    location.href = `${link}/trang?tu-khoa=${event.target.name.value}`;
  });

  function resetForm() {
    while (form.children.length > 2) {
      form.removeChild(form.lastChild);
    }
  }

  function clearSuggestions() {
    const suggestions = form.querySelector(".suggestions");
    if (suggestions) {
      suggestions.remove();
    }
  }

  const input = form.querySelector("input");
  let timeout;
  // input.addEventListener("blur", () => {
  //   resetForm();
  // });
  input.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // Nếu có giá trị tìm kiếm (sau khi loại bỏ khoảng trắng thừa)
      if (input.value.trim().length > 0) {
        axios
          .get(`${link}/goi-y?tu-khoa=${input.value.trim()}`)
          .then((res) => {
            clearSuggestions(); // Xóa kết quả cũ nếu có
            if (
              res.status === 200 &&
              res.data.products &&
              res.data.products.length > 0
            ) {
              // Tạo container cho gợi ý tìm kiếm
              const suggestions = document.createElement("div");
              suggestions.classList.add(
                "suggestions",
                ...`absolute top-[60px] left-[30px] bg-[white] rounded-[20px] w-full flex flex-col -gap-y-[10px] z-[99]`.split(
                  " "
                )
              );
              let htmlDiv = `
                <div class="font-bold text-[20px] py-[10px]">Kết quả tìm kiếm</div>
                <div class="flex flex-col gap-y-[15px] p-[10px] h-[70vh] overflow-y-auto">`;
              res.data.products.forEach((sp) => {
                htmlDiv += `
                  <div class="grid grid-cols-12 gap-x-[15px]">
                    <a href=${sp.link} class="col-span-2 h-auto">
                      <img class="w-full h-auto rounded-[10px]" src="${sp.img_main[0]}" alt="" />
                    </a>
                    <div class="col-span-10 grid grid-rows-3">
                      <sl-tooltip class="flex items-center" content="${sp.name}">
                        <a href=${sp.link} class="font-bold line-clamp-1">${sp.name}</a>
                      </sl-tooltip>
                      <div class="flex items-center gap-x-[15px]">
                        <sl-rating precision="0.5" value="4.5" readonly="readonly"></sl-rating>
                        <div class="text-[12px] sm:text-[10px] text-gray-500">4.5/5</div>
                      </div>
                      <div class="flex items-center gap-x-[20px]">
                        <sl-format-number class="text-[20px] sm:text-[18px] font-[500] text-[#000000]" value="${sp.priceNew}" type="currency" currency="VND" lang="vi-VI"></sl-format-number>`;
                if (sp.discount !== 0) {
                  htmlDiv += `
                        <sl-format-number class="text-[14px] sm:text-[18px] font-[500] text-[#00000066] line-through flex items-center" value="${sp.price}" type="currency" currency="VND" lang="vi-VI"></sl-format-number>
                        <div class="w-[50px] h-[24px] text-[#FF3333] text-[10px] font-[500] bg-[#FF33331A] rounded-[50px] flex items-center justify-center">-${sp.discount}%</div>`;
                }
                htmlDiv += `
                      </div>
                    </div>
                  </div>`;
              });
              htmlDiv += `</div>`;
              suggestions.innerHTML = htmlDiv;
              form.appendChild(suggestions);
            } else {
              clearSuggestions();
            }
          })
          .catch((error) => {
            clearSuggestions();
          });
      } else {
        clearSuggestions();
      }
    }, 500);
  });
  // input.addEventListener("blur", () => {
  //   clearSuggestions();
  // });
};
formSearch();

const blockDevTool = () => {
  document.onkeydown = function (e) {
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey &&
        e.shiftKey && ["I", "J", "C", "E"].includes(String.fromCharCode(e.keyCode))) ||
      (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) || // Ctrl+U
      (e.ctrlKey && e.keyCode === "S".charCodeAt(0)) // Ctrl+S
    ) {
      e.preventDefault();
      return false;
    }
  };

  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
};
// blockDevTool();
window.addEventListener('pageshow', function (event) {
  if (event.persisted) {
    closeLoader();
  }
});

const animation = () => {
  // const container = document.querySelector('.animation-scroll');
  const animation = document.querySelectorAll('sl-animation');
  if (!animation || animation.length == 0) return
  animation.forEach(it => {
    const box = it.querySelector('.box');

    // Watch for the box to enter and exit the viewport. Note that we're observing the box, not the animation element!
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // Start the animation when the box enters the viewport
        it.play = true;
      } else {
        it.play = false;
        it.currentTime = 0;
      }
    });
    if (box)
      observer.observe(it.children[0]);
  })


}

// animation()

const btnContact = () => {
  const btn = document.querySelector('[btn-contact]')
  btn.addEventListener('click', () => {
    const conFixBtn = document.querySelector('[contact-fixed__button]')
    const list = document.querySelector('.contact-fixed__list')
    const iconClose = document.querySelector('[contact-fixed__close]')

    conFixBtn.classList.toggle('show')
    list.classList.toggle('show')
    iconClose.classList.toggle('show')
  })
}
btnContact()

const reloadCart = () => {
  const getCart = document.querySelector('[get-cart]')
  if (!getCart) return
  const link = getCart.getAttribute('get-cart')
  if (!link) return
  showLoaderDrawer()
  axios.get(link)
    .then(res => {
      if (res.status == 200) {
        const drawer = document.querySelector('sl-drawer[drawer-cart]');
        const footer = drawer.querySelector("[slot='footer']")
        if (res.data.arrayCart && res.data.arrayCart.length > 0) {
          closeCartLength0()
          if (footer.className.includes('hidden')) {
            footer.classList.toggle('hidden')
          }
          let htmlDiv = ''
          let totalPrice = 0
          for (const it of res.data.arrayCart) {
            totalPrice += it.priceNew * it.quantity
            let div = document.createElement('div')
            div.classList.add('flex', 'items-center')
            div.classList.add('gap-x-[10px]')
            htmlDiv += `
              <div class="flex items-center gap-x-[10px] h-auto">
                  <a class="w-[20%]" href=${it.productSlug}><img class="rounded-[10px] w-full h-full aspect-square object-cover object-top" src=${it.image} alt="" /></a>
                  <div class="w-[70%] flex items-center flex-col gap-y-1">
                      <a class="font-bold line-clamp-1 text-left w-full" href=${it.productSlug}>${it.product}</a>
                      <div class="text-left w-full">Thuộc tính: (${it.color}, ${it.size})</div>
                      <div class="font-bold flex items-center gap-x-[10px] text-left w-full">
                          <div>${it.quantity}</div>
                          <div>x</div>
                          <sl-format-number class="text-[red]" type="currency" currency="VND" value=${it.priceNew} lang="vi"></sl-format-number>
                      </div>
                  </div>
                  <div btn-trash = ${it._id} link = ${it.linkTrash} class="rounded-full w-[10%] h-full aspect-square flex items-center justify-center text-[red] cursor-pointer" data-twe-ripple-init=""><sl-icon name="trash" aria-hidden="true" library="default"></sl-icon></div>
              </div>
            `
          }
          const parentCart = document.querySelector('[parent-cart-drawer]')
          const priceNewCartDrawer = document.querySelector('[price-new-cart-drawer]')
          if (!parentCart) return
          if (!priceNewCartDrawer) return
          parentCart.innerHTML = htmlDiv
          // priceNewCartDrawer.defaultValue = totalPrice
          console.log(res.data.arrayCart);

          priceNewCartDrawer.value = totalPrice
          // console.log(priceNewCartDrawer);
          btnDelete()

        } else if (res.data.arrayCart && res.data.arrayCart.length === 0) {
          showCartLength0()
          if (!footer.className.includes('hidden')) {
            footer.classList.toggle('hidden')
          }
        }
        closeLoaderDrawer()


      }
    })
}

const btnReloadCart = () => {
  const btnReload = document.querySelector('[btn-reload-cart]')
  if (!btnReload) return;
  btnReload.addEventListener('click', () => {
    reloadCart()
  })
}
reloadCart()
btnReloadCart()

const openDrawer = () => {
  const drawer = document.querySelector('sl-drawer[drawer-cart]');
  drawer.show()
}
const btnDelete = () => {
  const listBtnAdd = document.querySelectorAll('[btn-trash]')
  if (!listBtnAdd || listBtnAdd.length == 0) return
  listBtnAdd.forEach(btn => {
    btn.addEventListener('click', () => {
      Swal.fire({
        showCancelButton: true,
        title: `Xóa sản phẩm khỏi giỏ hàng?`,
        text: `Bạn chắc muốn xóa sản phẩm này khỏi giỏ hàng?\nHành động này không thể phục hồi!`,
        icon: "warning",
        confirmButtonText: "Xóa",
        confirmButtonColor: "#FFA09B",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          const link = btn.getAttribute('link')
          if (!link) return
          showLoader()
          const itemId = btn.getAttribute('btn-trash')
          if (!itemId) return;
          axios.delete(link)
            .then(res => {
              if (res.status == 200) {
                localStorage.setItem(
                  "alert-success",
                  JSON.stringify({
                    title: 'Cập nhật thành công!',
                    icon: "success",
                  })
                );
                location.reload()
              }
            })
        }
      })


    })
  })
}

btnDelete()

const Parameter = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
  method: "GET",
  responseType: "json",
};
const promise = axios(Parameter);
const addressComplete = async (address, city, district, ward) => {
  let addressNew;
  await promise.then(async (result) => {
    const array = result.data
    const cityIt = await array.find(c => parseInt(c.Id) === parseInt(city))
    const districtit = await cityIt.Districts.find(d => parseInt(d.Id) === parseInt(district))
    const wardIt = await districtit.Wards.find(w => parseInt(w.Id) === parseInt(ward))
    addressNew = `${address}, ${wardIt.Name}, ${districtit.Name}, ${cityIt.Name}`
  });
  return addressNew;
}

const addressFinish = async (address, city, district, ward) => {
  const result = await addressComplete(address, city, district, ward)
  return result;
}

const getAddress = async (address, city, district, ward) => {
  const result = await addressFinish(address, city, district, ward);
  console.log(result);
};