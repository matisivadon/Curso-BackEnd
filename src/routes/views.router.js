import {Router}from 'express'
import { ProductManager } from '../product-manager.js'

const newProduct = new ProductManager

const router = Router()

router.post('/', async (req,res) => {
    const {title, description, price, thumbnail, code,stock} = req.body
    const product = await newProduct.addProducts(title, description, price, thumbnail, code,stock)
    res.json({product})
})

router.get('/', async (req,res) => {
    const products = await newProduct.getProducts('max')
    res.render('home', {products})
})

export default router