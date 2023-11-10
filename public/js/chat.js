import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

// FileUploadWithPreview
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-image', {
    multiple: true,
    maxFileCount: 6
});
// End FileUploadWithPreview
// CLIEND_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {

        e.preventDefault();
        const content = e.target.elements.content.value;
        const images = upload.cachedFileArray || [];
        if (content || images.length > 0) {
            socket.emit("CLIEND_SEND_MESSAGE",{
                content: content,
                images: images
            });
            e.target.elements.content.value = "";
            upload.resetPreviewPanel();
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }
    });

}
// END CLIEND_SEND_MESSAGE

//SERVER_RETURN_MESSAGE

socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const boxTyping = document.querySelector(".inner-list-typing");

    const div = document.createElement("div");

    let htmlFullName = "";
    let htmlContent = "";
    let htmlImages = "";

    if (myId == data.userId) {
        div.classList.add("inner-outgoing");
    } else {
        div.classList.add("inner-incoming");
        htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    }
    if(data.content) {
        htmlContent = `<div class="inner-content">${data.content}</div>`
    }
    if(data.images) {
        htmlImages += `<div class="inner-images">`
        for(const image of data.images) {
            htmlImages += ` 
                <img src ="${image}">
            `
        }
       
        htmlImages += `</div>`
    }
    div.innerHTML = `
      ${htmlFullName}
      ${htmlContent}
      ${htmlImages}
    `;

    body.insertBefore(div, boxTyping);
    // Preview image
    const boxImages = div.querySelector(".inner-images");
    if(boxImages) {
        const gallery = new Viewer(boxImages);
    }
    body.scrollTop = bodyChat.scrollHeight;
});
// End SERVER_RETURN_MESSAGE


// Scroll chat
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
// End Scroll chat

// emoji-picker
    // show popup
const buttonIcon = document.querySelector(".button-icon");
if(buttonIcon) {
    const tooltip = document.querySelector(".tooltip");
    Popper.createPopper(buttonIcon,tooltip);

    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
    }
}
// Show Typing
const showTyping = (e) => {
    if(e.key != "Enter") {
        socket.emit("CLIENT_SEND_TYPING", "show");
    }
    clearTimeout(timeOut);

    timeOut = setTimeout(()=> {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000);
}
// End Show Typing
    //insert icon
var timeOut ;
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");

    emojiPicker.addEventListener("emoji-click", (e) => {
        const icon = e.detail.unicode;
        inputChat.value = inputChat.value + icon;
        const end = inputChat.value.length;
        inputChat.setSelectionRange(end, end);
        inputChat.focus();
        showTyping(e);      
    });
    
    inputChat.addEventListener("keyup", (e)=> {
        showTyping(e);
    });
}
//End emoji-picker

//SERVER_RETURN_TYPING
const elementListType = document.querySelector(".chat .inner-list-typing");
if(elementListType) {
    
    socket.on("SERVER_RETURN_TYPING", (data)=> {
        if(data.type == "show") {
            const existTyping = elementListType.querySelector(`[user-id="${data.userId}"]`);
            if(!existTyping) {
                const boxTyping = document.createElement("div");
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("user-id", data.userId);
                
                boxTyping.innerHTML = `
                <div class="inner-name">${data.fullName}</div>
                <div class="inner-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                `;
                elementListType.appendChild(boxTyping);
                bodyChat.scrollTop = bodyChat.scrollHeight;
            }
        }
        else {
            const boxTypingRemove = elementListType.querySelector(`[user-id="${data.userId}"]`);
            if(boxTypingRemove) {
                elementListType.removeChild(boxTypingRemove);
            }
        }
    })
}   
//END SERVER_RETURN_TYPING
// Preview image
const chatBody = document.querySelector(".chat .inner-body");
if(chatBody) {
    const gallery = new Viewer(chatBody);

}
// End Preview image

// Chức năng xóa thành viên khỏi nhóm chat
const btnDeleteMemberOutGroup = document.querySelectorAll("[btn-delete-member-out-group]");
if(btnDeleteMemberOutGroup) {

    btnDeleteMemberOutGroup.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("deleted");

            const userIdB = button.getAttribute("btn-delete-member-out-group");
            const superAdminId = button.getAttribute("super-admin-id");
            const roomChatId = button.getAttribute("room-chat-id");
            socket.emit("ADMIN_DELETE_MEMBER_OUT_GROUP",{
                userIdB: userIdB,
                superAdminId: superAdminId,
                roomChatId: roomChatId
            } )
            
        })
    })
   
}
// End Chức năng xóa thành viên khỏi nhóm chat
