import express from "express"
import cors from "cors"
import { adminRoute } from "./Routes/adminRoute.js"
import {employeeRoute} from "./Routes/employeeRoute.js"

const app= express()

app.use(cors({
    origin:"http://localhost:3000",
    methods:['GET', 'POST', 'PUT'],
    credentials: true
}))
app.use(express.json())
app.use('/admin',adminRoute)
app.use('/employee',employeeRoute)


app.listen(3001,()=>{
    console.log('Server is up and running')
})