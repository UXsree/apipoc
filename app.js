const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//this block is to override CORS errors...
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', '*'); //instead of * we can give the site name also
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();       //to make sure other routes can follow.
})

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//throwing error using morgan
app.use((req, res, next)=>{
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
    error:{
      message:error.message
    }
  });
});

module.exports = app;
