import express, {Express, } from 'express';
import * as dotenv from 'dotenv'
import * as mysql from 'mysql2'
import * as dayjs from 'dayjs'
import * as bodyParser from 'body-parser'
import { Blog } from './src/types/blog';
import routes from './src/routes/blogs.routes';

dotenv.config()

const app = express();
const port = process.env.PORT;

// TODO: Put everything into the service for a nice distribution and overview lmao
// https://qat.com/simple-rest-service-node-js-express/

app.use(express.json())
app.use(express.urlencoded({extended: true}))


routes(app)

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});       