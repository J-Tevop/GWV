import * as express from 'express';
import * as dotenv from 'dotenv'
import * as mysql from 'mysql2'
import * as dayjs from 'dayjs'
import * as bodyParser from 'body-parser'
import { Blog } from './types/blog';

dotenv.config()

const app = express();
const port = process.env.PORT;
const db = mysql.createConnection({
	user: process.env.USER,
	host: process.env.HOST,
	password: process.env.PASSWORD,
	database: process.env.DB,
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/getBlog', (req, res) => {
	
		db.query('SELECT * FROM blogs', (err, result) =>{
			if (err) {
				console.log(err)
			}

			if(Array.isArray(result) && result.length != 0) {
				res.status(200).send(result)
			} else {
				res.status(200).send("There aren't any blogs")
			}

		})

});

app.get('/getBlogById/:id', (req, res) => {
	const id = req.params.id
	console.log(req.body)
	const parsedID = parseInt(req.params.id)
	if(Number.isInteger(parsedID)) {
		db.query('SELECT * FROM blogs WHERE id=?', [id], (err, result) =>{
			if (err) {
				console.log(err)
			}
			if(Object.keys(result).length != 0) {
				res.status(200).send(result)
				return
			} else {
				res.status(200).send("There aren't any blogs with this ID")
				return
			}
		})
	} else {
		res.status(400).send("Please specify a blogID")
	}
});

app.post('/postBlog', (req, res) => {
	let data = req.body
	let blog: Blog = {
		body: data.body,
		title: data.title,
		createdAt: dayjs().format()
	}

	db.query<mysql.ResultSetHeader>('INSERT INTO blogs (body, title, createdAt) VALUES (?, ?, ?)', [blog.body, blog.title, blog.createdAt] ,(err, result) =>{
		if (err) throw err
		if (result.affectedRows == 0) {
			res.status(400).send("Could not create blog") 
			return
		} 
		res.status(201).send("CREATED")
	})
});

app.delete('/deleteBlog/:id', (req, res, next) => {
	const id = req.params.id
	const parsedID = parseInt(req.params.id)

	if(Number.isInteger(parsedID)) {
		db.query<mysql.ResultSetHeader>('DELETE FROM blogs WHERE id=?', [id], (err, result) => {
			if (err) throw err;
			console.log(result.affectedRows + " record(s) updated")
			if (result.affectedRows == 0) {
				res.status(400).send("There is no blog with this ID") 
				return
			} 
			
			res.sendStatus(204)
		})
		
	} else {
		res.status(400).send("Please specify a blogID")
	}
	

	
})

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});      