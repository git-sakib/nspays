const config = require('../config');
const services = require('./services');
const helper = require('./helper');
const { calculateCashInFees, calculateCashOutNaturalFees, calculateCashOutLegalFees }  = require('./calculate');

async function RunApplication(InputData) {

    let users = {};
    let finalFee = 0;

    let cashinRates = await services.fetchRates(config.api.cash_in);
    let cashoutNaturalRates = await services.fetchRates(config.api.cash_out_natural);
    let cashoutLegalRates = await services.fetchRates(config.api.cash_out_legal);

    InputData.forEach(transaction => {

        // --------------------------------------------------------------------
        // THIS BLOCK ACTUALLY CALCUALTES THE FEES
        // --------------------------------------------------------------------
        if (transaction.type == "cash_out") { // cash out
            if (transaction.user_type == "natural") { // natural

                // --------------------------------------------------------------------
                // THIS BLOCK ADD/UPDATE USER RECORDS FOR CALCULATION
                // --------------------------------------------------------------------
                let weekDay = helper.getWeekDay(transaction.date);
                // Check if user exists
                if (transaction.user_id in users) {
                    
                    // Check number of days since the last transaction
                    let daysBetween = helper.getDaysBetween(transaction.date, users[transaction.user_id].date);

                    // Check if one week past already since last transaction
                    if(daysBetween >= 7) {
                        users[transaction.user_id].weekTotal = 0;
                        users[transaction.user_id].freeOfferTaken = false;
                        //console.log('Check days gap !!');
                    } else if( users[transaction.user_id].weekDay > weekDay ) {
                        users[transaction.user_id].weekTotal = 0;
                        users[transaction.user_id].freeOfferTaken = false;
                        //console.log('Check weekdays !!');
                    } else {
                        users[transaction.user_id].weekTotal += transaction.operation.amount;
                        if(users[transaction.user_id].freeOfferTaken) {
                            users[transaction.user_id].weekTotal = 0;
                            //users[transaction.user_id].freeOfferTaken = false;
                        } else {
                            if (users[transaction.user_id].weekTotal >= cashoutNaturalRates.week_limit.amount) {
                                users[transaction.user_id].freeOfferTaken = true;
                            }
                        }
                    }
                    // Update the values for date & weekday
                    users[transaction.user_id].weekDay = weekDay;
                    users[transaction.user_id].date = transaction.date;


                // If not then Create a slot for the user
                } else {

                    // Set the values correponding to user id
                    users[transaction.user_id] = {
                        date: transaction.date,
                        freeOfferTaken: false, //transaction.operation.amount >= cashoutNaturalRates.week_limit.amount ? true : false,
                        weekDay: weekDay,
                        weekTotal: transaction.operation.amount
                    }
                }

                //console.log(users);

                finalFee = calculateCashOutNaturalFees(
                    transaction.operation.amount, 
                    cashoutNaturalRates.percents, 
                    cashoutNaturalRates.week_limit.amount,
                    users[transaction.user_id].weekTotal,
                    users[transaction.user_id].freeOfferTaken
                )
            } else { // legal
                finalFee = calculateCashOutLegalFees(
                    transaction.operation.amount, 
                    cashoutLegalRates.percents, 
                    cashoutLegalRates.min.amount
                )
            }
        } else { // cash in
            finalFee = calculateCashInFees(
                transaction.operation.amount, 
                cashinRates.percents, 
                cashinRates.max.amount
            )
        }

        console.log(finalFee.toFixed(2));

        //break;

    });
}

module.exports = RunApplication;
