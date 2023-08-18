const express = require('express');
const router= express.Router();

const cartcontroller = require('../controllers/cartController');

router.post('/addToCart',cartcontroller.addToCart);
router.get('/fetchCartByUser',cartcontroller.fetchCartByUser);
router.delete('/deleteFromCart/:id',cartcontroller.deleteFromCart);
router.patch('/updateCart/:id',cartcontroller.updateCart)

module.exports=router;