const express = require('express');
const router= express.Router();

const brandcontroller=require('../controllers/brandController');


router.get('/',brandcontroller.fetchBrands);
router.post('/',brandcontroller.createBrands)

module.exports=router;