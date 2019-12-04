chrome.runtime.onInstalled.addListener(function(){
    // Setting default values for variables
    chrome.storage.sync.set({key: "1/2/3/4/5"},() => {});
    chrome.storage.sync.set({orderNumberChangerEnabled: true},() => {});
    // Setting page action
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {urlContains: "glasson.pl/orders/new"}
                    })
                ],
                actions: [
                    new chrome.declarativeContent.ShowPageAction()
                ]
            }
        ]);
    });
});