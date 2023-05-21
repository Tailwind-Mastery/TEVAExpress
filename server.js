import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import tokenRoutes from './routes/tokenRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/mongodb.js'
import cookieParser from 'cookie-parser'

dotenv.config()
connectDB();

const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())  

app.use(cors({
    origin: [
        // 'http://localhost:5173',
        'https://tailwind-mastery.github.io/*',
        // 'https://tailwind-mastery.github.io/TEVAReact/'
    ],
}))

app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/token', tokenRoutes)
app.get('/', (req, res) => res.send('server is HI'))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log('Started', port))

