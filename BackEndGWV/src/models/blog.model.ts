// import * as express from 'express'
// import * as mysql from 'mysql2'
// import * as dayjs from 'dayjs'
// import { Blog } from '../types/blog';

// const Blog = function(blog: Blog) {
//     this.body = blog.body;
//     this.title = blog.title;
//     this.createdAt = dayjs().format()
// }

// const db = mysql.createConnection({
// 	user: process.env.USER,
// 	host: process.env.HOST,
// 	password: process.env.PASSWORD,
// 	database: process.env.DB,
// })

// Blog.create = (req:express.Request, res:express.Response) => {
//     let data = req.body
//     let blog: Blog = {
//         body: data.body,
//         title: data.title,
//         createdAt: data.createdAt
//     }

//     db.query<mysql.ResultSetHeader>('INSERT INTO blogs (body, title, createdAt) VALUES (?, ?, ?)', [blog.body, blog.title, blog.createdAt] ,(err, result) =>{
//         if (err) throw err
//         if (result.affectedRows == 0) {
//             res.status(400).send("Could not create blog") 
//             return
//         } 
//         res.status(201).send("CREATED")
//     })
// }

// Blog.findAll = (req: express.Request, res:express.Response) => {

// }

// module.exports = Blog