var NTURobber = NTURobber ? NTURobber : {util: {}, constant: {}};
(function(){
	var util = NTURobber.util;

	util.storeParam = function(vm, dependency, args){
		vm.param = vm.param || {};
		for(var i = 0; i < args.length; i++){
			vm.param[dependency[i]] = args[i];
		}
	};

	// Check the given object is function or not.
	util.isFunction = function(functionToCheck) {
		return (typeof functionToCheck  == "function");
	};

	util.sendMessage = function(message, callback){
		chrome.runtime.sendMessage(message, function(response) {
			alert("sent"+message.type);
			if(util.isFunction(callback)){
				callback(response);
			}
		});
	}
})();

(function(){
	
	var dependency = ["$rootScope", UtilService];

	var app = angular.module('NTU_Robber');

	app.service("utilService", dependency);

	function UtilService(){

	}
})();



