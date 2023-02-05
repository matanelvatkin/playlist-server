const playlistData = require('./playlist.model')
require("./songs.model")

async function create(data) {
    return await playlistData.create(data)
}
async function read(filter,proj) {
    return await playlistData.find(filter,proj).populate("songs.song")
}

async function readOne(filter,proj) {
    let res = await playlistData.find(filter,proj).populate("songs.song")
    return res[0]
}

async function update(filter, newData) {
    return await playlistData.findOneAndUpdate( filter, newData,{ new: true }).populate("songs.song")
}
async function del(_id) {
    return await update({_id}, { isActive: false })
}


module.exports = { create, read, update, del,readOne }
