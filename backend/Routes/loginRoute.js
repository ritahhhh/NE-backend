import express from "express"
import con from "../utils/db.js"

const router= express.Router()

router.post("/login",(req,res)=>{
    const sql="SELECT * FROM employee where email = ? and password = ?"

})

export {router as loginRoute}