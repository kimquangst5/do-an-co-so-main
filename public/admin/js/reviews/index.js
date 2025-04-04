const changeStatus = () => {
    const list = document.querySelectorAll("[change-status]");
    if (list.length == 0) return;
    list.forEach((btn) => {
        btn.addEventListener("click", () => {
            showLoader();
            const status = btn.getAttribute("variant");
            const data = {};
            if (status == "success") {
                data.status = "inactive";
            } else {
                data.status = "active";
            }
            const link = btn.getAttribute("change-status");
            if (data.status && link) {
                axios.patch(link, data).then((res) => {
                    if (res.status == 200) {
                        localStorage.setItem(
                            "alert-success",
                            JSON.stringify({
                                title: "Cập nhật trạng thái thành công!",
                                icon: "success",
                            })
                        );
                        location.reload();
                    }
                });
            }
        });
    });
};
changeStatus();