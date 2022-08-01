const helper = {

    /**
     * returns the day number in a week through monday to sunday
     * mon - 1, tue - 2, ...., sun - 7 
     * @param {string} date - the input date 
     */
    getWeekDay: function(date) {
        const theDate = new Date(date);
        let theWeekDay = theDate.getDay();
        // Set the week start day as Monday and make Sunday no 7
        if (theWeekDay == 0) {
            return 7;
        }
        return theWeekDay;
    },

    /**
     * returns the day number in a week through monday to sunday
     * mon - 1, tue - 2, ...., sun - 7 
     * @param {string} date - the input date 
     */
    getDaysBetween: function(startDate, endDate) {
        const diffInMs = new Date(endDate) - new Date(startDate);
        return parseInt(diffInMs / (1000 * 60 * 60 * 24));
    },

    /**
     * returns rounded value to closest ceil cent value
     * @param {number} fee - the un rounded value
     */
    getRoundedValue: function(fee) {
        return (Math.ceil(fee * 100)) / 100;
    }

}

module.exports = helper;
