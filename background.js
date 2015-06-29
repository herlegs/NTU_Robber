chrome.browserAction.onClicked.addListener(function () {
  var newURL = "your url";
  chrome.tabs.create({ url: newURL }, function(tab) {
    chrome.tabs.executeScript(tab.id, {file: "jquery.js"}, function () {
      chrome.tabs.executeScript(tab.id, {file: "jquery.waituntilexists.js"}, function () {
        chrome.extension.onRequest.addListener(function (json, port, reply) {
          if (json.message === "CLOSE") {
            chrome.tabs.remove(tab.id);
          }
        });
        chrome.tabs.executeScript(tab.id, {file: "fillin.js"}, function () {});
        chrome.tabs.onUpdated.addListener(function(tabId , info) {
          if (tabId === tab.id) {
            if (info.status == "complete") {
              chrome.tabs.executeScript(tab.id, {file: "fillin.js"}, function () {});
            }
          }
        });
      });
    });
  });
});
