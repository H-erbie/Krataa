const express = require('express')
const { signIn, signUp, user } = require('../controllers/user')
const routes = express.Router()
const authHandler = require('../middleware/auth')


routes.post('/signin', signIn)
routes.post('/signup', signUp)
routes.get('/currentuser', authHandler, user)

module.exports = routes

