const homeRouter = require('./home');
const userRouter = require('./user');
const itemRouter = require('./item');
const bagRouter = require('./bag');
const favoriteRouter = require('./favorite');
const orderRouter = require('./order');

function route(app) {
    app.use('/bag', bagRouter);
    app.use('/favorite', favoriteRouter);
    app.use('/user', userRouter);
    app.use('/item', itemRouter);
    app.use('/order', orderRouter);
    app.use('/', homeRouter);
}

module.exports = route;
