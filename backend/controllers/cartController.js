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
const Product=require('../models').product
const sequelizeSelect = { type: Sequelize.QueryTypes.SELECT }


async function fetchCartByUser(req,res){
    let respObj = {
        isSuccess: false,
        Message: 'Cart Fetched Successfully !',
        Data: null
      }
    try{
        const {id}=req.users;
        const cartItems = await Cart.findOne({ users: id }).populate('product');
  
              res.status(200).json(cartItems);
    }catch(err){
        console.log('error is : ', err)
        respObj.Message = 'Server Error'
        return res.status(400).json(respObj)
    }
}

async function addToCart(req,res){
    let respObj = {
        isSuccess: false,
        Message: 'Added To Cart Successfully !',
        Data: null
      }
      const { id } = req.users;
          const { productId, quantity } = req.body;
    try{
       

      
            
            const cartItem = await Cart.create({
              userId: id,
              productId: productId,
              quantity: quantity,
            });
        
            
            const product = await Product.findOne({where:productId});
        
            if (!product) {
              return res.status(404).json({ error: 'Product not found' });
            }
        
           
            cartItem.product = product;
        
            res.status(201).json(cartItem);
          
        

    }catch(err){
        console.log('error is : ', err)
        respObj.Message = 'Server Error'
        return res.status(400).json(respObj)
    }
}
async function deleteFromCart(req,res){
    let respObj = {
        isSuccess: false,
        Message: 'Deleted Successfully !',
        Data: null
      }
    try{
        const { id } = req.params;
       
          const cartItem = await Cart.findOne({where:id});
      
          if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
          }
      
          await cartItem.destroy();
      
          res.status(200).json({ message: 'Cart item deleted successfully' });
    }catch(err){
        console.log('error is : ', err)
        respObj.Message = 'Server Error'
        return res.status(400).json(respObj)
    }
}

async function updateCart(req,res){
    let respObj = {
        isSuccess: false,
        Message: 'Cart updated Successfully !',
        Data: null
      }
    try{
       

      
          const { id } = req.params;
        
       
            const cartItem = await Cart.findOne({where:id});
        
            if (!cartItem) {
              return res.status(404).json({ error: 'Cart item not found' });
            }
        
            await cartItem.update(req.body);
        
           
            const updatedCartItem = await Cart.findOne({where:id}, { include: [Product] });
        
            res.status(200).json(updatedCartItem);
               
        
    }catch(err){
        console.log('error is : ', err)
        respObj.Message = 'Server Error'
        return res.status(400).json(respObj)
    }
}


module.exports={
    fetchCartByUser,
    addToCart,
    deleteFromCart,
    updateCart
}















  
