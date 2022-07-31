const calculate = {

    /**
     * returns the calculated cash-in comission
     * @param {number} amount - the cash in amount
     * @param {number} rate - the commission rate
     * @param {number} max - the max commission applied
     */
    calculateCashInFees: function(amount, rate, max) {
        let fee = (rate / 100) * amount;
        if (fee > max) {
            fee = max;
        }
        return fee;
        //return fee.toFixed(2);
    },

    /**
     * returns the calculated cash-out natural comission
     * @param {number} amount - the cash out amount
     * @param {number} rate - the commission rate
     * @param {number} week_limit - the weekly limit
     * @param {number} week_total - total amount withdrawl in current week
     */
    calculateCashOutNaturalFees: function(amount, rate, week_limit, week_total, free_offer_taken) {
        let fee = 0;
        if(free_offer_taken) {
            fee = (rate / 100) * amount;
            return fee;            
        }
        if(week_total <= week_limit && !free_offer_taken){
            return 0;
        }
        let feeAmount = week_total - week_limit;
        fee = (rate / 100) * feeAmount;
        return fee;
        //return fee.toFixed(2);
    },


    /**
     * returns the calculated cash-out legal comission
     * @param {number} amount - the cash out amount
     * @param {number} rate - the commission rate
     * @param {number} min - the minimum commission applied
     */
    calculateCashOutLegalFees: function(amount, rate, min) {
        let fee = (rate / 100) * amount;
        if (fee < min) {
            fee = min;
        }        
        return fee;
        //return fee.toFixed(2);
    }

}

module.exports = calculate;
