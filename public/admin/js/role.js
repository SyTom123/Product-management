// Permissions
const tablePermissions = document.querySelector("[table-permissions]");

if(tablePermissions){
    let result = [];

    const buttonSubmit = document.querySelector("[button-submit]");

    buttonSubmit.addEventListener("click", () => {
        const rows = tablePermissions.querySelectorAll("[data-name]");
        
        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");

            if(name == "id") {
                inputs.forEach(input => {
                    const value = input.value;
                    result.push({
                        id: value,
                        permissions: []
                    })
                })
            }
            else {
                inputs.forEach((input, index)=> {
                    const checked = input.checked;
                    if(checked) {
                        result[index].permissions.push(name);
                    }
                })
            }
        })
 
        const formChangePermissions = document.querySelector("#form-change-permissions");
        const inputPermissions = formChangePermissions.querySelector("input");
        inputPermissions.value = JSON.stringify(result);
        formChangePermissions.submit();
    })
}
// End Permissions
// Permission data default
const dataRecords = document.querySelector("[data-records]");
if(dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records"));

    records.forEach((record, index) => {

        const permissions = record.permissions;

        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`tr[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];
           
            input.checked= true;
        })
    }) 
}

// End Permission data default