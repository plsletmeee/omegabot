const mongoose = require('mongoose')

const dashboardAuth = new mongoose.Schema({
    user: String,
    cookie: String,
    refreshToken: String,
})

module.exports = mongoose.model('dashboard_auth', dashboardAuth)