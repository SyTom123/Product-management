// button status
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button =>{
        button.addEventListener('click', ()=> {
            const status = button.getAttribute("button-status");
            if(status != "") {
                url.searchParams.set("status",status);
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        })
    })
}
// end button status

// Form search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener('submit', (e)=> {
        e.preventDefault();
        
        const value = e.target.elements.keyword.value;
        if(value != "") {
            url.searchParams.set("keyword",value);
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    })
}
// End Form search

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