const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Game = new Schema(
    {
        name: { type: String},
        description: { type: String},
        image: { type: String, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Game', Game)