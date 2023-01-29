const userData = require("./user.model");
require("./playlist.model");
require("./songs.model");

async function create(data) {
  return await userData.create(data);
}
async function read(filter, proj,populate) {
  return await userData.find(filter, proj).populate(populate)
}

async function readOne(filter, proj,populate) {
  let res = await userData.find(filter, proj).populate(populate)
  return res[0];
}

async function update(id, newData,populate) {
  return await userData
    .findOneAndUpdate(id, newData, { new: true })
    .populate(populate);
}
async function del(id) {
  return await update(id, { isActive: false });
}

module.exports = { create, read, update, del, readOne };
