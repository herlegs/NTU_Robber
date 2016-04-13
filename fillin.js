(function($) {
	var constant = NTURobber.constant;

	var choosenCategory = constant.CATEGORY.badminton;

	var interval_default = 1000;

	var username = "xcao002";
	var password = "664716aBC";

	var pre_login_selector = "#ui_body_container > form > table > tbody > tr:nth-child(4) > td:nth-child(2) > li > a";

	var username_input_selector = '#ui_body_container > table > tbody > tr:nth-child(2) > td > form > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type="text"]';

	var password_input_selector = '#ui_body_container > table > tbody > tr:nth-child(2) > td > form > center:nth-child(2) > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td:nth-child(2) > input[type="password"]';

	var login_ok_btn = 'input[name="bOption"]';

	var category_list = "input[name='p_info']";

	var watcher;

	function isElementExist(selector){
		var element = $(selector);
		if(element.length){
			return true;
		}
		else{
			return false;
		}
	}

	function getStage(){
		if(isElementExist(pre_login_selector)){
			return {
				stage: constant.STAGE.PRE_LOGIN,
				pre_login_btn: $(pre_login_selector)
			}
		}
		if(isElementExist(username_input_selector)){
			return {
				stage: constant.STAGE.USERNAME,
				username_input: $(username_input_selector)
			}
		}
		if(isElementExist(password_input_selector)){
			return {
				stage: constant.STAGE.PASSWORD,
				password_input: $(password_input_selector)
			}
		}
		if(isElementExist(category_list)){
			return {
				stage: constant.STAGE.CATEGORY,
				category_list: $(category_list)
			}
		}
	}

  function startWatcher(interval){
    interval = interval || interval_default;
    watcher = 
      setTimeout(function(){
        action();
      }, interval);
  }

  function action(){
    var nextTaskDelay = null;

	var stageInfo = getStage();

	if(stageInfo.stage == constant.STAGE.PRE_LOGIN){
		stageInfo.pre_login_btn.get(0).click();
	}
	else if(stageInfo.stage == constant.STAGE.USERNAME){
		stageInfo.username_input.val(username);
		$(login_ok_btn).get(0).click();
	}
	else if(stageInfo.stage == constant.STAGE.PASSWORD){
		stageInfo.password_input.val(password);
		$(login_ok_btn).get(0).click();
	}
	else if(stageInfo.stage == constant.STAGE.CATEGORY){
		var categoryBtn = stageInfo.category_list.eq(choosenCategory.id);
		categoryBtn.get(0).click();
	}
    
    startWatcher(nextTaskDelay);
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

})(jQuery);
