require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const musichubRouter = require('./routes/musichub')
const usersRouter = require('./routes/users')
app.use('/musichub', musichubRouter)
app.use('/users', usersRouter)



app.listen(3000, () => console.log('Server Started'))