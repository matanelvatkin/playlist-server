const songsController = require("../DL/songs.controller");
const { checkData } = require("../errController");

const getSong = async (id) => {
  const song = await songsController.readOne({ id });
  return song;
};

const createSong = async (data) => {
  checkData(data, ["id", "title", "duration_formatted", "image"]);
  var newSong = await getSong(data.id);
  if (newSong) return newSong._id;
  await songsController.create(data);
  newSong = await getSong(data.id);
  return newSong._id;
};

module.exports = { getSong, createSong };
