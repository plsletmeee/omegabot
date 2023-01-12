const express = require('express')
const port = process.env.PORT || 3000
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
app.use(express.urlencoded({extended: true}))

// ROUTES //
const transcriptRoute = require('./routes/transcripts')
const defaultRoute = require('./routes/default')

app.use('/', defaultRoute)
app.use('/transcript', transcriptRoute)

app.get('*', (req, res) => {
	return res.sendFile('website/pages/error404.html', { root: '.' })
})

// EXPRESS PORT CONNECT
app.listen(port, () => console.log(`🎈 Express running at port ${port}`));