const jwt = require('jsonwebtoken');
const JWT_SECRET = "Harryisagoodb$oy";

//middleware req, res or next ko leta h or at the end next ko hum call krenge taaki next() wala middleware call ho
//next mtlb .. async waala function call hoga auth.js route 3 me..
const fetchuser = (req, res, next) =>{
    //get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET) //varify krenge token ko
        req.user = data.user;  //yaha user mil jaayega
        next()
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    
}

module.exports = fetchuser;