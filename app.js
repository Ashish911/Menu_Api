const express = require('express');
const app = express();
require('./db/mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const CategoryRouter = require('./routes/categoryroute');
const FoodRouter = require('./routes/foodroute');
const TableRouter = require('./routes/tableroute');

app.use(morgan('dev'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/category', CategoryRouter);
app.use('/food', FoodRouter);
app.use('/table', TableRouter);
app.use('/upload', express.static(__dirname + '/upload/Images'));

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running at localhost: ${port}`);
});
