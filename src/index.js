const config = require('../config');
const services = require('./services');
const helper = require('./helper');
const calculate = require('./calculate');

async function CalculateCommissionFees(InputData) {
    const users = {};
    const results = [];
    const cashinRates = await services.fetchRates(config.api.cash_in);
    const cashoutNaturalRates = await services.fetchRates(config.api.cash_out_natural);
    const cashoutLegalRates = await services.fetchRates(config.api.cash_out_legal);

    /**
     * Process A single Transaction nad returns the fee
     * @param {Object} transaction - the transaction object from input source
     */
    function processTransaction(transaction) {
        let finalFee = 0;

        // --------------------------------------------------------------------
        // THIS BLOCK ACTUALLY CALCUALTES THE FEES
        // --------------------------------------------------------------------
        if (transaction.type === 'cash_out') { // cash out
            if (transaction.user_type === 'natural') { // natural
                // --------------------------------------------------------------------
                // THIS BLOCK ADD/UPDATE USER RECORDS FOR CALCULATION
                // --------------------------------------------------------------------
                const weekDay = helper.getWeekDay(transaction.date);
                // Check if user exists
                if (transaction.user_id in users) {
                    // Check number of days since the last transaction
                    const daysBetween = helper.getDaysBetween(
                        transaction.date,
                        users[transaction.user_id].date,
                    );

                    // Check if one week past already since last transaction
                    if (daysBetween >= 7) {
                        users[transaction.user_id].weekTotal = transaction.operation.amount;
                        users[transaction.user_id].freeOfferTaken = false;
                    } else if (users[transaction.user_id].weekDay > weekDay) {
                        users[transaction.user_id].weekTotal = transaction.operation.amount;
                        users[transaction.user_id].freeOfferTaken = false;
                    } else {
                        if (users[transaction.user_id].freeOfferTaken) {
                            users[transaction.user_id].weekTotal = 0;
                        } else if (users[transaction.user_id].weekTotal >= cashoutNaturalRates.week_limit.amount) {
                            users[transaction.user_id].freeOfferTaken = true;
                        }
                        users[transaction.user_id].weekTotal += transaction.operation.amount;
                    }
                    // Update the values for date & weekday
                    users[transaction.user_id].weekDay = weekDay;
                    users[transaction.user_id].date = transaction.date;
                // If not then Create a slot for the user
                } else {
                    // Set the values correponding to user id
                    users[transaction.user_id] = {
                        date: transaction.date,
                        freeOfferTaken: false,
                        weekDay,
                        weekTotal: transaction.operation.amount,
                    };
                }
                finalFee = calculate.calculateCashOutNaturalFees(
                    transaction.operation.amount,
                    cashoutNaturalRates.percents,
                    cashoutNaturalRates.week_limit.amount,
                    users[transaction.user_id].weekTotal,
                    users[transaction.user_id].freeOfferTaken,
                );
            } else { // legal
                finalFee = calculate.calculateCashOutLegalFees(
                    transaction.operation.amount,
                    cashoutLegalRates.percents,
                    cashoutLegalRates.min.amount,
                );
            }
        } else { // cash in
            finalFee = calculate.calculateCashInFees(
                transaction.operation.amount,
                cashinRates.percents,
                cashinRates.max.amount,
            );
        }
        return helper.getRoundedValue(finalFee).toFixed(2);
    }

    // --------------------------------------------------------------------
    // CALCULATE FEES FOR THE INPUT DATASET
    // --------------------------------------------------------------------
    InputData.forEach((transaction) => {
        const fee = processTransaction(transaction);
        results.push(fee);
    });

    return results.join(',');
    // return results;
}

module.exports = CalculateCommissionFees;
