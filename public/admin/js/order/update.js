const citis = document.getElementById("city");
const districts = document.getElementById("district");
const wards = document.getElementById("ward");

const Parameter = {
    url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
    method: "GET",
    responseType: "json",
};
const promise = axios(Parameter);

const renderCity = (data) => {
    // Điền danh sách tỉnh/thành
    for (const x of data) {
        citis.options[citis.options.length] = new Option(x.Name, parseInt(x.Id));
    }
    $(citis).selectpicker("refresh");

    // Sự kiện thay đổi tỉnh/thành
    citis.onchange = function () {
        districts.length = 1;
        wards.length = 1;
        $(districts).selectpicker("refresh");
        $(wards).selectpicker("refresh");
        if (this.value != "") {
            const result = data.find((n) => n.Id === this.value);
            for (const k of result.Districts) {
                districts.options[districts.options.length] = new Option(k.Name, parseInt(k.Id));
            }
            $(districts).selectpicker("refresh");
        }
    };

    // Đặt giá trị mặc định cho city
    if (citis.getAttribute('value')) {
        citis.value = citis.getAttribute('value');
        $(citis).selectpicker("refresh");
        citis.onchange();
    }

    // Sự kiện thay đổi quận/huyện
    districts.onchange = function () {
        wards.length = 1;
        $(wards).selectpicker("refresh");
        const dataCity = data.find((n) => parseInt(n.Id) === parseInt(citis.value));
        if (this.value != "") {
            const dataDistrict = dataCity.Districts.find((n) => parseInt(n.Id) === parseInt(this.value));
            const dataWards = dataDistrict.Wards;

            // Điền danh sách xã/phường
            for (const w of dataWards) {
                wards.options[wards.options.length] = new Option(w.Name, parseInt(w.Id));
            }
            $(wards).selectpicker("refresh");

            // Đặt giá trị mặc định cho ward
            const wardValue = wards.getAttribute('value');
            if (wardValue) {
                $(wards).selectpicker("val", wardValue);
            }
        }
    };

    // Đặt giá trị mặc định cho district
    if (districts.getAttribute('value')) {
        districts.value = districts.getAttribute('value');
        $(districts).selectpicker("refresh");
        districts.onchange();
    }
};

// Gọi API và chạy hàm renderCity
promise.then((response) => renderCity(response.data));



const main = () => {
    const btn = document.querySelector('[btn-update-order]')
    if (!btn) return
    btn.addEventListener('click', () => {
        const status = document.querySelector("[name='status-order']")
        const statusPay = document.querySelector("[name='status-pay']")
        const method = document.querySelector("[name='method']")
        const fullname = document.querySelector("[name='fullname']")
        const email = document.querySelector("[name='email']")
        const phone = document.querySelector("[name='phone']")
        const address = document.querySelector("[name='address']")
        const ward = document.querySelector("[id='ward']")
        const district = document.querySelector("[id='district']")
        const city = document.querySelector("[id='city']")
        const note = document.querySelector("[id='note']")
        const data = {
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
                city: city.value,
            }
        }

    })
}

main()