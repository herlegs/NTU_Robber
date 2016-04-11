var constant = NTURobber.constant;
var util = NTURobber.util;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    alert(request.type);
    if (request.type == constant.EVENT_TYPE.START_BOOKING){
      openBookingTab();
    }
  }
);

function openBookingTab(){
  var newURL = "http://www.ntu.edu.sg/has/SnR/SportsFacilities/Pages/BookingofFacilities.aspx";
  chrome.tabs.create({ url: newURL }, function(tab) {
    chrome.tabs.executeScript(tab.id, {file: "jquery.js"}, function () {
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if (request.type == constant.EVENT_TYPE.STOP_BOOKING){
            chrome.tabs.remove(tab.id);
          }
      });

      chrome.tabs.executeScript(tab.id, {file: "fillin.js"}, function () {
        sendLogStatus(tab.id);
      });

      chrome.tabs.onUpdated.addListener(function(tabId , info) {
        if (tabId === tab.id) {
          if (info.status == "complete") {
            chrome.tabs.executeScript(tab.id, {file: "fillin.js"}, function () {
              sendLogStatus(tab.id);
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


