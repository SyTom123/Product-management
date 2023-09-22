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

// Checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", ()=> {
        if(inputCheckAll.checked){
            inputsId.forEach(input => {
                input.checked = true;
            })
        }
        else {
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    })


    inputsId.forEach(input => {
        input.addEventListener("click", ()=> {

            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

            if(countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            }
            else {
                inputCheckAll.checked = false;
            }
        })
    })
}
// End Checkbox-multi

// Form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
    formChangeMulti.addEventListener('submit', (e)=> {
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange= e.target.elements.type.value;
        if(typeChange == "delete-all") {
            const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa các sản phẩm này không?");
            if(!isConfirm) {
                return ;
            }
        }
        if(inputsChecked.length > 0 ){  
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach(input => {
                ids.push(input.value);
            })
            inputIds.value= ids.join(", ");
            formChangeMulti.submit();
        }
        else {
            alert("Vui lòng chọn ít nhất một bản ghi")
        }
    })
}
// End Form-change-multi

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
