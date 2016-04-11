(function() {
  var log_btn_selector = "body > form > table:nth-child(10) > tbody > tr > td:nth-child(1) > input[type='button']";
  var cfm_btn_selector = "body > form > table:nth-child(18) > tbody > tr > td > input[type='button']";
  var log_btn = $(log_btn_selector);
  var cfm_btn = $(cfm_btn_selector);
  var watcher;
  var interval_default = 1000;

  var log_hour = 9;

  var min_range = [50, 59];

  var lastLogTime;

  function getDetailTime(dateObj){
    var year = dateObj.getFullYear();
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate();

    var hour = dateObj.getHours();
    var minute = dateObj.getMinutes();

    return {day: day, hour: hour, minute: minute};
  }

  function startWatcher(interval){
    interval = interval || interval_default;
    watcher = 
      setTimeout(function(){
        tryLogIn();
      }, interval);
  }

  function tryLogIn(){
    var nextTaskDelay = null;

    log_btn = $(log_btn_selector);
    cfm_btn = $(cfm_btn_selector);
    if(log_btn.length){
      //log in screen
      if(isValidForLogIn()){
        log_btn.get(0).click();
        nextTaskDelay = 1000;
      }
      else{
        nextTaskDelay = 1000*60*(min_range[1] - min_range[0])/2; //mins
        nextTaskDelay = nextTaskDelay < 1000*30 ? 1000*30: nextTaskDelay;
        nextTaskDelay = nextTaskDelay > 1000*60*5 ? 1000*60*5: nextTaskDelay;
      }
    }
    
    if(cfm_btn.length){
      //confirm screen
      var logTimeString = new Date().toString();
      sendLogTime(logTimeString);
      cfm_btn.get(0).click();
      nextTaskDelay = 1000;
    }
    
    startWatcher(nextTaskDelay);
  }

  function isValidForLogIn(){
    if(isTodayWeekend()){
      return false;
    }
    var now = getDetailTime(new Date());
    var prev;
    if(lastLogTime == null){
      prev = getDetailTime(new Date());
      prev.day -= 1;
    }
    else{
      prev = getDetailTime(lastLogTime);
    }

    if(now.hour == log_hour && now.minute >= min_range[0] && now.minute <= min_range[1]
      && now.day != prev.day){
      return true;
    }
    else{
      return false;
    }
  }

  function isTodayWeekend(){
    var day = new Date().getDay();
    return (day == 6) || (day == 0);    
  }

  function isTodayExclusionDay(){

  }

  function sendLogTime(log_time){
    chrome.runtime.sendMessage({type: "login", logTime: log_time}, function(response) {});
  }

  function startListener(){
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.type == "logstatus" && request.lastLogTime){
          lastLogTime = new Date(request.lastLogTime);
        }
    });
  }


  //start execution
  startWatcher();
  startListener();

})();
