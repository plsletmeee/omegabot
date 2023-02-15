const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3005
const mongoose = require('mongoose')
const app = express()

// Database
const dotenv = require('dotenv')
dotenv.config()

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_TOKEN, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})

console.log('🎈 Database Connected')

// Configuration
app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())

// Routes
const mainRoute = require('./routes/main')
const authRoute = require('./routes/auth')
const dashboardRoute = require('./routes/dashboard')

const dataAPIRoute = require('./routes/api/data')
const configAPIRoute = require('./routes/api/config')


app.use('/dashboard', dashboardRoute)
app.use('/auth', authRoute)
app.use('/', mainRoute)

app.use('/api/data', dataAPIRoute)
app.use('/api/config', configAPIRoute)

app.get('*', (req, res) => res.redirect('/404'))

// Connecting
app.listen(port, () => console.log(`🎈 Express running at port ${port}`));