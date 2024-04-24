import mysql from 'mysql'

const con=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    port:3306,
    database:"nodeStudy",
    insecureAuth: true
})
con.connect(function(err){
    if(err){
        console.log("connection error", err)
    }else{
        console.log("connected")
    }
})

export default con