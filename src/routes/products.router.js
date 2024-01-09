import { Router } from "express";
import ProductManager from '../ProductManager.js'
import { Product } from "../ProductManager.js";
import productDao from "../daos/dbManager/product.dao.js";
import { productModel } from "../models/product.model.js";
const router = Router()

const manager = new ProductManager("./Products.json")

router.get('/', async (req, res) => {
    const { page, limit, query, sort } = req.query
    try {
        const products = await productDao.getAllProducts(page, limit, query, sort)
        res.status(200).json({message: 'OK', products})
    } catch (error) {
        return error
    }
})


router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const products = productDao.getProductById(pid)
    if (product) {
        return res.json(product)
    }
    res.json({ error: "product not found" })
})


router.post('/', async (req, res) => {
    try {
        const product = req.body
        const response = await productDao.createProduct(product)
        res.json({
            message: 'OK',
            response
        })

    } catch (error) {
        return error
    }
})


router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = req.body

        const response = await productDao.updateProduct(pid, product)
        return res.json({
            message: 'OK',
            response,
        })

    } catch (error) {
        return error
    }
})


router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const response = await productDao.deleteProduct(pid)
        res.status(200).json({ message: 'Product deleted.', response })
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router