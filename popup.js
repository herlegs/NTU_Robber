(function($){
	var util = NTURobber.util;
	var constant = NTURobber.constant;

	var app = angular.module('NTU_Robber');
	
	var dependency = ['$scope', PopController]

	app.controller("PopController", dependency);

	function PopController(){
		var vm = this;
		util.storeParam(vm, dependency, arguments);
		
		vm.categoryList = constant.CATEGORY;
		vm.timeslot_array = constant.TIMESLOT_array;

		vm.bookingStarted = false;
		vm.chosenCategoryKey = vm.categoryList.squash.key;
		vm.chosenDate;
		vm.minDate = new Date();
		vm.startTime;
		vm.endTime;
		vm.chosenRange;
		vm.username = "";
		vm.password = "";

		vm.updateStatus();
	}
	
	PopController.prototype.getTimeList = function(){
		var vm = this;
		var categoryTimeRange = vm.categoryList[vm.chosenCategoryKey].range;
		return constant.getTimeListFromRange(categoryTimeRange);
	}
	
	PopController.prototype.getStartTimeList = function(){
		var vm = this;
		return vm.getTimeList();
	}
	
	PopController.prototype.getEndTimeList = function(){
		var vm = this;
		var timeList = vm.getTimeList();
		var startTimeIndex = timeList.indexOf(vm.startTime);
		return timeList.slice(startTimeIndex + 1);
	}

	PopController.prototype.updateStatus = function(){
		var vm = this;
		chrome.runtime.sendMessage({
			type: constant.EVENT_TYPE.CHECK_STATUS
		}, 
		vm.updateStatusWithResponse.bind(vm));
	}
	
	PopController.prototype.updateStatusWithResponse = function(response){
		var vm = this;
		vm.bookingStarted = response.started;
		vm.chosenCategoryKey = response.chosenCategoryKey;
		vm.chosenDate = vm.bookingStarted ? new Date(response.chosenDate) : new Date();
		vm.chosenRange = response.chosenRange.split(",");
		vm.startTime = vm.getTimeList()[vm.chosenRange[0]];
		vm.endTime = vm.getTimeList()[vm.chosenRange[1]];
		vm.username = response.username;
		vm.password = response.password;
		vm.param.$scope.$apply();
	}

	PopController.prototype.startSeatBooking = function(){
		var vm = this;
		vm.bookingStarted = true;
		util.sendMessage({
			type: constant.EVENT_TYPE.START_BOOKING
		});
	}

	PopController.prototype.stopSeatBooking = function(){
		var vm = this;
		vm.bookingStarted = false;
		util.sendMessage({type: constant.EVENT_TYPE.STOP_BOOKING});
	}


})(jQuery);



