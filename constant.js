var NTURobber = NTURobber ? NTURobber : {util: {}, constant: {}};
(function(){

	var constant = NTURobber.constant;

	constant.EVENT_TYPE = {
		CHECK_STATUS: "checkstatus",
		START_BOOKING: "startbooking",
		STOP_BOOKING: "stopbooking",
		BOOKING_SETTING: "setting",
		BOOKED: "booked",
		NO_SLOT: "noslot"
	};

	constant.STAGE = {
		PRE_LOGIN: 0,
		USERNAME: 1,
		PASSWORD: 2,
		CATEGORY: 3,
		CHECK_SLOT: 4,
		CONFIRM: 5
	};

	constant.CATEGORY = {
		badminton: {id: 0, key: "badminton", name: "Badminton", range: [2, 19], tables: 4},
		squash: {id: 1, key: "squash", name: "Squash", range: [2, 19], tables: 4},
		table_tennis_at_srctr: {id: 2, key: "table_tennis_at_srctr", name: "Table Tennis(S & R Ctr)", range: [2, 19], tables: 4},
		table_tennis_at_squash: {id: 3, key: "table_tennis_at_squash", name: "Table Tennis(Squash Court 4)", range: [2, 19], tables: 2},
		tennis_at_hall7: {id: 4, key: "tennis_at_hall7", name: "Tennis Court(Hall 7)", range: [2, 18], tables: 2},
		tennis_at_srctr: {id: 5, key: "tennis_at_srctr", name: "Tennis Court(S & R Ctr)", range: [0, 19], tables: 6}
	}

	constant.TIMESLOT_array = ["07:30","08:15","09:00","09:45","10:30","11:15","12:00","12:45","13:30","14:15","15:00","15:45","16:30","17:15","18:00","18:45","19:30","20:15","21:00","21:45"];

	constant.MONTH_NAME_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	constant.getTimeListFromRange = function(range){
		return constant.TIMESLOT_array.slice(parseInt(range[0]), parseInt(range[1]) + 1);
	}

	//get table row range from user's chosen time range
	constant.getTRRange = function(categoryKey, range){
		var trrange= [0, 0];
		var startIndex = parseInt(range[0]);
		var endIndex = parseInt(range[1]);
		var category = constant.CATEGORY[categoryKey];
		if(startIndex < 0 || endIndex < 0 || startIndex > endIndex){
			return trrange;
		}
		trrange = [startIndex*category.tables, endIndex*category.tables];
		return trrange;
	}

	constant.getExpectedStringFromDate = function(date){
		var day = date.getDate();
		var month = constant.MONTH_NAME_array[date.getMonth()];

		return "" + day + month;
	}



})();



