const express = require('express');
const router= express.Router();

const brandcontroller=require('../controllers/brandController');


router.get('/fetchBrands',brandcontroller.fetchBrands);
router.post('/createBrand',brandcontroller.createBrands)

module.exports=router;