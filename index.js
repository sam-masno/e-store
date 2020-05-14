const express = require('express');
const app = express();
require('dotenv').config()
require('./services/db');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload')

//apply middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(cookieParser());
// parse file uploads for images
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

//apply routes
require('./routes/Router')(app)


if (process.env.NODE_ENV === 'production' ) {
  app.use(express.static('client/build'));
  const path = require('path');
  app.use('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.use(( err, req, res, next) => {
    const { message, status } = err;
    res.status( status || 500).send({ message : message || 'Server error'})
})

//apply app
app.listen(process.env.PORT || 5000, () => console.log( 'Server running'))