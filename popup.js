(function($){
	var util = NTURobber.util;
	var constant = NTURobber.constant;

	var dependency = ['utilService', PopController];

	var app = angular.module('NTU_Robber');

	app.controller("PopController", dependency);

	function PopController(){
		var vm = this;
		util.storeParam(vm, dependency, arguments);

		vm.bookingStarted = false;

		vm.bindEvents();
	}

	PopController.prototype.bindEvents = function(){
		var vm = this;
		chrome.runtime.onMessage.addListener(
		  function(request, sender, sendResponse) {
		  	alert("recieve" + request.type)
		    if(request.type == "login"){
		    	refreshHistoryList();
		    }
		  }
		);
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

