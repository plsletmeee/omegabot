module.exports = async (client) => {

    try {

        const mongoose = require('mongoose');
        require('dotenv').config();

        mongoose.connect(process.env.MONGO_TOKEN || process.env.TEST_MONGO_TOKEN, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false,
        });

        console.log("✅ MongoDB connected successfully.");

    } catch(err) {
        return console.log(err);
    }

}