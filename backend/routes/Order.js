const express = require('express');
const router= express.Router();

const ordercontroller =require('../controllers/orderController');

router.post('/createOrder',ordercontroller.createOrder);
router.get('/own',ordercontroller.fetchOrdersByUser);
router.delete('/:id',ordercontroller.deleteOrder);
router.patch('/:id',ordercontroller.updateOrder);
router.get('/',ordercontroller.fetchAllOrders);

module.exports = router;