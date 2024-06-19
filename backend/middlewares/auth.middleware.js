// import dependencies
// import verify from 'jsonwebtoken';
// import client from '../utils/db';
// // import  tudent from '../models/admin.model';

// async function auth(req, res, next) {
//     const query=`SELECT * FROM students WHERE id = ?`
//     const header = req.header('Authorization')
//     const token = header ? header.split(' ')[1] : req.query.token;
//     if (!token)
//         return res.status(401).send({message:'No Token Found'})
//     try {
//         const decoded = verify(token, process.env.JWT_SECRET)
//         const user = client.query(query,[decoded.id])
//         if (!user)
//             return res.status(401).send({message:'Invalid Token'})
//         req.user = user
//         next();
//     }
//     catch (err) {
//         res.status(401).send({message:"Unauthorized"})
//         console.log(err);
//     }
// }
// export default auth 