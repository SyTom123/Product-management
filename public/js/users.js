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
// Hết Chức năng hủy gửi yêu cầu
// Chức năng từ chối kết bạn
const buttonRefuseFriends = document.querySelectorAll("[btn-refuse-friend]");
if (buttonRefuseFriends.length > 0) {
    buttonRefuseFriends.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("refuse");
            const userId = button.getAttribute("btn-refuse-friend");
            
            socket.emit("CLIENT_REFUSE_FRIEND", userId);

        });
    });
}
// Hết Chức năng từ chối kết bạn
// Chức năng chấp nhận kết bạn
const buttonAcceptFriends = document.querySelectorAll("[btn-accept-friend]");
if (buttonAcceptFriends.length > 0) {
    buttonAcceptFriends.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.remove("add");
            button.closest(".box-user").classList.add("accepted");
            const userId = button.getAttribute("btn-accept-friend");
            
            socket.emit("CLIENT_ACCEPT_FRIEND", userId);

        });
    });
}
// Hết Chức năng chấp nhận kết bạn
// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data)=> {

    const bagdeUsersAccept = document.querySelector("[bagde-users-accept]");
    const userId = bagdeUsersAccept.getAttribute("bagde-users-accept");

    if(userId == data.userId) {
        bagdeUsersAccept.innerHTML = data.lengthAcceptFriends
    }

})
// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
