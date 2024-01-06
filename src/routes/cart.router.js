import { Router } from "express";
import CartManager from '../CartManager.js'
import cartDao from "../daos/dbManager/cart.dao.js";


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

export default router