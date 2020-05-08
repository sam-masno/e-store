const express = require('express');
const app = express();
require('dotenv').config()
require('./services/db');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');


//apply middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//apply routes
app.use(authRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(paymentRoutes);
app.use(orderRoutes);

app.use(( err, req, res, next) => {
    const { message, status } = err
    res.status( status || 500).send({ message : message || 'Server error'})
})

//apply app
const port = process.env.PORT || 5000
app.listen(port, () => console.log( 'Server listening on port ' + port ))