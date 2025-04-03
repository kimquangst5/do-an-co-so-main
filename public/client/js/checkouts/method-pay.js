const openQrCode = () => {
     const method = document.querySelector('sl-radio-group')
     if (!method) return;
     const dialog = document.querySelector('sl-dialog[dialog-bank]')
     if (!dialog) return;
     method.addEventListener('sl-change', () => {
          if (method.value == 'bank') {
               dialog.show()

          }

     })
}

openQrCode()


const checkPaid = async () => {

     try {
          const res = await axios.get('https://script.google.com/macros/s/AKfycbwLNuiueXvrp6LLYgBcwdKEnPv-gQtaPJn3XpzEz4RqBhY3JHaSJ6OVnxPyIDofEm4rvw/exec')
          const data = res.data.data[0]
          const priceCustomer = data['Giá trị']
          const contentCustomer = data['Mô tả']
          const orderId = document.querySelector('[order-id]')
          const id = orderId.getAttribute("order-id")
          const price = orderId.getAttribute("order-id")
          closeLoader()
          if (parseInt(priceCustomer) >= parseInt(price) && contentCustomer.includes(id)) {
               const btn = document.querySelector('[check-status-pay]')
               const link = btn.getAttribute('check-status-pay')
               console.log(link);

               axios.patch(link, {
                    time: data['Ngày diễn ra'],
                    price: data['Giá trị'],
                    transactionCode: data['Mã GD'],
                    receive: data['Số tài khoản']
               }).then(res => {
                    if (res.status == 200) {

                         Swal.fire({
                              title: "Thanh toán thành công!",
                              html: `Chúc mừng bạn đã thanh toán thành công!<br>Mã giao dịch của bạn là: <b class='text-[red]'>${data['Mã GD']}</b><br>Số tiền đã chuyển: <sl-format-number class="text-lg font-bold text-[red]" type="currency" currency="VND" value=${data['Giá trị']} lang="vi"></sl-format-number>`,
                              icon: "success"
                         });
                         setTimeout(() => {
                              console.log(btn.getAttribute('redirect'));
                              location.href = btn.getAttribute('redirect')
                         }, 2000);
                    }
               })

          } else {
               Swal.fire({
                    title: "Chưa nhận được!",
                    html: "Hiện tại chúng tôi chưa nhận được tiền!<br>Vui lòng chờ trong giây lát!<br>Sau đó load lại trang và kiểm tra lại nhé!<br>Xin cảm ơn bạn",
                    icon: "info"
               });
          }
     } catch (error) {
          console.log('Lỗi');
     }
}

const btnCheckPaid = () => {
     const btn = document.querySelector('[check-status-pay]')
     if (!btn) return
     btn.addEventListener('click', () => {
          showLoader()
          checkPaid()
     })
}
btnCheckPaid()

const payPolime = () => {
     const btn = document.querySelector('[order-id]')
     if (!btn) return
     btn.addEventListener('click', () => {

          const radioGroup = document.querySelector('[method-pay]')
          if (!radioGroup) return
          const value = radioGroup.value;
          const link = btn.getAttribute('link')
          if (value == 'polime') {
               showLoader()
               axios.patch(link, {

               })
                    .then(res => {
                         if (res.status == 200) {
                              location.href = btn.getAttribute('redirect')

                         }
                    })
                    .catch(e => {
                         closeLoader()
                    })
          }


     })
}

payPolime()