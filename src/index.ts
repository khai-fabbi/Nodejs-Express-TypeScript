import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import bodyParser from 'body-parser'
import userRouter from './routes/users.route'
import databaseService from './services/database.service'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 8080

// config body parser :
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

const allowedOrigins = ['http://localhost:3000']

const options: cors.CorsOptions = {
  origin: allowedOrigins
}
app.use(cors(options))
app.use(express.json())
// config router
app.use('/users', userRouter)

databaseService.connect().catch(console.dir)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
