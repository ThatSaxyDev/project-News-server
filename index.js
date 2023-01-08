const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotEnv = require("dotenv").config();
const authRouter = require('./routes/auth')
const adminRouter = require('./routes/admin')
const newsRouter = require('./routes/news')
const userRouter = require('./routes/user')

const PORT = 3000
const app = express()

const corsOption = {
  // origin: ["*", "http://localhost:3000", "http://localhost:5500", "https://buattendancemanagementsystem.herokuapp.com"],
  origin: ["*", "http://localhost:3000", "http://localhost:5500"],
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
app.use(userRouter)


// connection
mongoose
  .connect(process.env.DB_KEY)
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