const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/mongodb')
const requireLogin = require('../middleware/requirelogin')


router.post('/signup', (req, res) => {
    const { name, email, password, nickname } = req.body
    console.log(req.body)
    if (!email || !password || !name || !nickname) {
        return res.status(402).json({ error: "please add all the fields" })
    }

    User.findOne({ email: email})
        .then((savedUser) => {
            if (savedUser) {
                return res.status(402).json({ error: "suer allerady exist" })
            }

            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        name,
                        password: hashedpassword,
                        nickname,
                    })
                    user.save()
                        .then(user => {
                            console.log('saved successfuly')
                            res.json({ message: 'saved successfuly' })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(402).json({ error: "please add email or password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(402).json({ error: "invalid email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(domatch => {
                    if (domatch) {
                        // res.json({messsage:'successfully logedin'})
                        const token = JWT.sign({ _id: savedUser._id }, JWT_SECRET)
                        const {_id,name,email,nickname,following,followers,profileImage}= savedUser
                        res.json({ token,user:{_id,name,email,nickname,following,followers,profileImage} })
                    }
                    else {
                        return res.status(402).json({ error: "invalid email or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

module.exports = router;