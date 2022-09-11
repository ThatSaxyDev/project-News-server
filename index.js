const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// imports from other files
const authRouter = require('./routes/auth')

const PORT = 3000
const app = express()
const DB = 'mongodb+srv://kiishi:floSic1999100@cluster0.mdy4vqt.mongodb.net/?retryWrites=true&w=majority'

// middlewares
app.use(express.json())
app.use(authRouter)
app.use(cors({
  origin: '*',
}))
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

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