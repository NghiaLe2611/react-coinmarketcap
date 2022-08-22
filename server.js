const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;
const axios = require('axios');
const app = express();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/status', function(req, res) {
    return res.status(200).json({
        status: true
    })
});

// Coin list
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true
app.get('/api/coin_list', async function(req, res) {
    const page = req.query.page ? req.query.page : 1;

    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=true&price_change_percentage=1h%2C24h%2C7d&page=${page}`)
        return res.status(200).json(response.data);
    } catch(err) {
        return res.status(500).json(err);
    }
});


// Global metrics
// https://price-api.crypto.com/price/v1/global-metrics
app.get('/api/global_metrics', async function(req, res) {
    try {
        // https://sandbox-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/historical
        // https://pro-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/historical
        // https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest
        
        // headers: {
        //     'X-CMC_PRO_API_KEY': process.env.CMC_KEY,
        // },
        
        const response = await axios.get('https://api.coingecko.com/api/v3/global');
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Top gainers/losers
// https://api.cryptorank.io/v0/coins?specialFilter=topLosersFor24h&limit=50
// https://api.cryptorank.io/v0/coins?specialFilter=topGainersFor24h&limit=50
// https://price-api.crypto.com/price/v1/top-movers?direction=-1&depth=5
// https://price-api.crypto.com/price/v1/top-movers?direction=1&depth=5
// https://www.coinex.com/res/quotes/rank/assets?sort_type=change_rate_asc&offset=0&limit=10
// https://www.coinex.com/res/quotes/rank/assets?sort_type=change_rate_desc&offset=0&limit=10
app.get('/api/gainers_losers', async function(req, res) {
    try {
        const res1 = await axios.get('https://price-api.crypto.com/price/v1/top-movers?direction=-1&depth=5');
        // const res2 = await axios.get('https://price-api.crypto.com/price/v1/top-movers?direction=1&depth=5');
        // const data = await res1.json();
        console.log(res1);
        res.status(200).json("OK");
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Trending coins
/*
    https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/trending/most-visited  // does not support endpoint
    https://api.coingecko.com/api/v3/search/trending
    https://http-api.livecoinwatch.com/coins/trending?currency=USD
    https://api.coinmarketcap.com/data-api/v3/topsearch/rank
    https://crypto.com/price/_next/data/yDTlO68jm0m0-gJLPyc0X/en/showroom/trending.json?subLink=trending
*/

app.get('/api/trending', async function(req, res) {
    // const time = new Date().getTime();
    try {  
        const response = await axios.get('https://api.coinmarketcap.com/data-api/v3/topsearch/rank');
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.get('/api/news', async function(req, res) {
    const numPage = req.query.page ? req.query.page : 1;
    try {  
        const response = await axios.get(`https://newsapi.org/v2/everything?q=crypto+bitcoin&pageSize=12&page=${numPage}&apiKey=${process.env.NEWS_API_KEY}`);
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// https://nomics.com/docs/#operation/getGlobalTicker


// Tags
// https://price-api.crypto.com/price/v1/tokens?page=1&limit=50&tags=defi

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: {
			message: error.message,
		},
	});
});

// This route must be appeared after at all other routes
if (process.env.NODE_ENV === 'production') {
	// Serve any static files
    app.use(express.static('client/build'));
	// Handle React routing, return all requests to React app
	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});
}

app.listen(port, () => console.log(`Server started at port ${port}`));