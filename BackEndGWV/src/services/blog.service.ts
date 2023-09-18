import {Request, Response} from 'express'
import mysql from 'mysql2'
import dotenv from 'dotenv'



export const findAllBlogs = async() => {
    dotenv.config()

    const db = await mysql.createConnection({
	user: process.env.USER,
	host: process.env.HOST,
	password: process.env.PASSWORD,
	database: process.env.DB,
    })

    let result = await db.execute('SELECT * FROM blogs', (err, result) =>{
        if (err) {
            console.log(err)
        }

        if(Array.isArray(result) && result.length != 0) {
            return result
        } else {
            return err
        }
    })

    return result
} 