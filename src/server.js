import express, { urlencoded } from 'express'
import ProductsRouter from "./routes/products.router.js"
import CartRouter from "./routes/cart.router.js"
import viewRouter from './routes/views.router.js'
import usersViewsRouter from './routes/users.router.js'
import sessionsRouter from './routes/sessions.router.js'
import jwtRouter from './routes/jwt.router.js'
import GithubLoginViewRouter from './routes/github-login.views.router.js'
import handlebars from 'express-handlebars'
import Handlebars from 'handlebars'
import { __dirname } from './utils.js'
import mongoose from 'mongoose'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport';
import initializePassport from './config/passport.config.js'


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
app.set(express.static(__dirname+'/public'))

app.use(session({

    store: MongoStore.create({
      mongoUrl:'mongodb+srv://nicolamberto:2840@backend.kobvof3.mongodb.net/backend?retryWrites=true&w=majority', 
      mongoOptions:{ useNewUrlParser:true, useUnifiedTopology:true},
      ttl:10 * 60
    }),
  
    secret: "Th1s1sA5ecret",
    resave:false,
    saveUninitialized:true
  
  }))
  

app.use(express.static(__dirname + '/public'))


app.use(express.json())
app.use(urlencoded({ extended: true }))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/products', ProductsRouter)
app.use('/carts', CartRouter)
app.use('/', viewRouter)
app.use("/api/jwt", jwtRouter)
app.use('/users',usersViewsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('github', GithubLoginViewRouter)
app.use("/api/email", emailRouter);



const PORT = 8080
app.listen(PORT, () => {
    console.log('escuchando al puerto 8080');
})