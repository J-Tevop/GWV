const Blog = require('../models/blog.model')
import { Request, Response } from 'express'
import * as dayjs from 'dayjs'
import mysql from 'mysql2'
import { findAllBlogs } from '../services/blog.service'


// exports.create = (req: express.Request, res:express.Response) => {
//     const blog = new Blog({
//         body: req.body.body,
//         title: req.body.title,
//         createdAt: dayjs().format()
//     })
//     console.log("Test")
//     Blog.create(blog, (err, data) => {
//         if(err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occured while creating the tutorial"
//             })
//         else res.send(data)
//     })
// }

// exports.findAll = (req:express.Request, res:express.Response) => {

// } 

export const getAllBlogs =  async(req: Request, res:Response) => {
    try {
        return findAllBlogs()
    } catch(err) {
        res.status(500)
    } 
}
