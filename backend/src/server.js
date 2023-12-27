require('dotenv').config()
require('express-async-handler')
const express = require('express')
const connectDb = require('./connectDb/connect')
const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')
const bookRoute = require('./routes/book')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const authHandler = require('./middleware/auth')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/user', userRoute)

app.use('/api/admin', adminRoute)
app.use('/api/books', bookRoute)

app.use(errorHandler)
app.use(notFound)

const start = async() => {
    let connection;
    try {
        if(!connection) connection = await connectDb(process.env.CONNECTION_STRING)
        app.listen(port, console.log(`server dey run for ${port} in top...`))
    } catch (error) {
        console.log(error)
    }
    
}
start()