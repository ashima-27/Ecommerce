const Sequelize = require('sequelize')


const jwt = require('jsonwebtoken')
const config = require('../config/config')

const db = require('../models')

const bcrypt = require('bcryptjs')

const nodemailer = require('nodemailer')
const User = require('../models').user

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lifestyle2267@gmail.com',
    pass: 'ejzbpvkvndqvfeow'
  }
})
// async function createUser (req, res) {
//   let respObj = {
//     isSuccess: false,
//     Message: 'User Created Successfully !',
//     Data: null
//   }
//   try {
//     console.log('Im here')
//     const { email, password, confirmPassword } = req.body
//   console.log(req.body)
//     const existingUser = await User.findOne({ where: { email} })
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' })
//     }

//      const hashedPassword = await bcrypt.hash(password, 10)

//     const newUser = await User.create({
//       email,
//       password: hashedPassword,
//       confirmPassword: hashedPassword
//     })
   

//       const token = jwt.sign({ id: newUser.id }, config.secretKey, {
//         expiresIn: config.expiresIn,
//       });
//     respObj.Data = token
//     respObj.isSuccess = true
//      res.status(200).json({respObj});
//   } catch (err) {
//     console.log('error is : ', err)
//     let Message = 'Server Error'
//     return res.status(400).json(Message)
//   }
// }
async function createUser(req, res) {
  try {
    const { email, password, confirmPassword } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with hashed password
    const newUser = await User.create({
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    if (!config.secretKey) {
      throw new Error('JWT secret key is missing or invalid');
    }
    console.log(config.secretKey)
    // Sign the JWT token
    const token = jwt.sign({ id: newUser.id }, config.secretKey, {
      expiresIn: config.expiresIn,
    });

    // Prepare the response
    const respObj = {
      isSuccess: true,
      Message: 'User Created Successfully!',
      Data: token,
    };

    // Send the response
    res.status(200).json(respObj);
  } catch (err) {
    console.error('Error creating user:', err);
    const respObj = {
      isSuccess: false,
      Message: 'Server Error',
      Data: null,
    };
    res.status(500).json(respObj);
  }
}


async function fetchUserById (req, res) {
  let respObj = {
    isSuccess: false,
    Message: 'User Found Successfully !',
    Data: null
  }
  try {
    const {email}=req.params
    const { password } = req.body
    let user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("matched???", passwordMatch)
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.email }, config.secretKey, {
      expiresIn: config.expiresIn,
    });
    respObj.Data = token
    respObj.isSuccess = true
    return res.status(200).json({respObj})
  } catch (err) {
    console.log('error is : ', err)
    respObj.Message = 'Server Error'
    return res.status(400).json(respObj)
  }
}

async function chngpassword (req, res) {
  const { token } = req.params
  const { newPassword } = req.body
  console.log('for:', token)

  try {
    console.log('chngpassword', token, req.body)

    const user = await User.findOne({
      where: { emailId: token },
      attributes: ['userId', 'password', 'emailId', 'confirmPassword']
    })

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' })
    }

    user.password = newPassword
    user.confirmPassword = newPassword

    await user.save()

    return res.status(200).json({ message: 'Password reset successful' })
  } catch (error) {
    console.error('Password reset error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
};

async function updateUser(req,res){
  let respObj = {
    isSuccess: false,
    Message: 'User updated Successfully !',
    Data: null
  }
  try {
    console.log('Im here')
    const { email } = req.params
   let obj={
      name:req.body.name,
      phone :req.body.phone,
      street:req.body.street,
      city:req.body.city,
      zip:req.body.zip,
      state:req.body.state
            
   }
    const user = await User.findOne({
      where: {email:email}
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    
    const updatedUser = await User.update(obj,{
      where: {email:email}
    })

    respObj.Data = updatedUser
    respObj.isSuccess = true
    res.status(200).json({ respObj })
  } catch (err) {
    console.log('error is : ', err)
    let Message = 'Server Error'
    return res.status(400).json(Message)
  }
}
async function forgetpass (req, res) {
  const { id } = req.body
  console.log('forgetpass:', req.params.email)
  console.log(id)
  try {
    const existingUser = await User.findOne({
      where: { email: req.params.email }
    })
    if (existingUser) {
      const token = req.params.email
      // const token = req.body.userId;
      console.log('id', token)

      const mailOptions = {
        from: 'lifestyle2267@gmail.com',
        to: req.params.email,
        subject: 'Password Reset',
        text:
          'You are receiving this email because you requested a password reset.\n\n' +
          'Please click the following link to reset your password:\n\n' +
          `${req.protocol}://localhost:3000/reset-password?token=${token}`
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error)
          return res
            .status(500)
            .json({ error: 'Failed to send password reset email' })
        }

        console.log('Password reset email sent:', info.response)
        return res
          .status(200)
          .json({ message: 'Password reset email sent successfully' })
      })
    } else {
      res.status(500).json({ message: 'Please enter correct credentials' })
    }
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
module.exports = {
  createUser,
  fetchUserById,
  chngpassword,
  forgetpass,
  updateUser
}
