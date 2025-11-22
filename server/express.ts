import { access, constants } from 'fs/promises'
import path from 'path'

import express from 'express'
import type { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import config from './config/config.ts'
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

if (config.env === 'production') {
  // For production, our backend will serve the frontend which should
  // be pre-built into the dist/ directory. If it doesn't exist or has
  // improper permissions, we should fail loudly.
  const client = path.join(process.cwd(), 'dist', 'client')
  await access(client, constants.R_OK | constants.X_OK)
  app.use('/', express.static(client))
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())

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
