import express from "express"
import cors from "cors"
import { studentRoute } from "./Routes/studentRoute.js"
import {booksRoute} from "./Routes/booksRoute.js"
import morgan from 'morgan'
// import auth from "./middlewares/auth.middleware.js"


const app= express()
app.use(morgan('dev'))

app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET', 'POST', 'PUT'],
    credentials: true
}))
app.use(express.json())
app.use('/student',studentRoute)
app.use('/book',booksRoute)


app.listen(3001,()=>{
    console.log('Server is up and running')
})