const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    imageNewsletter: {
        type: String,
        required: true,
    },
})

const News = mongoose.model('News', newsSchema)

module.exports = { News, newsSchema }