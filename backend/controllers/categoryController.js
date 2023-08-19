const Sequelize = require('sequelize')
const Op = Sequelize.Op
var uuid = require('uuid')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { response } = require('express')
const db = require('../models')
const moment = require('moment')
const bcrypt = require('bcryptjs')
const axios = require('axios')
const qs = require('querystring')
const nodemailer = require('nodemailer')
const Category = require('../models').category
const sequelizeSelect = { type: Sequelize.QueryTypes.SELECT }

async function fetchCategories (req, res) {
  let respObj = {
    isSuccess: false,
    Message: 'Category fetched successfully!',
    Data: null
  }
  try {
    const categories = await Category.findAll()
    respObj.Data = categories
    respObj.isSuccess = true
    return res.status(200).json(respObj)
  } catch (err) {
    console.log('error is : ', err)
    let Message = 'Server Error'
    return res.status(400).json(Message)
  }
}

async function createCategory(req, res) {
  let respObj = {
    isSuccess: false,
    Message: 'Category created Successfully !',
    Data: null
  };
  try {
    const { label, value } = req.body;
    console.log(req.body);

    // Create a new category using the Category model
    const category = await Category.create({ label, value });

    respObj.Data = category
    respObj.isSuccess = true
     res.status(200).json(category);
  } catch (err) {
    console.log('error is : ', err);
    let Message = 'Server Error';
    return res.status(400).json(Message);
  }
}


module.exports = {
  fetchCategories,
  createCategory
}
