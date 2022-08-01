const fetch = require('node-fetch');

const services = {
    /**
     * Fetch & Returns the commission rates form desired APIs
     * @param {string} apiURL - the API URL
     */
    fetchRates: async (apiURL) => {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    },
    /**
     * Fetch & Returns the input data from JSON URL
     * @param {string} apiURL - the JSON URL
     */
    fetchInputData: async (apiURL) => {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    },
};

module.exports = services;
