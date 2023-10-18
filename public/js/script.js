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