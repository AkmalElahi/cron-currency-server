const express = require('express');
const CurrencyRate = require('../model')
const routes = express.Router()
const axios = require("axios");
var CronJob = require('cron').CronJob;
const key = 'THB'
const url = 'https://currency-converter5.p.rapidapi.com/currency/convert'
const headers = {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
    "x-rapidapi-key": "59543c5b1dmsh49713662128b686p153426jsn870eefe47ee0",
    "useQueryString": true
}
const params = {
    "format": "json",
    "from": "USD",
    "to": key,
    "amount": "1"
}
const saveCurrencyRate = async (rawData) => {
    const data = {
        base_currency: rawData.base_currency_name,
        currency: rawData.rates[key].currency_name,
        rate: rawData.rates[key].rate
    }
    const rate = await CurrencyRate(data).save()
    console.log(rate)
    return rate
}
async function getCurrency() {
    try {
        const { data } = await axios.get(url, {
            headers: headers, params: params
        })
        await saveCurrencyRate(data)

    }
    catch (e) {
        console.log(e.message)
    }
}

var job = null
routes.get('/start', async (req, res) => {
    job = new CronJob('0 */15 * * * *', function () {
        console.log('fetched')
        getCurrency()
    }, null, true, 'America/Los_Angeles');
    job.start();
    res.send("started")

})
routes.get('/stop', async (req, res) => {
    job.stop()
    res.send("stoped")

})
module.exports = routes