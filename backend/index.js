const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const authController = require('./Controllers/authControllers')
const propertyController = require('./Controllers/propertyControllers')
const uploadController = require('./Controllers/uploadControllers')
const app = express()

//Connect database
mongoose.connect(process.env.MONGO_URL)
// app.use('/images', express.static('/public/images'))
app.use(express.static('public'));



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/auth", authController)
app.use("/property", propertyController)
app.use("/upload", uploadController)


app.listen(process.env.PORT)


