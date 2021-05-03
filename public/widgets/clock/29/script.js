function currentTime() {
	document.getElementById("clock").innerText = moment(new Date(), 'ddd DD-MMM-YYYY, hh:mm:ss A').format('hh:mm A'); /* adding time to the div */
	document.getElementById("dayName").innerText = moment(new Date(), 'ddd DD-MMM-YYYY, hh:mm:ss A').format('dddd'); /* adding time to the div */
	document.getElementById("monthDayYear").innerText = moment(new Date(), 'ddd DD-MMM-YYYY, hh:mm:ss A').format('MMM DD, YYYY') /* adding time to the div */

	setTimeout(function () {
		currentTime()
	}, 1000); /* setting timer */
}

currentTime(); /* calling currentTime() function to initiate the process */
