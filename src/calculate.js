const calculate = {

    /**
     * returns the calculated cash-in comission
     * @param {number} amount - the cash in amount
     * @param {number} rate - the commission rate
     * @param {number} max - the max commission applied
     */
    calculateCashInFees: (amount, rate, max) => {
        let fee = (rate / 100) * amount;
        if (fee > max) {
            fee = max;
        }
        return fee;
    },

    /**
     * returns the calculated cash-out natural comission
     * @param {number} amount - the cash out amount
     * @param {number} rate - the commission rate
     * @param {number} weekLimit - the weekly limit
     * @param {number} weekTotal - total amount withdrawl in current week
     * @param {boolean} freeOfferTaken - is the free offer value alreayd passed for this week
     */
    calculateCashOutNaturalFees: (amount, rate, weekLimit, weekTotal, freeOfferTaken) => {
        let fee = 0;
        if (freeOfferTaken) {
            fee = (rate / 100) * amount;
            return fee;
        }
        if (weekTotal <= weekLimit && !freeOfferTaken) {
            return 0;
        }
        fee = (rate / 100) * (weekTotal - weekLimit);
        return fee;
    },

    /**
     * returns the calculated cash-out legal comission
     * @param {number} amount - the cash out amount
     * @param {number} rate - the commission rate
     * @param {number} min - the minimum commission applied
     */
    calculateCashOutLegalFees: (amount, rate, min) => {
        let fee = (rate / 100) * amount;
        if (fee < min) {
            fee = min;
        }
        return fee;
    },

};

module.exports = calculate;
