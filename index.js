const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/auth')
const adminRouter = require('./routes/admin')
const newsRouter = require('./routes/news')

const PORT = 3000
const app = express()
const DB = 'mongodb+srv://kiishi:floSic1999100@cluster0.mdy4vqt.mongodb.net/?retryWrites=true&w=majority'

const corsOption = {
  // origin: ["*", "http://localhost:3000", "http://localhost:5500", "https://buattendancemanagementsystem.herokuapp.com"],
  origin: ["http://localhost:3000", "http://localhost:5500"],
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};

// middlewares
app.use(cors(corsOption));
app.use(express.json())
app.use(authRouter)
app.use(adminRouter)
app.use(newsRouter)



// connection
mongoose
  .connect(DB)
  .then(() => {
    console.log('Connected to MongoDB successfully')
  })
  .catch((e) => {
    console.log(e)
  })

// listener
app.listen(PORT, '0.0.0.0', () => {
  console.log(`connected @ PORT ${PORT}`)
})