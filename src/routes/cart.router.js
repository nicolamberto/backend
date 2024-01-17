import { Router } from "express";
import CartManager from '../CartManager.js'
import cartDao from "../daos/dbManager/cart.dao.js";
import productDao from '../daos/dbManager/product.dao.js'
import mongoose from "mongoose";


const router = Router()

const manager = new CartManager("./Carts.json")

router.get('/', async (req, res) => {
    try {
        const carts = await cartDao.getCarts()
        return res.status(200).json({ message: 'CARTS', carts });
    } catch (error) {
        return res.status(500).json({ error: error })
    }
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await manager.getOneCart(+cid)
        return res.status(200).json({ message: 'Cart', cart })
    } catch (error) {
        return res.status(500).json({ error })
    }
})


router.post('/', async (req, res) => {
    try {
        const cart = req.body
        const response = await cartDao.createCart(cart)
        return res.status(200).json({ message: 'OK', cart: response })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
})

router.post('/:cid/products/:pid', async (req, res) => {

    try {
        const { cid, pid } = req.params
        const product = await productDao.getProductById(pid)
        const cart = await cartDao.getCartById(cid)
        if (product == null || cart == null) {
            return res.status(404).json("Producto Inexistente")
        } else {

            if (cart.products.some((e) => e.product._id == product._id)) {
                let index = cart.products.findIndex((e) => e.product._id == product._id)
                cart.products[index].quantity += 1
            }
            else {
                cart.products.push({ product: product._id })

            }
            const addedProduct = cartDao.updateCart(cart._id, cart)
            res.status(200).json(addedProduct)
        }

    } catch (error) {
        res.status(500).json({ error: error })

    }
})


router.put('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        let cart = await cartDao.getCartById(cid)
        let products = req.body
        products.forEach((e) => {
            if (cart.products.findIndex((p) => p.product == e._id) != -1) {
                cart.products[cart.products.findIndex((p) => p.product == e._id)].quantity += e.quantity
            } else {
                cart.products.push({ product: e._id, quantity: e.quantity })
            }

        })
        const addedProduct = cartDao.updateCart(cart._id, cart)
        res.status(200).json(addedProduct)
    } catch (error) {
        res.status(500).json({ error: error })
    }


})

router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    try {
        let cart = await cartDao.getCartById(cid)
        const product = await productDao.getProductById(pid)
        if (cart.products.some((e) => e.product._id.toString() == product._id)) {
            let index = cart.products.findIndex((e) => e.product._id.toString() == product._id)
            cart.products[index].quantity = req.body.quantity
            const addedProduct = cartDao.updateCart(cart._id, cart)
            res.status(200).json(addedProduct)
        }

    } catch (error) {
        res.status(500).json({ error: error })
    }
})


router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    try {
        let cart = await cartDao.getCartById(cid)
        let newCart = cart.products.filter((i) => i.product._id === pid)
        cart.products = newCart
        let updatedCart = await cartDao.updateCart(cid, cart)
        return res.json({ message: 'Product deleted', newCart })
    } catch (error) {
        return res.json(500).json({ error: error })
    }
})

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        let deleted = await cartDao.getCartById(cid)
        deleted.products = []
        let updatedCart = cartDao.updateCart(cid, deleted)
        res.status(201).json(deleted.message)
    }
    catch (error) {
        res.status(500).json({ error: error })
    }

})


export default router