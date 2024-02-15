const express = require('express')
const { signIn, signUp, user, updateUser, deleteUser } = require('../controllers/user')
const routes = express.Router()
const authHandler = require('../middleware/auth')


routes.post('/signin', signIn)
routes.post('/update-user', updateUser)
routes.post('/delete-user', deleteUser)
routes.post('/signup', signUp)
routes.get('/currentuser', authHandler, user)

module.exports = routes

