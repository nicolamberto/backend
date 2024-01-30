import {Router} from 'express'
import userModel from '../models/user.model.js'
import { createHash, isValidPassword, generateJWToken } from '../utils.js'
import passport from 'passport';

const router = Router()


router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    { }
})

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/users")
})


router.post('/register', passport.authenticate('register', {
    failureRedirect: 'api/session/fail-register'
}), async (req, res) => {
    console.log("Registrando usuario:");
    res.status(201).send({ status: "success", message: "Usuario creado con extito." });
})


// Login
router.post('/login', passport.authenticate('login',
    {
        failureRedirect: 'api/session/fail-login'
    }
), async (req, res) => {
    console.log("User found to login:");

    const user = req.user;
    console.log(user);

/*     req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }

    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
 */
    // Usando JWT usando Postman - no se se usan session
    const access_token = generateJWToken(user)
    console.log(access_token);
    res.send({ access_token: access_token });
})


router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});



/* router.post('/register', async (req,res)=>{
const {first_name, last_name, email, age, password} = req.body 

const exist = await userModel.findOne({email})
if(exist){
    return res.status(400).send({status:'error', msg:'Usuario ya existe!'})

}
const user = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password)
}
const result = await userModel.create(user)
res.send({status:"success", msg:"Usuario creado con exito con ID: " + result.id})
})

router.post('/login', async (req,res) => {
  const {email, password} = req.body
  const user = await userModel.findOne({email})  
    let rol;
    if(!user) return res.status(401).send({status:"Error", error:"Incorrect credentials"})

    if (!isValidPassword(user, password)) {
        return res.status(401).send({ status: "error", error: "Incorrect credentials" })
    }

    if(email == "adminCoder@coder.com" && password == "adminCod3r123"){
        rol = 'admin'
    }
    else{
        rol = "user"
    }
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        rol: rol
    }

    res.send({status:'success', payload: req.session.user, message:'Logueo exitoso'})
}) */

router.get('/logout',  (req,res)=>{
    req.session.destroy(err =>{
        if(!err) return res.status(200).send("deslogueo exitoso")
        else res.send("fallo el deslogueo")
    })
})
export default router;