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
import channelRoutes from './routes/channel.routes.js'

const app = express()

// whitelist for cors to allow dev and prod origins
const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://aerosol.dev',
  'https://www.aerosol.dev'
]

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin) return callback(null, true);
    if (whitelist.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
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
app.use('/api', channelRoutes)

app.get('/', (_req: Request, res: Response) => {
  res.send('Aerosol API is running')
})

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
