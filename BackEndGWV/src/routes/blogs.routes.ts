import express, {Express, Request, Response, NextFunction, Router} from 'express'
import * as dotenv from 'dotenv'
import * as mysql from 'mysql2'
import * as dayjs from 'dayjs'
import * as bodyParser from 'body-parser'
import { Blog } from '../types/blog';
import { getAllBlogs } from '../controllers/blog.controller'

dotenv.config()

const router = express.Router()
const port = process.env.PORT;
const db = mysql.createConnection({
	user: process.env.USER,
	host: process.env.HOST,
	password: process.env.PASSWORD,
	database: process.env.DB,
})

// router.get('/', (req, res) => {
	
  

// });

// router.get('/:id', (req, res) => {

// });


export default function (app: Router) {
    const route = Router()
    app.use('/api/blog', route)

    route.get('/', async (req:Request, res:Response, next:NextFunction) => {
        try {
            const results = await getAllBlogs(req, res)
            res.json(results)
        } catch(error) {
            next(error)
        }
        
    })
    
}





// router.route("/:id").get((req, res) => {
//     const id = req.params.id
//     console.log(req.body)
//     const parsedID = parseInt(req.params.id)
//     if(Number.isInteger(parsedID)) {
//         db.query('SELECT * FROM blogs WHERE id=?', [id], (err, result) =>{
//             if (err) {
//                 console.log(err)
//             }
//             if(Object.keys(result).length != 0) {
//                 res.status(200).send(result)
//                 return
//             } else {
//                 res.status(200).send("There aren't any blogs with this ID")
//                 return
//             }
//         })
//     } else {
//         res.status(400).send("Please specify a blogID")
//     }
// }).put((req, res) => {
//     const id = req.params.id
//     const data = req.body
//     const parsedID = parseInt(req.params.id)

//     let blog: Blog = {
//         body: data.body,
//         title: data.title,
//         createdAt: dayjs().format()
//     }
//     if(Number.isInteger(parsedID)) {
//         try {
//             db.query(`UPDATE blogs SET body='${blog.body}', title='${blog.title}', createdAt='${blog.createdAt}' WHERE id='${id}'`)
//             res.status(200).send(res.send)
//         } catch (err) {
//             res.status(400).send("Unable to update the blog")
//         }
        
//     } else {
//         res.status(400).send("Please specify a blogID")
//     }
// }).delete((req, res) => {
//     const id = req.params.id
//     const parsedID = parseInt(req.params.id)

//     if(Number.isInteger(parsedID)) {
//         db.query<mysql.ResultSetHeader>('DELETE FROM blogs WHERE id=?', [id], (err, result) => {
//             if (err) throw err;
//             console.log(result.affectedRows + " record(s) updated")
//             if (result.affectedRows == 0) {
//                 res.status(400).send("There is no blog with this ID") 
//                 return
//             } 
            
//             res.sendStatus(204)
//         })
        
//     } else {
//         res.status(400).send("Please specify a blogID")
//     }
// })

// router.param("id", (req, res, next, id) => {
//     req.
//     next()
// })
