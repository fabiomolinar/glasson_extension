// This script will only run once at page load
let defaultStepNumber = 10;
let running = false;
let orderNumber = document.getElementById("sale_order_number");

let encryptNumber = function(){
    let d = new Date()
    let time = d.getHours().toString() +
        d.getMinutes().toString() +
        d.getSeconds().toString();
    time = parseInt(time);
    // Radix = 35 to minimize as much as possible the size of the string and to reserve the use of the letter "Z"
    return time.toString(35).toUpperCase();
}

let orderNumberChanger = function(enabled, key){
    if (enabled){
        let originalFullOrderNumber = orderNumber.value;
        let originalNumber = originalFullOrderNumber.split("/")[3];
        // If somehow the script already ran, don't run again.
        if (originalNumber[0] == "Z"){
            return
        }
        let newNumber = "Z" + encryptNumber();
        orderNumber.value = originalFullOrderNumber.split("/").slice(0,3).join("/") + "/" + newNumber;
    }
}

let main = function(){
    let path = document.location.pathname
    if (!path.startsWith("/orders/new")){
        return
    }
    
    console.log("main triggered")
    chrome.storage.sync.get(["orderNumberChangerEnabled"], function(results){
        let enabled = results.orderNumberChangerEnabled;
        chrome.storage.sync.get(["key"], function(results){
            let key = results.key
            orderNumberChanger(enabled, key);
            running = false;
        });
    });
}

// Tired of trying. Going for the ugliest implementation
window.setInterval(main, 200);