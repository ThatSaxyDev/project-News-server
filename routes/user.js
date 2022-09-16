const express = require('express')
const auth = require('../middleware/auth')

const { News } = require('../models/news')
const User = require('../models/user')
const userRouter = express.Router()

// add to bookmnarks
userRouter.post('/api/add-to-bookmarks', auth, async (req, res) => {
    try {
        const { id } = req.body
        const news = await News.findById(id)
        let user = await User.findById(req.user)

        // if (user.bookmarks.length == 0) {
            user.bookmarks.push({ news, quantity: 1 })
        // } 
        // else {
        //     for (let i = 0; i < user.bookmarks.length; i++) {
        //         if (user.bookmarks[i].news._id.equals(news._id)) {
        //             user.bookmarks.push({ news, quantity: 1 })
        //         }
        //     }

        //     // if (isProductFound) {
        //     //     let producttt = user.cart.find((productt) =>
        //     //         productt.product._id.equals(product._id),
        //     //     )
        //     //     producttt.quantity += 1
        //     // } else {
        //     //     user.cart.push({ product, quantity: 1 })
        //     // }
        // }
        user = await user.save()
        res.json(user)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

// remove news from bookmarks
userRouter.delete('/api/remove-from-bookmarks/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const news = await News.findById(id)
        let user = await User.findById(req.user)

        for (let i = 0; i < user.bookmarks.length; i++) {
            if (user.bookmarks[i].news._id.equals(news._id)) {
                if (user.bookmarks[i].quantity == 1) {
                    user.bookmarks.splice(i, 1)
                } else {
                    user.bookmarks[i].quantity -= 1
                }
            }
        }
        user = await user.save()
        res.json(user)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

module.exports = userRouter