var constant = NTURobber.constant;
var util = NTURobber.util;

var started = false;
var chosenCategoryKey = constant.CATEGORY.badminton.key;
var chosenDate = new Date();
var chosenRange = [-1, -1];
var username = "";
var password = "";

var success = false;
var bookedInfo = "";

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type == constant.EVENT_TYPE.CHECK_STATUS) {
            sendResponse({
                started: started,
                chosenCategoryKey: chosenCategoryKey,
                chosenDate: chosenDate.toString(),
                chosenRange: chosenRange.toString(),
                username: username,
                password: password,
                success: success,
                bookedInfo: bookedInfo
            });
        }
        if (request.type == constant.EVENT_TYPE.START_BOOKING) {
            chosenCategoryKey = request.chosenCategoryKey;
            chosenDate = new Date(request.chosenDate);
            chosenRange = request.chosenRange.split(",");
            username = request.username;
            password = request.password;
            openBookingTab();
            started = true;
            success = false;
            bookedInfo = "";
        }
        if(request.type == constant.EVENT_TYPE.NO_SLOT){
            bookedInfo = "Currently no slots available. Trying...";
        }
        if(request.type == constant.EVENT_TYPE.BOOKED){
            success = true;
            bookedInfo = request.bookedInfo;
            started = false;
        }
    }
);

function openBookingTab() {
    var newURL = "https://wis.ntu.edu.sg/webexe88/owa/srce_smain_s.SRC_GenEntry?p_closewind=N";
    chrome.tabs.create({url: newURL}, function (tab) {
        chrome.tabs.executeScript(tab.id, {file: "jquery.js"}, function () {
            chrome.runtime.onMessage.addListener(
                function (request, sender, sendResponse) {
                    if (request.type == constant.EVENT_TYPE.STOP_BOOKING) {
                        chrome.tabs.remove(tab.id);
                        started = false;
                        success = false;
                        bookedInfo = "";
                    }
                });

            chrome.tabs.executeScript(tab.id, {file: "constant.js"}, function () {
                chrome.tabs.executeScript(tab.id, {file: "fillin.js"}, function () {
                    sendSetting(tab.id);
                });
            });

            chrome.tabs.onUpdated.addListener(function (tabId, info) {
                if (tabId === tab.id) {
                    if (info.status == "complete") {
                        chrome.tabs.executeScript(tab.id, {file: "jquery.js"}, function () {
                            chrome.tabs.executeScript(tab.id, {file: "constant.js"}, function () {
                                chrome.tabs.executeScript(tab.id, {file: "fillin.js"}, function () {
                                    sendSetting(tab.id);
                                });
                            });
                        });
                    }
                }
            });
        });
    });
}

function sendSetting(tabId) {
    chrome.tabs.query({}, function (tabs) {
        chrome.tabs.sendMessage(tabId,
            {
                type: constant.EVENT_TYPE.BOOKING_SETTING,
                chosenCategoryKey: chosenCategoryKey,
                chosenDate: chosenDate.toString(),
                chosenRange: chosenRange.toString(),
                username: username,
                password: password,
                success: success
            },
            function (response) {}
        );
    });
}


