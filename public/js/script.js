// Show Alert
const showAlert = document.querySelector("[show-alert]");

if(showAlert) {
    const time = +showAlert.getAttribute("data-time") || 3000;
    const closeAlert = showAlert.querySelector("[close-alert]");
    
    setTimeout(()=> {
        showAlert.classList.add("alert-hidden")
    }, time);

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add('alert-hidden');
    })
}

// End Show Alert
// Button go back
const buttonGoBack = document.querySelectorAll("[button-go-back]");
buttonGoBack.forEach(button => {
    button.addEventListener("click", ()=> {
       window.history.back();
    })
})
// End Button go back
// Cập nhật số lượng sản phẩm trong giỏ hàng
const tableCart = document.querySelector('[table-cart]');

if(tableCart) {
    const inputsQuantity = document.querySelectorAll("input[name='quantity']");
    if(inputsQuantity) {
        inputsQuantity.forEach(input => {

            input.addEventListener('change', ()=> {
                const productId = input.getAttribute('product-id');
                const quantity = input.value;

                if(quantity > 0) {
                    window.location.href =`cart/update/${productId}/${quantity}`
                }
            })
        })
    }
}

// Hết Cập nhật số lượng sản phẩm trong giỏ hàng
// Hiển thị mật khẩu
const formRegister = document.querySelector("[form-register]");

if(formRegister){
    const inputPasswords = formRegister.querySelectorAll("input[type='password']");
    const inputCheckbox = formRegister.querySelector("input[type='checkbox']");

    inputCheckbox.addEventListener("click", ()=> {
        if(inputCheckbox.checked){
            inputPasswords.forEach(input => {
                input.type = "text"
            })
        }
        else {
            inputPasswords.forEach(input => {
                input.type = "password"
            })
        }
    })
    inputPasswords.forEach(input => {
        input.addEventListener("copy", (e)=> {
            e.preventDefault();
        })
    })
}
// Hết Hiển thị mật khẩu

// Upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e)=> {
        if(e.target.files.length) {
            const image = URL.createObjectURL(e.target.files[0]);
            uploadImagePreview.src= image;
        }
    })
}
// End Upload imagess
// Delete item 
const buttonDelete = document.querySelectorAll("[button-delete]");

if(buttonDelete.length > 0) {

    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa hay không?")
            if(confirmDelete) {
                const id = button.getAttribute('data-id');

                const action = path + `/${id}?_method=DELETE`;

                formDeleteItem.action = action;

                formDeleteItem.submit();
            }
            
        })
    })
}
// End Delete Item
// slicker
$('.slider-one').slick({
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
});
$('.slider-two').slick({
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
});
// slicker

// Change quantity
const productDetail = document.querySelector("#product-detail");
if(productDetail) {
    const formDetail = document.querySelector("#product-detail [form-detail]");
    let quantity = 1;
    const buttonChangeUp = formDetail.querySelector("[button-change-qty-up]");
    const buttonChangeDown = formDetail.querySelector("[button-change-qty-down]");
    const inputQty = formDetail.querySelector("input[name='quantity']");

    const maxQty = productDetail.querySelector("[stock-qty]").getAttribute("stock-qty") || 0;

    buttonChangeUp.addEventListener("click", ()=> {
        if(quantity < maxQty) {
            quantity += 1;
            inputQty.value = quantity;
        }
    })
    
    buttonChangeDown.addEventListener("click", ()=> {
        if(quantity > 1) {
            quantity -= 1;
            inputQty.value = quantity;
        }
    })
}

// End Change quantity
// submit form checkout
formAddressCheckout = document.querySelector("[form-address-checkout]");
if(formAddressCheckout) {
    formAddressCheckout.addEventListener("submit",(e)=> {
        const city = formAddressCheckout.querySelector(`option[value="${e.target.city.value}"]`).innerText;
        const district = formAddressCheckout.querySelector(`option[value="${e.target.district.value}"]`).innerText;
        const ward = formAddressCheckout.querySelector(`option[value="${e.target.ward.value}"]`).innerText;
        const detailAddress = e.target.detailAddress.value;
    
        const address = formAddressCheckout.querySelector("#address");
        address.value = `${detailAddress}, ${ward}, ${district}, ${city}`;
    })
}

// submit form checkout
// Change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if(buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute('data-status');
            const id = button.getAttribute('data-id');
            const statusChange= statusCurrent == "active" ? "inactive" : "active";

            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            
            formChangeStatus.action = action;

            formChangeStatus.submit();
        })
    })
}
// End Change status
// pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination.length > 0) {
    let url = new URL(window.location.href);

    buttonPagination.forEach (button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    })
}
// End pagination
// sort product
const buttonSort = document.querySelectorAll("[button-sort]");
if(buttonSort) {
    let url = new URL(window.location.href);
    
    buttonSort.forEach(button => {
        button.addEventListener("click", ()=> {
            const value = button.getAttribute("data-sort");
            const [sortKey, sortValue] = value.split("-");
            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);

            window.location.href = url.href;
        })

    })
    // Hiển thị lựa chọn mặc định
   const sortKey = url.searchParams.get("sortKey");
   const sortValue = url.searchParams.get("sortValue");
   if(sortKey && sortValue) {
       const stringSort = `${sortKey}-${sortValue}`;
       const buttonActive = document.querySelector(`[data-sort=${stringSort}]`);
       console.log(stringSort);
       console.log(buttonActive);
       buttonActive.classList.add("active");
   }
   
}
   
// sort product