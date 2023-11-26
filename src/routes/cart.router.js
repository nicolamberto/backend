import { Router } from "express";
import CartManager from '../CartManager.js'


const router = Router()

const manager = new CartManager("./Carts.json")

router.get('/:cid', async(req, res)=>{
    const {cid} = req.params 
    try {
       const cart = await manager.getOneCart(+cid)
       res.status(200).json({message:'Cart', cart})
    } catch (error) {
        res.status(500).json({error})
    }
})


router.post('/', async (req, res)=>{
    try {
        const createCart = await manager.createCart()
        res.status(200).json({message:'Cart', cart:createCart})
    } catch (error) {
        res.status(500).json({error})
    }
})


router.post('/:idCart/products/:idProduct', async (req, res)=>{
    const {idCart, idProduct} = req.params
    try {
        const addProduct = await CartManager.addProduct(+idCart, +idProduct)
        res.status(200).json({message:'Product-Cart', product:addProduct})
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router