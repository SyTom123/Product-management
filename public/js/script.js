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
}
// Hết Hiển thị mật khẩu
