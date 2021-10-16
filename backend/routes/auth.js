const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "Harryisagoodb$oy";



//1 Route. Endpoint

//create a user using : POST endpoint: "/api/auth/createuser" (appko ishpe post req maarni h or data bhejna hai). doesnt required auth/login(ki login hone ki jarurat h k nhi)
//[] k ander hum saare validation daalenge

router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast five characters').isLength({ min: 5 })
], async (req, res)=>{
    let success = false
    //req.body hai User ki value (schema)

    //if there are erros, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //ishne true return nhi kiya toh
      return res.status(400).json({success, errors: errors.array() }); // hum bad request or eror bhejenge
    }

    //create new user (oldway)
    // const user = User(req.body)
    // user.save(); //data mongodb comapss me save ho jaayega
    // res.send(req.body)

    //check whether the user with this email exist already
    try{
        let user = await User.findOne({email: req.body.email}) //findone ek method lagaya h model pr jo email dega already wala
        if(user){
            return res.status(400).json({success,error: "Sorry user with this email is already exists"})
        }

        //await ka mtlb ki jbtk resolve na ho jaayeg.. ruk jaao.. resolve hote value leke jaao
        const salt = await bcrypt.genSalt(10); //to generate salt
        secPass =  await bcrypt.hash(req.body.password,salt)  //return promise : generate pasword

        //user db me create hoga
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass, //yeh variable password or salt ko hash krke aayega
        })

        //data me hum user ki id bhej rhe h
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        //res.json(user)
        success= true
        res.json({success, authToken})

    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})


//2 Route. EmdPoint

//authenticate a user using : POST endpoint: "/api/auth/login" : no login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async (req, res)=>{

    //if there are erros, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //ishne true return nhi kiya toh
        success = false
      return res.status(400).json({success, errors: errors.array() }); // hum bad request or eror bhejenge
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email}) //yeh jo body ka email h yeh User model me h ky
        if(!user){
            success = false
            return res.status(400).json({success,error:"Please try to login with correct credentials"})
        }

        // 1st arg: jo user ne dala h vo password , //2nd arg(hash) : user.password model mese
        //yeh internally saare hash ko match krlega
        const passwordCompare = await bcrypt.compare(password, user.password); 
        if(!passwordCompare){
            success = false
            return res.status(400).json({success, error:"Please try to login with correct credentials"})
        }

        //data h user ka jo hum bhejenge
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        console.log(JWT_SECRET)
        //res.json(user)
        success=true;
        res.json({success,authToken})
    
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})


//3 Route. EmdPoint

//Get loggedin User details using : POST endpoint: "/api/auth/getuser" : Login Required
router.post('/getuser',fetchuser, async (req, res)=>{
    try {
        //authToken ko decode krke userid nikaalni hogi or ushe yaha pass krni hogi
        //req.user.id  middelware fetchuser se aa rhi h
        userId = req.user.id
        //console.log(userId)
        //kisi tareeke se user ki id // .select krne se user ki saare var le skte except password
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router