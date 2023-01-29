const songData = require('./songs.model')


async function create(data) {
    return await songData.create(data)
}
async function read(filter,proj) {
    return await songData.find(filter,proj)
}

async function readOne(filter,proj) {
    let res = await songData.find(filter,proj)
    return res[0]
}

async function update(id, newData) {
    return await songData.findOneAndUpdate( id, newData,{ new: true })
}
async function del(id) {
    return await update(id, { isActive: false })
}


module.exports = { create, read, update, del,readOne }
