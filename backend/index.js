import express from "express"
import cors from "cors"
import { loginRoute } from "./Routes/loginRoute.js"

const app= express()

app.use(cors({
    origin:"http://localhost:3000",
    methods:['GET', 'POST', 'PUT'],
    credentials: true
}))
app.use(express.json())
app.use('/auth',loginRoute)


app.listen(3001,()=>{
    console.log('Server is up and running')
})