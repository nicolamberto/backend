import { Router } from "express";
import ProductManager from '../ProductManager.js'

const router = Router()

const manager = new ProductManager("./Products.json")

router.get('/', async (req, res)=>{
    try {
        const products = await manager.getProducts()
        res.status(200).json({message:'Products', products})
    } catch (error) {
        return error
    }
})


router.get('/:pid', async(req,res)=>{
    const { pid } = req.params
    const products = manager.getProducts()
    const product = products.find((product)=> product.id === Number(pid))
    //const product = manager.getProductById(Number(id))

    if(product){
        res.json(product)
    }
    res.json({error: "product not found"})
})


router.post('/', async(req, res)=>{
    try {
        const newProduct = await manager.addProduct({id, title, description})
        res.status(200).json({message:'User Created', user: newProduct })
    } catch (error) {
        res.status(500).json({error})
    }
})


router.put('/:pid',async (req, res)=>{
    const { pid } = req.params;
    const { title, description } = req.body;

    manager.updateProduct(Number(pid), {title, description})
  
    res.json({
      status: "Actualizado",
      product: {
        id: Number(pid),
        title,
        description,
      },
    })
})


router.delete('/:pid',async (req, res)=>{
    const {pid} = req.params
    try {
        const response = await manager.deleteProduct(+pid)
        res.status(200).json({message:'Product deleted.'})
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router