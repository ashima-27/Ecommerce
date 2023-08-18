const express = require('express');
const router= express.Router();

const usercontroller =require('../controllers/userController');

router.post('/createUser',usercontroller.createUser);
router.get('/fetchUserById/:emailId',usercontroller.fetchUserById);
router.post('/forgetpass/:emailId',usercontroller.forgetpass);
router.post('/chngpassword/:token',usercontroller.chngpassword);
module.exports=router;