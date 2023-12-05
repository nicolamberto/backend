import express, { urlencoded } from 'express'
import ProductsRouter from "./routes/products.router.js"
import CartRouter from "./routes/cart.router.js"
import viewRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'


const app = express()
import { Server } from 'socket.io'

const PORT = 8080 
const httpServer = app.listen(PORT,()=>{
    console.log('escuchando al puerto 8080');
})

const socketServer = new Server(httpServer)

//import ProductManager from './ProductManager.js'


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

