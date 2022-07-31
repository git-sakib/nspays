const fetch = require('node-fetch');

const services = {
    fetchRates: async (apiURL) => {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
        //console.log(data);
    }
};

module.exports = services;
