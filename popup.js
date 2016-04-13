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
		vm.chosenDate = new Date();
		vm.minDate = new Date();
		vm.startTime = vm.getStartTimeList()[0];
		vm.endTime = vm.getEndTimeList()[0];
		vm.username = "xcao002";
		vm.password = "664716aBC";

		vm.bindEvents();
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

	PopController.prototype.bindEvents = function(){
		var vm = this;
		util.sendMessage({
			type: constant.EVENT_TYPE.CHECK_STATUS
		}, 
		function(response){
			vm.bookingStarted = response.started;
			vm.chosenCategoryKey = response.chosenCategoryKey;
	
			vm.param.$scope.$apply();
		});
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



