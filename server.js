const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;
const axios = require('axios');
const app = express();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const CACHE_TIME_1H = 60*60;
const CACHE_TIME_8H = 60*60*8;
const CACHE_TIME_1D = 60*60*24;

// Cache data
const nodeCache = require('node-cache');
const myCache = new nodeCache({stdTTL: CACHE_TIME_1H});

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/api/status', function (req, res) {
	return res.status(200).json({
		success: true,
	});
});

// Coin list
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true
app.get('/api/coin_list', async function (req, res) {
	const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 100;

	try {
		const response = await axios.get(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&page=${page}`,
		);
		return res.status(200).json(response.data);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// Global metrics
app.get('/api/global_metrics', async function (req, res) {
    let globalMetrics = myCache.get('global_metrics');

    if (!globalMetrics) {
        console.log('Chua co globalMetrics');
        try {
            // https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest
            const response = await axios.get('https://api.coinmarketcap.com/data-api/v3/global-metrics/quotes/latest', {
				// headers: {
				// 	'X-CMC_PRO_API_KEY': process.env.CMC_KEY,
				// },
			});
            globalMetrics = response.data;
            myCache.set('global_metrics', globalMetrics, CACHE_TIME_8H);
            return res.status(200).json(globalMetrics);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        console.log('Co globalMetrics');
        return res.status(200).json(globalMetrics);
    }

	// try {
	// 	const response = await axios.get('https://api.coingecko.com/api/v3/global');
	// 	return res.status(200).json(response.data);
	// } catch (err) {
	// 	return res.status(500).json(err);
	// }
});

// Top gainers/losers
// https://api.cryptorank.io/v0/coins?specialFilter=topLosersFor24h&limit=50
// https://api.cryptorank.io/v0/coins?specialFilter=topGainersFor24h&limit=50
// https://price-api.crypto.com/price/v1/top-movers?direction=-1&depth=5
// https://price-api.crypto.com/price/v1/top-movers?direction=1&depth=5
// https://www.coinex.com/res/quotes/rank/assets?sort_type=change_rate_asc&offset=0&limit=10
// https://www.coinex.com/res/quotes/rank/assets?sort_type=change_rate_desc&offset=0&limit=10
app.get('/api/top_gainers_losers', async function (req, res) {

    let topGainersLosers = myCache.get('top_gainers_losers');

    if (!topGainersLosers) {
        console.log('Chua co topGainersLosers');
        try {
            const response = await axios.get('https://coincheckup.com/api/coincodex/get_metadata');
            const data = {
                top_gainers: response.data['top_20_gainers'],
                top_losers: response.data['top_20_losers']
            }
            topGainersLosers = data;
            myCache.set('top_gainers_losers', topGainersLosers, CACHE_TIME_1D);
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        console.log('Co topGainersLosers');
        return res.status(200).json(topGainersLosers);
    }
});

// Trending coins
/*
    https://api.coingecko.com/api/v3/search/trending
    https://http-api.livecoinwatch.com/coins/trending?currency=USD
    https://crypto.com/price/_next/data/yDTlO68jm0m0-gJLPyc0X/en/showroom/trending.json?subLink=trending
*/
app.get('/api/trending', async function (req, res) {
	let trendingCoins = myCache.get('trending_coins');

    if (!trendingCoins) {
        console.log('Chua co trendingCoins');
        try {
            const response = await axios.get('https://api.coinmarketcap.com/data-api/v3/topsearch/rank');
            trendingCoins = response.data;
            myCache.set('trending_coins', trendingCoins, CACHE_TIME_1D);
            return res.status(200).json(trendingCoins);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        console.log('Co trendingCoins');
        return res.status(200).json(trendingCoins);
    }

	// try {
	// 	const response = await axios.get('https://api.coinmarketcap.com/data-api/v3/topsearch/rank');
	// 	return res.status(200).json(response.data);
	// } catch (err) {
	// 	return res.status(500).json(err);
	// }
});

// Get news
// https://api.coinstats.app/public/v1/news?skip=0&limit=10
app.get('/api/news', async function (req, res) {
	const numPage = req.query.page ? req.query.page : 1;
	try {
		const response = await axios.get(`https://newsapi.org/v2/everything?q=crypto+bitcoin&pageSize=12&page=${numPage}&apiKey=${process.env.NEWS_API_KEY}`);
		return res.status(200).json(response.data);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// https://nomics.com/docs/#operation/getGlobalTicker

// Tags/Categories

// List category from CMC
// https://api.coingecko.com/api/v3/coins/categories
// https://api.coingecko.com/api/v3/coins/categories/list
async function getCategories() {
	const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/categories', {
		headers: {
			'X-CMC_PRO_API_KEY': process.env.CMC_KEY,
		},
	});

    if (response.data.status.error_message !== null) {
		// throw new Error(response.statusText);
		return {
			status: 'error',
		};
	}

	return response.data;
};

// Get list category
app.get('/api/categories', async function (req, res) {
    let categories = myCache.get('crypto_categories');

    if (!categories) {
        console.log('Chua co categories');
        try {
            categories = await getCategories();
			myCache.set('crypto_categories', categories, CACHE_TIME_1D);
            return res.status(200).json(categories);
        } catch(err) {
            return res.status(500).json(err);
        }
    } else {
        console.log('Co categories');
        return res.status(200).json(categories);
    }
});

// https://price-api.crypto.com/price/v1/tokens?page=1&limit=50&tags=defi
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=orchid-protocol,ethereum&order=market_cap_desc&per_page=250&page=1&sparkline=true
app.get('/api/category', async function (req, res) {
	const categoryId = req.query.id;
	if (!categoryId) {
		return res.status(404).json({
			status: 'error',
			message: 'Category not found',
			data: [],
		});
	}

    let cachedCategoryId = myCache.get(`category_id_${categoryId}`);

    if (!cachedCategoryId) {
        console.log('Chua co categoryId ' + categoryId);
        try {
            const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/category?id=${categoryId}&limit=1000`, {
				headers: {
					'X-CMC_PRO_API_KEY': process.env.CMC_KEY,
				},
			});
            cachedCategoryId = response.data;
            myCache.set(`category_id_${categoryId}`, cachedCategoryId, CACHE_TIME_1D);
            return res.status(200).json(cachedCategoryId);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        console.log('Co categoryId ' + categoryId);
        return res.status(200).json(cachedCategoryId);
    }
    
	// try {
	// 	// const response = await axios.get(`https://api.coinranking.com/v2/coins?tags[]=${tagName}`);
    //     const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/category?id=${categoryId}&limit=1000`, {
	// 		headers: {
	// 			'X-CMC_PRO_API_KEY': process.env.CMC_KEY,
	// 		},
	// 	});
	// 	return res.status(200).json(response.data);
	// } catch (err) {
	// 	return res.status(500).json(err);
	// }
});

app.get('/api/cate_by_id', async function (req, res) {
	try {
		const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/category?id=5fb62883c9ddcc213ed13308&limit=1000', {
			headers: {
				'X-CMC_PRO_API_KEY': process.env.CMC_KEY,
			},
		});
		return res.status(200).json(response.data);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// Handle erros msg
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
