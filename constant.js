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
		CATEGORY: 3,
		CHECK_SLOT: 4
	};

	constant.CATEGORY = {
		badminton: {id: 0, key: "badminton", name: "Badminton", range: [2, 19], tables: 4},
		squash: {id: 1, key: "squash", name: "Squash", range: [2, 19], tables: 4},
		table_tennis_at_srctr: {id: 2, key: "table_tennis_at_srctr", name: "Table Tennis(S & R Ctr)", range: [2, 19], tables: 4},
		table_tennis_at_squash: {id: 3, key: "table_tennis_at_squash", name: "Table Tennis(Squash Court 4)", range: [2, 19], tables: 2},
		tennis_at_hall7: {id: 4, key: "tennis_at_hall7", name: "Tennis Court(Hall 7)", range: [2, 18], tables: 2},
		tennis_at_srctr: {id: 5, key: "tennis_at_srctr", name: "Tennis Court(S & R Ctr)", range: [0, 19], tables: 6}
	}

	constant.TIMESLOT = {
		"07:30" : 0,
		"08:15" : 1,
		"09:00" : 2,
		"09:45" : 3,
		"10:30" : 4,
		"11:15" : 5,
		"12:00" : 6,
		"12:45" : 7,
		"13:30" : 8,
		"14:15" : 9,
		"15:00" : 10,
		"15:45" : 11,
		"16:30" : 12,
		"17:15" : 13,
		"18:00" : 14,
		"18:45" : 15,
		"19:30" : 16,
		"20:15" : 17,
		"21:00" : 18,
		"21:45" : 19
	}

	constant.TIMESLOT_array = ["07:30","08:15","09:00","09:45","10:30","11:15","12:00","12:45","13:30","14:15","15:00","15:45","16:30","17:15","18:00","18:45","19:30","20:15","21:00","21:45"];

	constant.MONTH_NAME_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	constant.getTimeListFromRange = function(range){
		return constant.TIMESLOT_array.slice(range[0], range[1] + 1);
	}

	//get table row range from user's chosen time range
	constant.getTRRange = function(categoryKey, range){
		var trrange = [0, 0];
		var startIndex = 0;
		var endIndex = 0;
		var category = constant.CATEGORY[categoryKey];
		if(category.range[0] > range[0] || category.range[1] < range[1]){
			return trrange;
		}
		startIndex = range[0] - category.range[0];
		endIndex = range[1] - range[0];
		trrange = [startIndex*category.tables, endIndex*category.tables];
		return trrange;
	}

	constant.getExpectedStringFromDate = function(date){
		var day = date.getDate();
		var month = constant.MONTH_NAME_array[date.getMonth()];

		return "" + day + month;
	}



})();



