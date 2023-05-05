const authController = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//Register
authController.post('/register', async (req, res) => {
    try {
        const isExisting = await User.findOne({ email: req.body.email })
        if (isExisting) {
            throw new Error('This mail already exists!!')
        }

        const pass = await bcrypt.hash(req.body.password, 8)
        const newUser = await User.create({ ...req.body, password: pass })
        const { password, ...others } = newUser._doc
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '3h' })
        return res.status(201).json({ others, token })
    }
    catch (error) {
        return res.status(500).json(error.message)
    }
})


//Login
authController.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error('Wrong Password or username')
        }
        const comparePass = await bcrypt.compare(req.body.password, user.password)
        if (!comparePass) {
            throw new Error('Wrong Password or username')
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' })
        const { password, ...others } = user._doc
        return res.status(200).json({ others, token })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})
module.exports = authController
