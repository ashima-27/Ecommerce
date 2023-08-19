const Sequelize = require('sequelize')
const Op = Sequelize.Op
var uuid = require('uuid')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { response } = require('express')
const db = require('../models')
const moment = require('moment')
const bcrypt = require('bcryptjs')
const axios = require('axios')
const qs = require('querystring')
const nodemailer = require('nodemailer')
const Cart = require('../models').cart
const Product = require('../models').product
const User=require('../models').user
const sequelizeSelect = { type: Sequelize.QueryTypes.SELECT }


async function fetchCartByUser(req, res) {
  let respObj = {
    isSuccess: false,
    Message: 'Cart Fetched Successfully !',
    Data: null
  }
  try {
    const { id } = req.users;
    const cartItems = await Cart.findOne({ userId: id }).populate('product');

    res.status(200).json(cartItems);
  } catch (err) {
    console.log('error is : ', err)
    respObj.Message = 'Server Error'
    return res.status(400).json(respObj)
  }
}

async function addToCart(req, res) {
  let respObj = {
    isSuccess: false,
    Message: 'Added To Cart Successfully !',
    Data: null
  }
//   const { id } = req.params;
//   console.log(req.params)
//   const { product, quantity } = req.body;
//   console.log(req.body)
//   try {

//     const cartItem = await Cart.create({
     
//       product: product,
//       quantity: quantity,
//     });


//     const result = await Product.findOne({ where: product });

//     if (!result) {
//       return res.status(404).json({ error: 'Product not found' });
//     }


//     cartItem.product = result;

//     res.status(201).json(cartItem);



//   } catch (err) {
//     console.log('error is : ', err)
//     respObj.Message = 'Server Error'
//     return res.status(400).json(respObj)
//   }
  try {
    const { userId, productId,quantity } = req.body;

    // Find user and product based on IDs
    const user = await User.findOne({where:{id:userId}});
    const product= await Product.findOne({where:{id:productId}});

    if (!user || !product) {
      return res.status(404).json({ message: 'User or Product not found' });
    }

    // Add the product to the user's cart
    const cartItem = await Cart.create({
      userId: user.id,
     productId: product.id,
     quantity:quantity
    });

    return res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}
async function deleteFromCart(req, res) {
  let respObj = {
    isSuccess: false,
    Message: 'Deleted Successfully !',
    Data: null
  }
  try {
    const { id } = req.params;

    const cartItem = await Cart.findOne({ where: id });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await cartItem.destroy();

    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (err) {
    console.log('error is : ', err)
    respObj.Message = 'Server Error'
    return res.status(400).json(respObj)
  }
}

async function updateCart(req, res) {
  let respObj = {
    isSuccess: false,
    Message: 'Cart updated Successfully !',
    Data: null
  }
  try {



    const { id } = req.params;


    const cartItem = await Cart.findOne({ where: id });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await cartItem.update(req.body);


    const updatedCartItem = await Cart.findOne({ where: id }, { include: [Product] });

    res.status(200).json(updatedCartItem);


  } catch (err) {
    console.log('error is : ', err)
    respObj.Message = 'Server Error'
    return res.status(400).json(respObj)
  }
}


module.exports = {
  fetchCartByUser,
  addToCart,
  deleteFromCart,
  updateCart
}













