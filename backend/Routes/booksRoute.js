import express from "express"
import client from "../utils/db.js"
import jwt from 'jsonwebtoken'
import { useParams } from 'react-router-dom'

const router= express.Router()

router.post('/add_book',(req,res)=>{
  const sql = `INSERT INTO books(name,author,publisher,publishedyear,subject) VALUES( ?,  ?, ?, ?, ? )`
  
  client.query(sql,[req.body.name ,req.body.author ,req.body.publisher ,req.body.publicationYear ,req.body.subject],(err,result)=>{
    if(err) return res.json({message:"Adding book not possible",Error:'Query error'})

    return res.json({message:"Book added successfully"})
  })
})

router.get('/books',(req,res)=>{
    const psql ="SELECT * FROM books"
    client.query(psql,(err,result)=>{
        if(err) return res.json({status:false, Error:'Query error'})
        return res.json({status: true, Result: result})
    })
})







export {router as booksRoute}