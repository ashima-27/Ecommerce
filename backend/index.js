require("dotenv").config();

const dotenv= require('dotenv')
dotenv.config({ path: './.env' })
const express = require('express');
const app = express();

const port = process.env.PORT || 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');

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





// app.use(
//   session({
//     secret: process.env.SESSION_KEY,
//     resave: false, 
//     saveUninitialized: false, 
//   })
// app.use(passport.authenticate('session'));
// passport.use(
//     'local',
//     new LocalStrategy({ usernameField: 'email' }, async function (
//       email,
//       password,
//       done
//     ) {

//       console.log({ email, password });
//       try {
//         const user = await User.findOne({ email: email });
//         console.log(email, password, user);
//         if (!user) {
//           return done(null, false, { message: 'invalid credentials' }); 
//         }
//         crypto.pbkdf2(
//           password,
//           user.salt,
//           310000,
//           32,
//           'sha256',
//           async function (err, hashedPassword) {
//             if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
//               return done(null, false, { message: 'invalid credentials' });
//             }
//             const token = jwt.sign(
//               sanitizeUser(user),
//               process.env.JWT_SECRET_KEY
//             );
//             done(null, { id: user.id, role: user.role, token }); // this lines sends to serializer
//           }
//         );
//       } catch (err) {
//         done(err);
//       }
//     })
//   );
  
// passport.serializeUser(function (user, cb) {
//     process.nextTick(function () {
//       return cb(null, { id: user.id, role: user.role });
//     });
//   });
  
 
  
//   passport.deserializeUser(function (user, cb) {
//     process.nextTick(function () {
//       return cb(null, user);
//     });
//   });
 
  
app.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
);
app.use(express.json()); // to parse req.body


app.use('/',(req,res)=>{
    res.json('working..')
   
})
require('./models');
app.use('/products',  productsRouter);

app.use('/categories', categoriesRouter);
app.use('/brands',  brandsRouter);
app.use('/users',  usersRouter);
// app.use('/auth', authRouter.router);
app.use('/cart',  cartRouter);
app.use('/orders', ordersRouter);
app.listen(port,()=>{
    console.log('Running on port:',port)
})