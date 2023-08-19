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
const Brand = require('../models').brand
const sequelizeSelect = { type: Sequelize.QueryTypes.SELECT }

async function fetchBrands (req, res) {
    let respObj = {
      isSuccess: false,
      Message: 'Brands Fetched Successfully !',
      Data: null
    }
    try {
        const brand = await Brand.findAll()
        respObj.Data = brand
        respObj.isSuccess = true
        return res.status(200).json(respObj)
    }catch (err) {
        console.log('error is : ', err)
        let Message = 'Server Error'
        return res.status(400).json(Message)
      }
    }

    async function createBrands (req, res) {
        let respObj = {
          isSuccess: false,
          Message: 'Brands Created Successfully !',
          Data: null
        }
        try {
          const{label,value}=req.body
            const brand = await Brand.create({
              label,value
            })

            res.status(201).json(brand)
        }catch (err) {
            console.log('error is : ', err)
            let Message = 'Server Error'
            return res.status(400).json(Message)
          }
        }

        
        module.exports={
fetchBrands,
createBrands
        }
























// exports.fetchBrands = async (req, res) => {
//     try {
//       const brands = await Brand.find({}).exec();
//       res.status(200).json(brands);
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   };
  
//   exports.createBrand = async (req, res) => {
//     const brand = new Brand(req.body);
//     try {
//       const doc = await brand.save();
//       res.status(201).json(doc);
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   };