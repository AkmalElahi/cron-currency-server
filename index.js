const express = require('express');
require('./db');

const port = process.env.PORT || 3000

const getCurrencyRate = require('./route');

const app = express()
app.use(express.json(),getCurrencyRate)


app.listen(port, () => {
    console.log(`server is up and running on port ${port} !`)
})


