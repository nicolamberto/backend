import express, { urlencoded } from 'express'
import ProductsRouter from "./routes/products.router.js"
import CartRouter from "./routes/cart.router.js"
import viewRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import Handlebars from 'handlebars'
import { __dirname } from './utils.js'
import mongoose from 'mongoose'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

const app = express()


mongoose
    .connect('mongodb+srv://nicolamberto:2840@backend.kobvof3.mongodb.net/backend?retryWrites=true&w=majority')
    .then(()=> console.log('DB connected'))
    .catch((err)=>console.log(err))

app.engine('hbs', handlebars.engine({
   // handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'))


app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use('/products', ProductsRouter)
app.use('/carts', CartRouter)
app.use('/', viewRouter)

const PORT = 8080
app.listen(PORT, () => {
    console.log('escuchando al puerto 8080');
})