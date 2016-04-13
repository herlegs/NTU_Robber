var constant = NTURobber.constant;
var util = NTURobber.util;

var started = false;
var chosenCategory = constant.CATEGORY.badminton;
var chosenDate = new Date();
var chosenRange = [0,1];
var username = "xcao002";
var password = "664716aBC";

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	if (request.type == constant.EVENT_TYPE.CHECK_STATUS){
		sendResponse({
			started: started,
			chosenCategoryKey: chosenCategory.key,
			chosenDate: chosenDate.toString(),
			chosenRange: chosenRange.toString(),
			username: username,
			password: password
		});
    }
    if (request.type == constant.EVENT_TYPE.START_BOOKING){
      openBookingTab();
	  started = true;
    }
  }
);

function openBookingTab(){
  var newURL = "https://wis.ntu.edu.sg/webexe88/owa/srce_smain_s.SRC_GenEntry?p_closewind=N";
  chrome.tabs.create({ url: newURL }, function(tab) {
    chrome.tabs.executeScript(tab.id, {file: "jquery.js"}, function () {
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if (request.type == constant.EVENT_TYPE.STOP_BOOKING){
            chrome.tabs.remove(tab.id);
			started = false;
          }
      });

      chrome.tabs.executeScript(tab.id, {file: "constant.js"}, function () {
		chrome.tabs.executeScript(tab.id, {file: "fillin.js"}, function(){
			sendLogStatus(tab.id);
		});
      });

      chrome.tabs.onUpdated.addListener(function(tabId , info) {
        if (tabId === tab.id) {
          if (info.status == "complete") {
			chrome.tabs.executeScript(tab.id, {file: "jquery.js"}, function () {
				chrome.tabs.executeScript(tab.id, {file: "constant.js"}, function () {
					chrome.tabs.executeScript(tab.id, {file: "fillin.js"}, function(){
						sendLogStatus(tab.id);
					});
				});
			});
          }
        }
      });
    });
  });
}

function sendLogStatus(tabId){
  chrome.tabs.query({}, function(tabs) {
    chrome.tabs.sendMessage(tabId, {type: constant.EVENT_TYPE.BOOKING_SETTING}, function(response) {});
  });
}


