import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import userRouter from './routes/users.route'
dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 8080

// config body parser :
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// config router

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
