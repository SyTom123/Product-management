// Chức năng gửi yêu cầu
const buttonAddFriends = document.querySelectorAll("[btn-add-friend]");
if (buttonAddFriends.length > 0) {
    buttonAddFriends.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("add");
            const userId = button.getAttribute("btn-add-friend");
            
            socket.emit("CLIENT_ADD_FRIEND", userId);

        });
    });
}
// Hết Chức năng gửi yêu cầu

// Chức năng hủy gửi yêu cầu
const buttonCancelFriends = document.querySelectorAll("[btn-cancel-friend]");

if (buttonCancelFriends.length > 0) {
    buttonCancelFriends.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.remove("add");
            const userId = button.getAttribute("btn-cancel-friend");
            
            socket.emit("CLIENT_CANCEL_FRIEND", userId);

        });
    });
}
// Chức năng hủy gửi yêu cầu
