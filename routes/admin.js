const express = require('express')
const adminRouter = express.Router()
const { model } = require('mongoose')
const admin = require('../middleware/admin')
const News = require('../models/news')

// upload news
adminRouter.post('/admin/upload-news', admin, async (req, res) => {
    try {
        const { title, author, content, image, date, imageNewsletter, } = req.body
        let news = new News({
            title, author, content, image, date, imageNewsletter,
        })
        news = await news.save()
        res.json(news)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

module.exports = adminRouter