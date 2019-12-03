let saveSalt = document.getElementById("saveSalt");
let saltInput = document.getElementById("salt");
let messagesDiv = document.getElementById("messagesDiv");
let messages = document.getElementById("messages")

function hideMessage(){
    messages.textContent = "";
    messagesDiv.style.display = "none";
    messages.style.display = "none";
}

function sendMessage(content, level = "info"){
    messagesDiv.style.display = "block";
    messages.style.display = "block";
    messages.textContent = content;
    setMessageColor(level);
}

function setMessageColor(level = "info"){
    switch(level){
        case "warning":
            messages.style.color = "red";
            break;
        case "success":
            messages.style.color = "green";
            break;
        default:
            messages.style.color = "black";
    }
}

saveSalt.addEventListener("click", function(){
    let salt = saltInput.value;
    if (salt == ""){
        sendMessage("Wartosc nie moze byc pusta.", "warning");
        return
    }
    chrome.storage.sync.set(
        {salt: salt},
        sendMessage("Zapisane", "success")
    );
});