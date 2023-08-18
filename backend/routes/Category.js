const express = require('express');
const router= express.Router();

const categorycontroller=require('../controllers/categoryController');

router.get('/fetchCategory',categorycontroller.fetchCategories);
router.post('/createCategory',categorycontroller.createCategory);

module.exports = router;