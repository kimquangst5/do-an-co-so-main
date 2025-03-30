const addQuantity = () => {
     const listBtnAdd = document.querySelectorAll('[btn-add-quantity]')
     if (!listBtnAdd || listBtnAdd.length == 0) return
     listBtnAdd.forEach(btn => {
          btn.addEventListener('click', () => {
               showLoader()
               const link = btn.getAttribute('link')
               if (!link) return
               const itemId = btn.getAttribute('btn-add-quantity')
               if (!itemId) return;
               axios.patch(link, {
                         itemId: itemId
                    })
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

          })
     })
}

addQuantity()

const btnDecrease = () => {
     const listBtnAdd = document.querySelectorAll('[btn-decrease]')
     if (!listBtnAdd || listBtnAdd.length == 0) return
     listBtnAdd.forEach(btn => {
          btn.addEventListener('click', () => {
               showLoader()
               const link = btn.getAttribute('link')
               if (!link) return
               const itemId = btn.getAttribute('btn-decrease')
               if (!itemId) return;
               axios.patch(link, {
                         itemId: itemId
                    })
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

          })
     })
}

btnDecrease()