const Sequelize = require('sequelize')
const Op = Sequelize.Op

const jwt = require('jsonwebtoken')
const config = require('../config/config')

const bcrypt = require('bcryptjs')

const User = require('../models').user
const Product = require('../models').product

async function createProduct (req, res) {
  let respObj = {
    isSuccess: false,
    Message: 'Product Created Successfully !',
    Data: null
  }
  const product = new Product(req.body)
  product.discountPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  )
  try {
    const doc = await product.save()

    respObj.Data = doc
    respObj.isSuccess = true
    res.status(200).json({ respObj })
  } catch (err) {
    console.log('error is : ', err)
    let Message = 'Server Error'
    return res.status(400).json(Message)
  }
}
async function fetchProductById (req, res) {
  let respObj = {
    isSuccess: false,
    Message: 'Products fetched Successfully !',
    Data: null
  }
  try {
    console.log('Im here')
    const { id } = req.params

    const product = await Product.findOne({ where: id })
    res.status(200).json(product)
  } catch (err) {
    console.log('error is : ', err)
    let Message = 'Server Error'
    return res.status(400).json(Message)
  }
}
async function fetchAllProducts (req, res) {
  let respObj = {
    isSuccess: false,
    Message: 'Product fetched Successfully !',
    Data: null
  }
  try {
    let condition = {}
    if (!req.query.admin) {
      condition.deleted = { [Op.ne]: true }
    }

    let queryOptions = {
      where: condition
    }

    if (req.query.category) {
      queryOptions.where.category = { [Op.in]: req.query.category.split(',') }
    }
    if (req.query.brand) {
      queryOptions.where.brand = { [Op.in]: req.query.brand.split(',') }
    }
    if (req.query._sort && req.query._order) {
      queryOptions.order = [[req.query._sort, req.query._order]]
    }

    const totalDocs = await Product.count(queryOptions)

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit)
      const page = parseInt(req.query._page)
      queryOptions.limit = pageSize
      queryOptions.offset = pageSize * (page - 1)
    }
    const docs = await Product.findAll(queryOptions)

    res.setHeader('X-Total-Count', totalDocs)
    res.status(200).json(docs)
  } catch (err) {
    console.log('error is : ', err)
    let Message = 'Server Error'
    return res.status(400).json(Message)
  }
}
async function updateProduct (req, res) {
  let respObj = {
    isSuccess: false,
    Message: 'Product updated Successfully !',
    Data: null
  }
  try {
    console.log('Im here')
    const { id } = req.params

    const product = await Product.findOne({
      where: id
    })
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    product.discountPrice = Math.round(
      product.price * (1 - product.discountPercentage / 100)
    )
    const updatedProduct = await product.save()

    respObj.Data = updatedProduct
    respObj.isSuccess = true
    res.status(200).json({ respObj })
  } catch (err) {
    console.log('error is : ', err)
    let Message = 'Server Error'
    return res.status(400).json(Message)
  }
}
module.exports = {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct
}
