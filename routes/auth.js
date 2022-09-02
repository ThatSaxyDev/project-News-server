const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const authRouter = express.Router()

// sign up user
authRouter.post('/api/signup', async (req, res) => {
    try {
        // get data from client
        const { name, email, password, school } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ msg: 'Student with the same email already exists!' })
        }

        // hash password (security)
        const hashedPassword = await bcryptjs.hash(password, 8)

        //! specify the user model
        let user = new User({
            name,
            email,
            password: hashedPassword,
            school,
        })
        user = await user.save()
        res.json(user)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

// sign in user
authRouter.post('/api/signin', async (req, res) => {
    try {
      const { email, password } = req.body
  
      //! check if user exists
      const user = await User.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({ msg: 'Student with this mail does not exist!' })
      }
  
      //! unhash password and compare
      const isMatch = await bcryptjs.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ msg: 'Incorrect password!' })
      }
  
      const token = jwt.sign({ id: user._id }, 'passwordKey')
      res.json({ token, ...user._doc })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

module.exports = authRouter