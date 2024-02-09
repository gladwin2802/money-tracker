require('dotenv').config()
const express = require('express')
const db = require('mongoose')
const cors = require('cors')

// Express app
const app = express()
const mRoutes = require('./routes/moneyTracker')

// Middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next) => { // Optional
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/moneyTracker/', mRoutes)

// Connect to MongoDB and Listen for requests
db.connect(process.env.DB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to MongoDB...")
            console.log(`Listening @port #${process.env.PORT}`)
        })
    })
    .catch((e) => {
        console.log(e)
    })
