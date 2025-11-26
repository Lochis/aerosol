import express from 'express'
import type { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import { globalBurstLimit, globalRateLimit } from './ratelimits.ts'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.ts'
import postRoutes from './routes/post.routes.ts'

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(globalBurstLimit)
app.use(globalRateLimit)

app.use('/api', userRoutes)
app.use('/api', authRoutes)
app.use('/api', postRoutes)
app.get('/api', (_req: Request, res: Response) => {
  res.json({ message: "Aerosol API v2" })
})

app.use((err: any, _req: any, res: any, _next: any) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message })
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message })
    console.log(err)
  }
})


export default app
