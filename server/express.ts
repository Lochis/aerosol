import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.ts'

import path from 'path'
const app = express()

const corsOptions = {
  // set precise origin or reflect the request origin:
  origin: (origin: any, callback: any) => {
    // allow same-origin and local dev
    callback(null, origin ?? 'http://localhost:3000')
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const CURRENT_WORKING_DIR = process.cwd()

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())


app.use('/api', userRoutes)
app.use('/api', authRoutes)

app.use((err: any, _req: any, res: any, _next: any) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message })
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message })
    console.log(err)
  }
})


export default app
