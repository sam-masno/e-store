module.exports = app => {
    app.use(require('./auth'));
    app.use(require('./userRoutes'));
    app.use(require('./productRoutes'));
    app.use(require('./categoryRoutes'));
    app.use(require('./paymentRoutes'));
    app.use(require('./orderRoutes'));

}