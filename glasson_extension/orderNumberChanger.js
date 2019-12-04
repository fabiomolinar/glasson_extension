// This script will only run once at page load
let defaultStepNumber = 10;

let checkNumber = function(number){
    if (
        isNaN(number) ||
        typeof number != "number" ||
        number < 1
    ){
        return defaultStepNumber
    }
    return number
}

let encryptNumber = function(secret, key){
    // secret has to be a number
    secret = parseInt(secret)
    let keyList = key.split("/").map(i => parseInt(i));
    let numberList = [];
    for (i = 0; i < 5; i++){
        numberList[i] = checkNumber(keyList[i])
    }
    let newNumber = 1 + ((secret + numberList[0])*numberList[1] + numberList[2])*numberList[3] + numberList[4];
    return newNumber.toString(36).toUpperCase();
}

let orderNumberChanger = function(enabled, key){
    if (enabled){
        let orderNumber = document.getElementById("sale_order_number");
        let originalOrderNumber = orderNumber.value;
        // If somehow the script already ran, don't run again.
        if (originalOrderNumber[0] == "Z"){
            return
        }
        let originalNumber = originalOrderNumber.split("/")[3];
        let newNumber = "Z" + encryptNumber(originalNumber, key);
        orderNumber.value = originalOrderNumber.split("/").slice(0,3).join("/") + "/" + newNumber;
    }
}

document.addEventListener("readystatechange", function(){
    if (document.readyState == "complete"){
        chrome.storage.sync.get(["orderNumberChangerEnabled"], function(results){
            let enabled = results.orderNumberChangerEnabled;
            chrome.storage.sync.get(["key"], function(results){
                let key = results.key
                orderNumberChanger(enabled, key);
            });
        });
    }
});