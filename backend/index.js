const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const connectDB = require('./config/db')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
const paymentRouter = require('./routes/payment')
const cors = require('cors')
const authMiddleware = require('./middlewares/auth')

app.use(express.json())
app.use(cors());
app.use('/api/auth', userRouter)
app.use('/api/products',authMiddleware, productRouter)
app.use('/api/cart', authMiddleware, cartRouter)
app.use('/api/order', authMiddleware, orderRouter)
app.use('/api/pay',authMiddleware ,paymentRouter)

app.use('/uploads', express.static('uploads'))

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is Running at ${PORT}`)
})