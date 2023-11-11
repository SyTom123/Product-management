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
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    const bagdeUsersAccept = document.querySelector("[bagde-users-accept]");
    const userId = bagdeUsersAccept.getAttribute("bagde-users-accept");

    bagdeUsersAccept.classList.add("active");

    if (userId == data.userId) {
        bagdeUsersAccept.innerHTML = data.lengthAcceptFriends;
    }
});
// END SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND

socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    // Trang lời mời kết bạn
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    if(dataUsersAccept) {
        const userId = dataUsersAccept.getAttribute("data-users-accept");

        if (userId == data.userId) {
            // Vẽ user ra giao diện
            const newBoxUser = document.createElement("div");
            newBoxUser.classList.add("col-4");
            newBoxUser.setAttribute("user-id", data.infoUserA._id);
    
            newBoxUser.innerHTML = `
            <div class="box-user">
              <div class="inner-avatar">
                <img src="${data.infoUserA.avatar ? data.infoUserA.avatar :"/images/avatar-none.jpg"}" alt="${data.infoUserA.fullName}">
              </div>
              <div class="inner-info">
                <div class="inner-name">
                    <a href="/users/${data.infoUserA._id}"> 
                        ${data.infoUserA.fullName}
                    </a>
                </div>
                <div class="inner-buttons">
                  <button
                    class="btn btn-sm btn-primary mr-1"
                    btn-accept-friend="${data.infoUserA._id}"
                  >
                    Chấp nhận
                  </button>
                  <button
                    class="btn btn-sm btn-danger mr-1"
                    btn-refuse-friend="${data.infoUserA._id}"
                  >
                    Xóa
                  </button>
                  <button
                    class="btn btn-sm btn-secondary mr-1"
                    btn-deleted-friend=""
                    disabled=""
                  >
                    Đã xóa
                  </button>
                  <button
                    class="btn btn-sm btn-primary mr-1"
                    btn-accepted-friend=""
                    disabled=""
                  >
                    Đã chấp nhận
                  </button>
                </div>
              </div>
            </div>
          `;
    
        dataUsersAccept.appendChild(newBoxUser);
        }
    // Trang lời mời kết bạn

    // Trang danh sách người dùng
        const dataUsersNotFriend = document.querySelector("[data-users-not-friend]");
        if(dataUsersNotFriend) {
            const userId = dataUsersNotFriend.getAttribute("data-users-not-friend");

            if(userId == data.userId) {
                // Xóa A khỏi danh sách của B
                const boxUserRemove = dataUsersNotFriend.querySelector(`[user-id = "${data.inforUserA._id}"]`);
                if(boxUserRemove) {
                    dataUsersNotFriend.removeChild(boxUserRemove);
                }
            }
        }

        // Hết Vẽ user ra giao diện

        // Xóa lời mời kết bạn
        const btnRefuseFriend = newBoxUser.querySelector("[btn-refuse-friend]");

        btnRefuseFriend.addEventListener("click", () => {
            btnRefuseFriend.closest(".box-user").classList.add("refuse");

            const userId = btnRefuseFriend.getAttribute("btn-refuse-friend");

            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        });
        // Hết Xóa lời mời kết bạn
    }
});
//   End SERVER_RETURN_INFO_ACCEPT_FRIEND

// SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data) => {
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    const userId = dataUsersAccept.getAttribute("data-users-accept");
    if (userId == data.userId) {
        // Xóa A của danh sách của B
        const boxUserRemove = dataUsersAccept.querySelector(`[user-id = "${data.userIdA}"]`);
        if(boxUserRemove) {
            dataUsersAccept.removeChild(boxUserRemove);
        }
    }
    console.log(data);
});

// END SERVER_RETURN_USER_ID_CANCEL_FRIEND
// SERVER_RETURN_USER_ONLINE
socket.on("SERVER_RETURN_USER_ONLINE", (userId)=> {
  const dataUsersFriend = document.querySelector("[data-users-friend]");
  if(dataUsersFriend) {
    const boxUser =  dataUsersFriend.querySelector(`[user-id ="${userId}"]`);
    if(boxUser) {
      boxUser.querySelector("[status]").setAttribute("status", "online");
    }
  }
})
// SERVER_RETURN_USER_ONLINE

// SERVER_RETURN_USER_OFFLINE
socket.on("SERVER_RETURN_USER_OFFLINE", (userId)=> {
  const dataUsersFriend = document.querySelector("[data-users-friend]");
  if(dataUsersFriend) {
    const boxUser =  dataUsersFriend.querySelector(`[user-id ="${userId}"]`);
    if(boxUser) {
      boxUser.querySelector("[status]").setAttribute("status", "offline");
    }
  }
})
// SERVER_RETURN_USER_OFFLINE

