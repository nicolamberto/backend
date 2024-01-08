import { Router } from "express";
import CartManager from '../CartManager.js'
import cartDao from "../daos/dbManager/cart.dao.js";
import mongoose from "mongoose";


const router = Router()

const manager = new CartManager("./Carts.json")

router.get('/', async (req, res)=>{
    try {
        const carts = await cartDao.getCarts()
        return res.status(200).json({message:'CARTS', carts});
    } catch (error) {
        return error
    }
})

router.get('/:cid', async(req, res)=>{
    const {cid} = req.params 
    try {
       const cart = await manager.getOneCart(+cid)
       return res.status(200).json({message:'Cart', cart})
    } catch (error) {
        return res.status(500).json({error})
    }
})

router.delete('/:cid', async (req, res)=>{
    const {cid} = req.params
    try {
        const cart = await cartDao.deleteProduct(cid)
        return res.json({message:'cart deleted', cart})
    } catch (error) {
        return error
    }
})

router.post('/', async (req, res)=>{
    try {
        const cart = req.body
        const response = await cartDao.createCart(cart)
        return res.status(200).json({message:'OK', cart: response})
    } catch (error) {
        return res.status(500).json({error})
    }
})


router.post('/:idCart/product/:idProduct', async (req, res)=>{
    const {idCart, idProduct} = req.params
    console.log(req.params);
    try {
        const addProduct = await manager.addProduct(Number(idCart), Number(idProduct))
        return res.status(200).json({message:'Product-Cart', product:addProduct})
    } catch (error) {
        return res.status(500).json({message: error })
        
    }
})

router.delete('/:cid/products/:pid', async (req, res)=>{
    const {cid, pid} = req.params
    try {
        let cart = await cartDao.getCartById(cid)
        cart.products.deleteOne(pid)
        //const newCart = cart.products.filter(i=> i.product === pid)
        return res.json({message:'Product deleted', cart})
    } catch (error) {
        return error
    }
})

export default router