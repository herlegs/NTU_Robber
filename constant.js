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
		PASSWORD: 2,
		CATEGORY: 3
	};

	constant.CATEGORY = {
		badminton: {id: 0, key: "badminton", name: "Badminton"},
		squash: {id: 1, key: "squash", name: "Squash"},
		table_tennis_at_srctr: {id: 2, key: "table_tennis_at_srctr", name: "Table Tennis Table(S & R Ctr)"},
		table_tennis_at_squash: {id: 3, key: "table_tennis_at_squash", name: "Table Tennis Table(At Squash Court 4 during period 8 Apr to 13 May 16)"},
		tennis_at_hall7: {id: 4, key: "tennis_at_hall7", name: "Tennis Court(Hall 7)"},
		tennis_at_srctr: {id: 5, key: "tennis_at_srctr", name: "Tennis Court(S & R Ctr)"}
	}

	constant.TIMESLOT = {
		
	}

})();



