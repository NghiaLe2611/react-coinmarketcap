const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
    app.use(express.static('client/build'));
	// Handle React routing, return all requests to React app
	app.get('*', function (req, res) {
		res.sendFile(path.join('client', 'build', 'index.html'));
	});
}

app.get('/api/status', function(req, res) {
    return res.status(200).json({
        status: true
    })
});

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: {
			message: error.message,
		},
	});
});

app.listen(port, () => console.log(`Server started at port ${port}`));