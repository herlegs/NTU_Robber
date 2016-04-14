(function ($) {
    var util = NTURobber.util;
    var constant = NTURobber.constant;

    var app = angular.module('NTU_Robber');

    var dependency = ['$scope', PopController]

    app.controller("PopController", dependency);

    function PopController() {
        var vm = this;
        util.storeParam(vm, dependency, arguments);

        vm.categoryList = constant.CATEGORY;
        vm.timeslot_array = constant.TIMESLOT_array;

        vm.bookingStarted = false;
        vm.success = false;
        vm.bookedInfo = "";
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

    PopController.prototype.getTimeList = function () {
        var vm = this;
        var categoryTimeRange = vm.categoryList[vm.chosenCategoryKey].range;
        return constant.getTimeListFromRange(categoryTimeRange);
    }

    PopController.prototype.getStartTimeList = function () {
        var vm = this;
        var timeList = vm.getTimeList();
        return timeList.slice(0, timeList.length - 1);
    }

    PopController.prototype.getEndTimeList = function () {
        var vm = this;
        var timeList = vm.getTimeList();
        var startTimeIndex = timeList.indexOf(vm.startTime);
        return timeList.slice(startTimeIndex + 1);
    }

    PopController.prototype.updateStatus = function () {
        var vm = this;
        chrome.runtime.sendMessage({
                type: constant.EVENT_TYPE.CHECK_STATUS
            },
            vm.updateStatusWithResponse.bind(vm));
    }

    PopController.prototype.updateStatusWithResponse = function (response) {
        var vm = this;
        vm.bookingStarted = response.started;
        vm.chosenCategoryKey = response.chosenCategoryKey;
        vm.chosenDate = vm.bookingStarted ? new Date(response.chosenDate) : new Date();
        vm.chosenRange = response.chosenRange.split(",");
        var timeList = vm.getTimeList();
        if(vm.chosenRange[0] == -1 || vm.chosenRange[1] == -1){
            vm.chosenRange = [0, timeList.length - 1]
        }
        vm.startTime = timeList[vm.chosenRange[0]];
        vm.endTime = timeList[vm.chosenRange[1]];
        vm.username = response.username;
        vm.password = response.password;

        vm.success = response.success;
        vm.bookedInfo = response.bookedInfo;

        vm.param.$scope.$apply();
    }

    PopController.prototype.startSeatBooking = function () {
        var vm = this;
        vm.bookingStarted = true;
        vm.calChosenRange();
        util.sendMessage({
            type: constant.EVENT_TYPE.START_BOOKING,
            chosenCategoryKey: vm.chosenCategoryKey,
            chosenDate: vm.chosenDate.toString(),
            chosenRange: vm.chosenRange.toString(),
            username: vm.username,
            password: vm.password
        });
    }

    PopController.prototype.stopSeatBooking = function () {
        var vm = this;
        vm.bookingStarted = false;
        util.sendMessage({type: constant.EVENT_TYPE.STOP_BOOKING});
    }

    PopController.prototype.calChosenRange = function () {
        var vm = this;
        var timeList = vm.getTimeList();
        var chosenRange = [0, timeList.length - 1];
        var startTimeIndex = timeList.indexOf(vm.startTime);
        var endTimeIndex = timeList.indexOf(vm.endTime);
        chosenRange[0] = (startTimeIndex != -1) ? startTimeIndex : chosenRange[0];
        chosenRange[1] = (endTimeIndex != -1) ? endTimeIndex : chosenRange[1];
        vm.chosenRange = chosenRange;
    }

})(jQuery);



