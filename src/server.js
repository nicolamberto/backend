import express, { urlencoded } from 'express'
import ProductsRouter from "./routes/products.router.js"
import CartRouter from "./routes/cart.router.js"
import viewRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'

//import ProductManager from './ProductManager.js'

const app = express()

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout:'main',
}))

app.set('view engine', 'hbs')
app.set('views', __dirname+'/views');

app.use(express.static(__dirname+'/public'))

//const manager = new ProductManager("./Products.json")

app.use(express.json())
app.use(urlencoded({extended:true}))

app.use('/products', ProductsRouter)
app.use('/carts', CartRouter)
app.use('/', viewRouter)


const PORT = 8080

app.listen(PORT,()=>{
    console.log('escuchando al puerto 8080');
})