const express = require('express')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3001
const mongoose = require('mongoose')
const app = express()

// DATABASE //
const dotenv = require('dotenv')
dotenv.config()

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_TOKEN || process.env.MONGO_TEST, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})

console.log('🎈 Database Connected')

// EXPRESS SETUP
app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))

// ROUTES //
const transcriptRoute = require('./routes/transcripts')
const authRoute = require('./routes/auth')
const apiRoute = require('./routes/api')
const dashboardRoute = require('./routes/dashboard')
const policiesRoute = require('./routes/policies')
const defaultRoute = require('./routes/default')

app.use('/', defaultRoute)
app.use('/dash', dashboardRoute)
app.use('/api', apiRoute)
app.use('/transcript', transcriptRoute)
app.use('/policies', policiesRoute)
app.use('/auth', authRoute)

app.get('*', (req, res) => { return res.redirect(301, '/404') })

// EXPRESS PORT CONNECT
app.listen(port, () => console.log(`🎈 Express running at port ${port}`));