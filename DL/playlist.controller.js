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

async function update(id, newData) {
    return await playlistData.findOneAndUpdate( id, newData,{ new: true }).populate("songs.song")
}
async function del(id) {
    return await update(id, { isActive: false })
}


module.exports = { create, read, update, del,readOne }
