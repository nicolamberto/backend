import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router()
const manager = new ProductManager("./Products.json")

router.get('/', async (req, res)=>{
const products = await manager.getProducts()
res.render('index', {products})
})

router.get("/form", (req, res) => {
    res.render("form", {
      title: "Form example",
      fileCss: "styles.css",
    });
  });

  const users = [];

  
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