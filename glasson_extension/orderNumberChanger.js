// This script will only run once at page load
let running = false;
let previousPage = document.location.pathname;

const encryptNumber = function(){
    let d = new Date()
    let time = ("0" + d.getHours().toString()).slice(-2) +
        ("0" + d.getMinutes().toString()).slice(-2) +
        ("0" + d.getSeconds().toString()).slice(-2);
    time = parseInt(time);
    // Radix = 35 to minimize as much as possible the size of the string and to reserve the use of the letter "Z"
    return time.toString(35).toUpperCase();
}

const orderNumberIsOk = function(orderNumber){
    let currentFullOrderNumber = orderNumber.value;
    let currentNumber = currentFullOrderNumber.split("/")[3];
    if (currentNumber[0] == "Z"){
        return true
    }
    return false
}

const orderNumberChanger = function(enabled, orderNumber){
    if (enabled){
        let currentFullOrderNumber = orderNumber.value;
        let newNumber = "Z" + encryptNumber();
        orderNumber.value = currentFullOrderNumber.split("/").slice(0,3).join("/") + "/" + newNumber;
    }
}

let enteredDesiredPage = function(page){
    let entered = false;
    currentPage = document.location.pathname;
    if (currentPage.startsWith(page) && currentPage != previousPage){
        entered = true
    }
    previousPage = currentPage;
    return entered
}

const main = function(){
    let path = document.location.pathname
    let orderNumber = document.getElementById("sale_order_number");
    if (running || !orderNumber || !enteredDesiredPage("/orders/new")){
        return
    }
    running = true;
    chrome.storage.sync.get(["orderNumberChangerEnabled"], function(results){
        let enabled = results.orderNumberChangerEnabled;
        orderNumberChanger(enabled, orderNumber)
        running = false;
    });
}

// Tired of trying. Going for the ugliest implementation
window.setInterval(main, 200);

// setInterval won't catch the case where we load the new order page the first time
window.addEventListener("load", function(){
    previousPage = "";
});