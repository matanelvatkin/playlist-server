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

async function update(filter, newData,populate) {
  return await userData
    .findOneAndUpdate(filter, newData, { new: true })
    .populate(populate);
}
async function del(filter) {
  return await update(filter, { isActive: false });
}

module.exports = { create, read, update, del, readOne };
