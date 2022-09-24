const express = require('express')
const newsRouter = express.Router()
const auth = require('../middleware/auth')
const { News } = require('../models/news')

// get all news
newsRouter.get('/api/news', auth, async (req, res) => {
    try {
      const news = await News.find({})
      res.json(news)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

// get request to search for news
newsRouter.get('/api/news/search/:title', auth, async (req, res) => {
  try {
    const news = await News.find({
      title: {$regex: req.params.title, $options: 'i'},
    })
    res.json(news)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})



module.exports = newsRouter