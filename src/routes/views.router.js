import {Router} from 'express'
import productDao from '../daos/dbManager/product.dao.js'
import cartDao from '../daos/dbManager/cart.dao.js'
const router = Router()

router.get('/',async (req,res)=>{
    const { limit,page,query,sort } = req.query
    const productos = await productDao.getAllProducts(limit, page, query, sort);
    
    res.render("products",{productos, user:req.session.user})
})

router.get('/carts/:cid',async (req,res)=>{
    const {cid} = req.params
    const productos = await cartDao.getProductsFromCart(cid)
    console.log(productos)
    res.render("cart",{productos})
})
export default router