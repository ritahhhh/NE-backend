import express from "express"
import client from "../utils/db.js"
import jwt from 'jsonwebtoken'
import { useParams } from 'react-router-dom'

const router= express.Router()

router.post("/employeeLogin",(req,res)=>{
    const psql='SELECT * FROM employee WHERE email = $1 AND password = $2'
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


router.get('/category',(req,res)=>{
    const psql ="SELECT * FROM category"
    client.query(psql,(err,result)=>{
        if(err) return res.json({status:false, Error:'Query error'})
        return res.json({status: true, Result: result})
    })
})



router.get('/employee',(req,res)=>{
    const psql ="SELECT * FROM employee"
    client.query(psql,(err,result)=>{
        if(err) return res.json({status:false, Error:'Query error'})
        return res.json({status: true, Result: result})
    })
})
router.get('/employee/:id',(req,res)=>{
    const id= req.params.id
    const psql =`SELECT * FROM employee WHERE id=${id}`
    client.query(psql,(err,result)=>{
        if(err) return res.json({status:false, Error:'Query error'})
        return res.json({status: true, Result: result})
    })
})

router.delete('/employee/:id', (req, res) => {
    const id = req.params.id;
  
    const query = `
      DELETE FROM employee
      WHERE id = ${id};
    `;
    const values = [id];
  
    client.query(query, values, (err, result) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ status: false, error: 'Query error' });
      }
  
      if (result.rowCount === 0) {
        return res.status(404).json({ status: false, error: 'Employee not found' });
      }
  
      return res.json({ status: true, message: 'Employee deleted successfully' });
    });
  });



router.put('/employee/:id', (req, res) => {
    const id = req.params.id;
    const { fullName, email, category, telnumber } = req.body;
  
    const query = `
      UPDATE employee
      SET fullNames = $1, email = $2, category = $3, phoneNumber = $4
      WHERE id = ${id};
    `;
    const values = [fullName, email, category, telnumber];
  
    client.query(query, values, (err, result) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ status: false, error: 'Query error' });
      }
  
      if (result.rowCount === 0) {
        return res.status(404).json({ status: false, error: 'Employee not found' });
      }
  
      return res.json({ status: true, message: 'Employee updated successfully' });
    });
  });

export {router as employeeRoute}