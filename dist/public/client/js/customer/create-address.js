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
    for (const x of data) {
        citis.options[citis.options.length] = new Option(x.Name, x.Id);
    }


    $(citis).selectpicker("refresh");
    citis.onchange = () => {
        districts.length = 1;
        wards.length = 1;
        if (this.value != "") {
            const result = data.filter((n) => n.Id === this.value);

            for (const k of result[0].Districts) {
                districts.options[districts.options.length] = new Option(k.Name, k.Id);
                $(districts).selectpicker("refresh");
            }
        }
    };
    districts.onchange = function () {
        wards.length = 1;
        const dataCity = data.filter((n) => n.Id === citis.value);
        if (this.value != "") {
            const dataWards = dataCity[0].Districts.filter(
                (n) => n.Id === this.value
            )[0].Wards;

            for (const w of dataWards) {
                wards.options[wards.options.length] = new Option(w.Name, w.Id);
                $(wards).selectpicker("refresh");
            }
        }
    };
}
promise.then((result) => {
    renderCity(result.data);
});

const main = () => {
    const btn = document.querySelector('[btn-create-address]')
    if (!btn) return
    btn.addEventListener('click', () => {

        const link = btn.getAttribute('btn-create-address')
        const fullname = document.querySelector("[name='fullname']")
        const city = document.querySelector("[id='city']")
        const district = document.querySelector("[id='district']")
        const ward = document.querySelector("[id='ward']")
        const address = document.querySelector("[name='address']")
        const phone = document.querySelector("[name='phone']")
        if (!link || !fullname || !city || !district || !ward || !address || !phone) return

        axios.post(link, {
            city: parseInt(city.value),
            district: parseInt(district.value),
            ward: parseInt(ward.value),
            address: address.value,
            fullname: fullname.value,
            phone: phone.value,
        })
            .then(res => {
                localStorage.setItem(
                    "alert-success",
                    JSON.stringify({
                        title: 'Thêm mới thành công!',
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