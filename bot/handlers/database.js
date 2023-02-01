module.exports = (client) => {
    try {
        const mongoose = require('mongoose')
        const dotenv = require('dotenv')
        dotenv.config()
        
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGO_TOKEN || process.env.MONGO_TEST, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        console.log('✨ Database Connected')
    } catch(err) {return console.log(err)}
}