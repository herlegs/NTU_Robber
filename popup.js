(function($){
	var util = NTURobber.util;
	var constant = NTURobber.constant;

	var app = angular.module('NTU_Robber');
	
	var dependency = ['$scope', PopController]

	app.controller("PopController", dependency);

	function PopController(){
		var vm = this;
		util.storeParam(vm, dependency, arguments);

		vm.bookingStarted = false;

		vm.bindEvents();
	}

	PopController.prototype.bindEvents = function(){
		var vm = this;
		util.sendMessage({
			type: constant.EVENT_TYPE.CHECK_STATUS
		}, 
		function(response){
			vm.bookingStarted = response.started;
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



