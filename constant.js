var NTURobber = NTURobber ? NTURobber : {util: {}, constant: {}};
(function(){

	var constant = NTURobber.constant;

	constant.EVENT_TYPE = {
		CHECK_STATUS: "checkstatus",
		START_BOOKING: "startbooking",
		STOP_BOOKING: "stopbooking",
		BOOKING_SETTING: "setting"
	};

	constant.STAGE = {
		PRE_LOGIN: 0,
		USERNAME: 1,
		PASSWORD: 2
	};

})();



