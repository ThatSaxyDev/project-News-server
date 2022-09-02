const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
    },
    password: {
        required: true,
        type: String,
        validate: {
          validator: (value) => {
            return value.length > 7
          },
          message: 'Password must be greater than 7 characters'
        },
      },
      school: {
        required: true,
        type: String,
        trim: true,
      },
      // favorite: {}
})

const User = mongoose.model('User', userSchema)
module.exports = User