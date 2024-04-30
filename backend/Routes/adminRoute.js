import express from "express"
import client from "../utils/db.js"
import jwt from 'jsonwebtoken'

const router= express.Router()

router.post("/adminLogin",(req,res)=>{
    const psql='SELECT * FROM admin WHERE email = $1 AND password = $2'
    client.query(psql,[req.body.email, req.body.password],(err,result) => {
        if(err) return res.json({loginStatus: false, Error:"Query error"})
        
        if(result.rows.length > 0){
            const email=result.rows[0].email;
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

router.post('/add_category',(req,res)=>{
    const psql = 'INSERT INTO category(name) VALUES($1)';
    client.query(psql,[req.body.category],(err,result)=>{
        if(err) return res.json({categoryAddtition: false, Error:"Query error"})

        return res.json({categoryAddition: true})
    })
})


router.get('/category',(req,res)=>{
    const psql ="SELECT * FROM category"
    client.query(psql,(err,result)=>{
        if(err) return res.json({status:false, Error:'Query error'})
        return res.json({status: true, Result: result})
    })
})

router.post('/add_employee',(req,res)=>{
    const psql = `INSERT INTO employee(fullNames,email,category,phoneNumber) VALUES($1, $2, $3, $4)`;
    client.query(psql,[req.body.fullName,req.body.email,req.body.category,req.body.telnumber],(err,result)=>{
        if(err) return res.json({employeeAddition: false, Error:'Query error'})

        return res.json({employeeAddition:true, result: result})
    })
})

router.get('/employee',(req,res)=>{
    const psql ="SELECT * FROM employee"
    client.query(psql,(err,result)=>{
        if(err) return res.json({status:false, Error:'Query error'})
        return res.json({status: true, Result: result})
    })
})

export {router as adminRoute}