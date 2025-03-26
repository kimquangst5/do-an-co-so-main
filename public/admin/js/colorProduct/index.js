const main = () => {
  const btnCreateColorProduct = document.querySelector(
    "[btn-create-color-product]"
  );
  if (!btnCreateColorProduct) return;
  const parentItem = document.querySelector("[parent]");
  btnCreateColorProduct.addEventListener("click", () => {
    const div = document.createElement("div");
    div.setAttribute("items-color-product", "");
    div.innerHTML = `<div class="flex w-full justify-between items-center"><sl-switch checked="" size="medium" form="" data-optional="" data-valid="">Trạng thái</sl-switch><sl-input label="Tên màu" size="small" name="name" type="text" form="" data-optional="" data-valid=""></sl-input><div class="flex gap-x-[20px] items-center"> <sl-input label="Mã màu" size="small" disabled="" type="text" form="" data-optional="" data-valid=""></sl-input><sl-color-picker format="hex" size="small" label="Mã màu" name="code" form="" data-optional="" data-valid=""></sl-color-picker></div><sl-input label="Đường dẫn" size="small" name="slug" type="text" form="" data-optional="" data-valid=""></sl-input><sl-icon class="text-[red] cursor-pointer" name="trash" aria-hidden="true" library="default"></sl-icon></div>`;
    const icon = div.querySelector("sl-icon");
    icon.addEventListener("click", () => {
      parentItem.removeChild(div);
    });
    parentItem.appendChild(div);
  });
  const listItem = document.querySelectorAll("[items-color-product]");
  if (listItem.length > 0) {
    listItem.forEach((it) => {
      const trash = it.querySelector("sl-icon");
      trash.addEventListener("click", () => {
        questionYesNo(
          'warning', 'Xóa màu sắc', 'Bạn có chắc muốn xóa màu sắc này?', 'Xóa', '#4BC18F', 'Hủy', '#FFA09B',
          () => {
            parentItem.removeChild(it);

          })
      });
    });
  }

  const btnUpdateColorProduct = document.querySelector(
    "[btn-update-color-product]"
  );
  if (!btnUpdateColorProduct) return;
  const link = btnUpdateColorProduct.getAttribute("btn-update-color-product");

  btnUpdateColorProduct.addEventListener("click", () => {
    questionYesNo(
      'warning', 'Cập nhật màu sắc', 'Bạn có chắc muốn cập nhật màu sắc này?', 'Cập nhật', '#4BC18F', 'Hủy', '#FFA09B',
      () => {
        const listItem = document.querySelectorAll("[items-color-product]");
        const listData = [];
        listItem.forEach((it) => {
          const id = it.getAttribute("items-color-product");
          const status = it.querySelector("sl-switch").checked;
          const name = it.querySelector("sl-input[name='name']");
          const code = it.querySelector("sl-color-picker[name='code']");
          const slug = it.querySelector("sl-input[name='slug']");
          const data = {
            id,
            status: status == true ? "active" : "inactive",
            name: name.value,
            code: code.value,
          };
          if (slug && slug.value) {
            data.slug = slug.value;
          }
          if (name && name.value && code && code.value) listData.push(data);
        });
        showLoader()
        axios.patch(link, listData).then((res) => {
          if (res.status == 200) {
            localStorage.setItem(
              "alert-success",
              JSON.stringify({
                title: 'Cập nhật thành công!',
                icon: "success",
              })
            );
            location.reload();
          }
        });
      })

  });
};
main();