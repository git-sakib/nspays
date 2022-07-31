const config = {
    api: {
        cash_in: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in',
        cash_out_natural: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural',
        cash_out_legal: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical'     
    },
    rates: {
        cash_in: {
            percents: 0.03,
            max: {
                amount: 5,
                currency: "EUR"
            }
        },
        cash_out: {
            natural: {
                percents: 0.3,
                week_limit: {
                    amount: 1000,
                    currency: "EUR"
                }
            },
            legal: {
                percents: 0.3,
                min: {
                    amount: 0.5,
                    currency: "EUR"
                }             
            }
        }        
    }
};

module.exports = config;
