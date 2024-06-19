import express from "express";
import client from "../utils/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Student login route
router.post("/studentLogin", (req, res) => {
    const psql = 'SELECT * FROM students WHERE email = ?';

    client.query(psql, [req.body.email], async (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });

        if (result.length > 0) {
            const email = result[0].email;
            const hashedPassword = result[0].password;

            const match = await bcrypt.compare(req.body.password, hashedPassword);
            if (match) {
                const token = jwt.sign(
                    { role: "student", email: email },
                    "jwt_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie("token", token);
                return res.json({ loginStatus: true });
            } else {
                return res.json({ loginStatus: false, Error: "Invalid password" });
            }
        } else {
            return res.json({ loginStatus: false, Error: "Wrong credentials" });
        }
    });
});

// Student signup route
router.post('/signup', async (req, res) => {
    const psql = `INSERT INTO students(firstName, lastName, email, password) VALUES(?, ?, ?, ?)`;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        client.query(psql, [req.body.firstName, req.body.lastName, req.body.email, hashedPassword], (err, result) => {
            if (err){
              console.log(err)
              return res.json({ studentAddition: false, Error: 'Query error' });
          }

            return res.json({  ...result,studentAddition:true });
        });
    } catch (error) {
        return res.json({ studentAddition: false, Error: 'Password hashing error' });
    }
});

export { router as studentRoute };