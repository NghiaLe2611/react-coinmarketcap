const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;
const axios = require('axios');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/status', function(req, res) {
    return res.status(200).json({
        status: true
    })
});

app.get('/api/global_metrics', async function(req, res) {
    try {
        // https://sandbox-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/historical
        // https://pro-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/historical
        const response = await axios.get('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest', {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.CMC_KEY,
            },
        });
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

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