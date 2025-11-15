import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
//import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.ts'

import path from 'path'
const app = express()

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const CURRENT_WORKING_DIR = process.cwd()

const CLIENT_DIST = path.join(CURRENT_WORKING_DIR, 'dist', 'client') // matches client vite.config.ts outDir: "../dist/client"
app.use(express.static(CLIENT_DIST))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/', userRoutes)
app.use('/api', authRoutes)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use((err: any, _req: any, res: any, _next: any) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message })
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message })
    console.log(err)
  }
})


export default app
