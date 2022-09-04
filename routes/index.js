const productsRouter = require('./products');
const reviewsRouter = require('./reviews');
const usersRouter = require('./users');
const ordersRouter = require('./orders');

function route(app) {
    app.use('/api/v1/products', productsRouter);
    app.use('/api/v1/reviews', reviewsRouter);
    app.use('/api/v1/me', usersRouter);
    app.use('/api/v1/orders', ordersRouter);
}

module.exports = route;