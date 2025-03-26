const main = () => {
     const btnUpdate = document.querySelector("[btn-update]")
     const nameWeb = document.querySelector("[name='name-website']")
     const nameCompany = document.querySelector("[name='name-company']")
     const hotline = document.querySelector("[name='hotline']")
     const phone = document.querySelector("[name='phone']")
     const email = document.querySelector("[name='email']")
     const address = document.querySelector("[name='address']")
     const map = document.querySelector("[name='map']")
     const copyright = document.querySelector("[name='copyright']")
     const link = btnUpdate.getAttribute('btn-update')
     if (!btnUpdate || !link || !nameWeb || !nameCompany || !hotline || !phone || !email || !address || !map || !copyright) return
     btnUpdate.addEventListener('click', () => {
          axios.patch(link, {
                    nameWeb: nameWeb.value,
                    nameCompany: nameCompany.value,
                    hotline: hotline.value,
                    phone: phone.value,
                    email: email.value,
                    address: address.value,
                    map: map.value,
                    copyright: copyright.value,
               })
               .then(res => {
                    localStorage.setItem(
                         "alert-success",
                         JSON.stringify({
                              title: 'Cập nhật thành công!',
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


main()