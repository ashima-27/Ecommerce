const express = require('express');
const router= express.Router();

const productcontroller =require('../controllers/productController');


router.post('/createProduct',productcontroller.createProduct);
router.get('/fetchAllProducts',productcontroller.fetchAllProducts);
router.get('/fetchProductById/:id',productcontroller.fetchProductById);
router.patch('/updateProduct/:id',productcontroller.updateProduct);
module.exports=router;