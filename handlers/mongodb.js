module.exports = async (client, premium) => {

    try {

        const mongoose = require('mongoose');
        require('dotenv').config();

        mongoose.connect(process.env.MONGO_TOKEN || process.env.TEST_MONGO_TOKEN, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false,
        });

        console.log("[ALL] MongoDB connected successfully.");

    } catch(err) {
        return console.log(err);
    }

}