let orderNumberChangerEnabled = undefined;
let orderNumberChangerActivate = document.getElementById("orderNumberChangerActivate")
let orderNumberChangerDeactivate = document.getElementById("orderNumberChangerDeactivate")

function hideMessage(el){
    el.textContent = "";
    el.style.display = "none";    
}

function sendMessage(el, content, level = "info"){
    el.style.display = "block";
    el.textContent = content;
    setMessageColor(el, level);
}

function setMessageColor(el, level = "info"){
    switch(level){
        case "warning":
            el.style.color = "red";
            break;
        case "success":
            el.style.color = "green";
            break;
        default:
            el.style.color = "black";
    }
}

function updateNumberOrderChanger(enabled){
    switch(enabled){
        case true:
            orderNumberChangerActivate.style.backgroundColor = "green"
            orderNumberChangerActivate.textContent = "Wlaczone"
            orderNumberChangerDeactivate.style.backgroundColor = ""
            orderNumberChangerDeactivate.textContent = "Wylacz"
            break;
        case false:
            orderNumberChangerActivate.style.backgroundColor = ""
            orderNumberChangerActivate.textContent = "Wlacz"
            orderNumberChangerDeactivate.style.backgroundColor = "red"
            orderNumberChangerDeactivate.textContent = "Wylaczony"
            break;
        default:
            orderNumberChangerActivate.style.backgroundColor = ""
            orderNumberChangerActivate.textContent = "Wlacz"
            orderNumberChangerDeactivate.style.backgroundColor = ""
            orderNumberChangerDeactivate.textContent = "Wylacz"
    }
}

orderNumberChangerActivate.addEventListener("click", function(){
    chrome.storage.sync.set(
        {orderNumberChangerEnabled: true},
        updateNumberOrderChanger(true)
    );
});

orderNumberChangerDeactivate.addEventListener("click", function(){
    chrome.storage.sync.set(
        {orderNumberChangerEnabled: false},
        updateNumberOrderChanger(false)
    );
});

window.onload = function(){
    // Read status of orderNumberChanger and update button status
    chrome.storage.sync.get(
        ["orderNumberChangerEnabled"],
        function(results){
            orderNumberChangerEnabled = results.orderNumberChangerEnabled;
            updateNumberOrderChanger(orderNumberChangerEnabled);
            orderNumberChangerActivate.disabled = false;
            orderNumberChangerDeactivate.disabled = false;
        }
    );    
}