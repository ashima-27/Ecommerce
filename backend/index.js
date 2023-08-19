require("dotenv").config();

const dotenv= require('dotenv')
dotenv.config({ path: './.env' })
const express = require('express');
const app = express();

const port = process.env.PORT || 4000;
const cors = require("cors");
const bodyParser = require("body-parser");


const productsRouter = require('./routes/Product');
const categoriesRouter = require('./routes/Category');
const brandsRouter = require('./routes/Brand');
const usersRouter = require('./routes/User');
// const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');

const User=require('./models').user;
var LocalStrategy = require('passport-local');
const env = process.env.NODE_STATE || 'production';
const config = require(__dirname + '/./config/config.js')[env];


app.use(cors());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));





app.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
);
app.use(express.json()); // to parse req.body


require('./models');
app.use('/products',  productsRouter);

app.use('/categories', categoriesRouter);
app.use('/brands',  brandsRouter);
app.use('/users',  usersRouter);
const usercontroller =require('./controllers/userController');
app.post('/users/createUser', usercontroller.createUser);

app.post('/users/fetchUserById/:email', usercontroller.fetchUserById);

// app.use('/auth', authRouter.router);
app.use('/cart',  cartRouter);
app.use('/orders', ordersRouter);

// app.use('/',(req,res)=>{
//   res.json('working..')
 
// })
app.listen(port,()=>{
    console.log('Running on port:',port)
})