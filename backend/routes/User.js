const express = require('express');
const router= express.Router();

const usercontroller =require('../controllers/userController');

router.post('/createUser',usercontroller.createUser);
router.post('/fetchUserById/:email',usercontroller.fetchUserById);
router.post('/forgetpass/:email',usercontroller.forgetpass);
router.post('/chngpassword/:token',usercontroller.chngpassword);
router.post('/updateUser/:email',usercontroller.updateUser);
module.exports=router;