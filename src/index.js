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
                    const daysBetween = helper.getDaysBetween(users[transaction.user_id].date, transaction.date);
                    let freeOfferTakenThisWeek = users[transaction.user_id].freeOfferTaken;
                    let totalThisWeek = users[transaction.user_id].weekTotal;
                    const transactionAmount = transaction.operation.amount;

                    // Check if one week past already since last transaction by date difference
                    if (daysBetween >= 7) {
                        totalThisWeek = transactionAmount;
                        freeOfferTakenThisWeek = false;
                    // Check if this is a new week by weekday
                    } else if (users[transaction.user_id].weekDay > weekDay) {
                        totalThisWeek = transactionAmount;
                        freeOfferTakenThisWeek = false;
                    // This is the same week
                    } else {
                        if (totalThisWeek > cashoutNaturalRates.week_limit.amount) {
                            freeOfferTakenThisWeek = true;
                        }
                        totalThisWeek += transactionAmount;
                    }

                    // Update the values
                    users[transaction.user_id].freeOfferTaken = freeOfferTakenThisWeek;
                    users[transaction.user_id].weekDay = weekDay;
                    users[transaction.user_id].date = transaction.date;
                    users[transaction.user_id].weekTotal = totalThisWeek;
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
        const transactionFee = helper.getRoundedValue(finalFee).toFixed(2);
        // console.log(transactionFee,users);
        return transactionFee;
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
