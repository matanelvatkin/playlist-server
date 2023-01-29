const mongoose = require('mongoose');


const songsSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    image: {
        type : String,
        required: true
    },
    duration_formatted:{
        type : String,
        required: true
    },
    id: {
        type : String,
        required: true
    },
    createDate : {
        type:Date,
        default : Date.now
    }
})

const songsData = mongoose.model('song', songsSchema)

module.exports = songsData