const mongoose = require('mongoose');


const currencySchema = mongoose.Schema({
    base_currency: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true,
    },
    rate: {
        type: String,
        required: true,
    },
    created_At: {
        type: Date,
        default: Date.now
    },
})


const CurrencyRate = mongoose.model('CurrencyRate', currencySchema)

module.exports = CurrencyRate