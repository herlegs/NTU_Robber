(function($) {
	var constant = NTURobber.constant;

	var choosenCategory = constant.CATEGORY.squash;

	var choosenDate = new Date();
	choosenDate.setDate(choosenDate.getDate() + 1);

	var choosenRange = [2, 4];

	var interval_default = 1000;

	var username = "xcao002";
	var password = "664716aBC";

	var pre_login_selector = "#ui_body_container > form > table > tbody > tr:nth-child(4) > td:nth-child(2) > li > a";

	var username_input_selector = '#ui_body_container > table > tbody > tr:nth-child(2) > td > form > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type="text"]';

	var password_input_selector = '#ui_body_container > table > tbody > tr:nth-child(2) > td > form > center:nth-child(2) > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td:nth-child(2) > input[type="password"]';

	var login_ok_btn = 'input[name="bOption"]';

	var category_list = "form[action='srce_smain_s.srce_temp']";

	var time_slot_form = "form[action='srce_sub1.srceb$sel32']";

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
				category_list: $("input[name='p_info']")
			}
		}
		if(isElementExist(time_slot_form)){
			return {stage: constant.STAGE.CHECK_SLOT}
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
	else if(stageInfo.stage == constant.STAGE.CHECK_SLOT){
        trySelectSlot();
	}
    
    startWatcher(nextTaskDelay);
  }

    function trySelectSlot(){
        var targetCells = getTargetCells();
        var slots = getValidSlot(targetCells);
        if(slots.length){
            slots[0].get(0).click();
        }
        else{
            alert("no slots");
        }
    }

    function getTargetCells(){
        var targetCells = [];
        var trrange = constant.getTRRange(choosenCategory.key, choosenRange);
        var table = $(time_slot_form).find("table:eq(1)");
        var rows = table.find("tr");
        var headerRow = rows.eq(0);
        var columnIndex = getColumnIndexFromChosenDate(headerRow);

        if(columnIndex == 0){
            return targetCells;
        }

        var targetRows = rows.slice(trrange[0] + 1, trrange[1] + 1);
        for(var i = 0; i < targetRows.length; i++){
            var cells = targetRows.eq(i).find("td");
            var cell = cells.length == 10 ? cells.eq(columnIndex) : cells.eq(columnIndex - 1);
            targetCells.push(cell);
        }
        return targetCells;
    }

    function getValidSlot(cells){
        var slots = [];
        for(var i = 0; i < cells.length; i++){
            var cell = cells[i];
            var slot = cell.find("input");
            if(slot.length){
                slots.push(slot);
            }
        }
        return slots;
    }

    function getColumnIndexFromChosenDate(headerRow){
        var columnIndex = 0;
        var headerCells = headerRow.find("td");
        var chosenDateString = constant.getExpectedStringFromDate(choosenDate);
        for(var i = 0; i < headerCells.length; i++){
            if(headerCells.eq(i).text().startsWith(chosenDateString)){
                columnIndex = i;
                break;
            }
        }
        return columnIndex;
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
