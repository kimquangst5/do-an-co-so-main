const updateDefault = () => {
     const btn = document.querySelector('[btn-update-default]')
     if (!btn) return
     const link = btn.getAttribute('btn-update-default')
     if (!link) return
     const address = document.querySelector('[address]')
     btn.addEventListener('click', () => {
          showLoader()
          axios.patch(link, {
                    address: address.value
               })
               .then(res => {
                    localStorage.setItem(
                         "alert-success",
                         JSON.stringify({
                              title: 'Cập nhật thành công địa chỉ mặc định!',
                              icon: "success",
                         })
                    );
                    location.reload()
               })
               .catch(error => {
                    localStorage.setItem(
                         "alert-error",
                         JSON.stringify({
                              title: error.response.data.message,
                              icon: "warning",
                         })
                    );
                    showAlertError()
               })
     })
}
updateDefault()