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
