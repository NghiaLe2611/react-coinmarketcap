const usersRouter = require('./users');

function route(app) {
    app.use('/api/v1/me', usersRouter);
}

module.exports = route;