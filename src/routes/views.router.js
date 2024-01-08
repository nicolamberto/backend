import { Router } from "express";
import ProductManager from "../ProductManager.js";
import { productModel } from "../models/product.model.js";
import productDao from "../daos/dbManager/product.dao.js";

const router = Router()
const manager = new ProductManager("./Products.json")

router.get('/', async (req, res)=>{
  const {page, limit, order} = req.query
const products = await productModel.paginate(
  {
    //criterio de busqueda, aca podes poner un sort por ejemplo o buscar por palabras
  },
  {
    page:page||1,
    limit:limit||10
  } 
).sort({price: 1})
res.render('index', {products})
})

router.get('/productos', async (req, res)=>{
  const products = await productModel.paginate(
  )
  console.log(products);
  res.json(products)
})

router.get("/form", (req, res) => {
    res.render("form", {
      title: "Form example",
      fileCss: "styles.css",
    });
  });


/*   router.get('/realtimeproducts' , async(req, res)=> {
    const products = await manager.getProducts()
    res.render('realtimeproducts', {products})
  })
 */
  
router.post("/user", (req, res) => {
  const { name, age } = req.body;

  users.push({
    name,
    age,
  });

  console.log(users);

  res.redirect("/");
});

export default router