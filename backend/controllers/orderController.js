const Sequelize = require('sequelize')
const Op = Sequelize.Op
var uuid = require('uuid')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { response } = require('express')
const db = require('../models')

const nodemailer = require('nodemailer')
const Cart = require('../models').cart
const Product=require('../models').product
const Order=require('../models').order
const User=require('../models').user
const sequelizeSelect = { type: Sequelize.QueryTypes.SELECT }


async function fetchOrdersByUser(req,res){
    let respObj = {
        isSuccess: false,
        Message: 'Orders Successfully Fetched!',
        Data: null
      }
    try{
        const { id } = req.user;
           
              const orders = await Order.findOne({ user: id });
          
              res.status(200).json(orders);
    }catch(err){
        console.log('error is : ', err)
        respObj.Message = 'Server Error'
        return res.status(400).json(respObj)
    }
}
async function createOrder(req,res){
    let respObj = {
        isSuccess: false,
        Message: 'Order created Successfully !',
        Data: null
      }
    try{
       
  const { items, user: userId, ...orderData } = req.body;



     const order = await Order.create({ ...orderData, userId });

    for (const item of items) {
     
      const product = await Product.findOne({ where: { id: item.product.id }});
      if (!product) {
        throw new Error(`Product with id ${item.product.id} not found`);
      }
      
      await Product.update(
        { stock: product.stock - item.quantity },
        { where: { id: item.product.id } }
      );
    }

  

    // const user = await User.findOne({where:userId})
    // await sendMail({
    //   to: user.email,
    //   html: invoiceTemplate(order),
    //   subject: 'Order Received'
    // });

    res.status(201).json(order);


       
    }catch(err){
        console.log('error is : ', err)
        respObj.Message = 'Server Error'
        return res.status(400).json(respObj)
    }
}
async function deleteOrder(req,res){
    let respObj = {
        isSuccess: false,
        Message: 'Deleted Order Successfully !',
        Data: null
      }
    try{
        const {id} =req.params;

        const order = await Order.findOne({where:id});
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
          }
      
          await order.destroy();
    res.status(200).json(order);
    }catch(err){
        console.log('error is : ', err)
        respObj.Message = 'Server Error'
        return res.status(400).json(respObj)
    }
}
async function updateOrder(req,res){
    let respObj = {
        isSuccess: false,
        Message: 'Order updated Successfully !',
        Data: null
      }
    try{
        const { id } = req.params;
        try {
          const updatedOrder= await Order.update(req.body, {
            where: { id },
            // returning: true,
          });
      
          if (updatedOrder === 0) {
            return res.status(404).json({ error: 'Order not found' });
          }
      
         
      
          res.status(200).json(updatedOrder);
        } catch (err) {
          res.status(400).json(err);
        }
       
    }catch(err){
        console.log('error is : ', err)
        respObj.Message = 'Server Error'
        return res.status(400).json(respObj)
    }
}
async function fetchAllOrders(req,res){
    let respObj = {
        isSuccess: false,
        Message: 'Orders fetched Successfully !',
        Data: null
      }
    try{
       
            const whereCondition = { deleted: { [Op.ne]: true } };
            let order = [];
        
            if (req.query._sort && req.query._order) {
              const orderField = req.query._sort;
              const sortOrder = req.query._order === 'asc' ? 'ASC' : 'DESC';
              order = [[orderField, sortOrder]];
            }
        
            const totalDocs = await Order.count({ where: whereCondition });
        
            if (req.query._page && req.query._limit) {
              const pageSize = parseInt(req.query._limit);
              const page = parseInt(req.query._page);
              const offset = pageSize * (page - 1);
        
              const { rows: docs } = await Order.findAndCountAll({
                where: whereCondition,
                order,
                offset,
                limit: pageSize,
              });
        
              res.set('X-Total-Count', totalDocs);
              res.status(200).json(docs);
            } else {
              const docs = await Order.findAll({
                where: whereCondition,
                order,
              });
        
              res.set('X-Total-Count', totalDocs);
              res.status(200).json(docs);
            }
        
          
    }catch(err){
        console.log('error is : ', err)
        respObj.Message = 'Server Error'
        return res.status(400).json(respObj)
    }
}

module.exports={
   fetchOrdersByUser,
   createOrder,
   deleteOrder,
   updateOrder,
   fetchAllOrders
}












  







  
