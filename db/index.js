const mongoose = require('mongoose')

let MONGODB_URI = "mongodb+srv://lark09:peanuts@cluster0.tqqtb.mongodb.net/cozygamer"

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB.')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db