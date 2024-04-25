import express from "express"
import client from "../utils/db.js"
import jwt from 'jsonwebtoken'

const router= express.Router()

router.post("/adminLogin",(req,res)=>{
    const psql='SELECT * FROM admin WHERE email = $1 AND password = $2'
    client.query(psql,[req.body.email, req.body.password],(err,result) => {
        if(err) return res.json({loginStatus: false, Error:"Query error"})
       
        if(result.length > 0){
            
            const email=result[0].email;
            const token= jwt.sign(
                {role:"admin", email: email},
                "jwt_secret_key",
                {expiresIn:"1d"}
            );
            console.log(token)
            res.cookie("token",token)
            return res.json({loginStatus: true})
        }else{
            return res.json({loginStatus: false, Error:"Wrong credentials"})
        }
    })

})

export {router as loginRoute}