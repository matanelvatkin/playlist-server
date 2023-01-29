const playlistController = require("../DL/playlist.controller");
const { errMessage, checkData } = require("../errController");
const { getSong, createSong } = require("./songs.service");
const { addToPlaylist } = require("./user.service");

const getPlaylist = async (_id) => {
  const playlist = await playlistController.readOne({_id});
  if (!playlist) throw errMessage.PLAYLIST_NOT_FOUND;
  return playlist;
};

const createNewPlaylist = async ({name},email) => {
  checkData({email, name }, ["email", "name"]);
  var newPlaylist = await playlistController.create({name});
  const pushToUser = await addToPlaylist({
    _id: newPlaylist._id,
    email: email,
  });
  return pushToUser;
};

const deletePlaylist = async (data) => {
  checkData({_id:data._id }, ["_id"]);
  const playlist = await playlistController.del(data._id);
  if (playlist.isActive) throw errMessage.TRY_AGAIN;
  return true;
};

const changePlaylistName = async (data) => {
  checkData(data, ["_id", "name"]);
  const playlist = await playlistController.update(
    { _id: data._id },
    { name: data.name }
  );
  if (!playlist.isActive) throw errMessage.PLAYLIST_NOT_FOUND;
  return playlist;
};

const addSongToPlaylist = async (data) => {
  checkData(data, ["_id", "id"]);
  var playlist = await getPlaylist({ _id: data._id });
  var song = await getSong(data.id);
  if (!song) {
    delete data._id;
    song = await createSong(data);
  } else if (song && playlist.songs.length > 0) {
    const isExist = playlist.songs.find((s) => s._id === song._id);
    if (isExist) throw errMessage.SONG_IS_EXISTS;
  }
  playlist = playlistController.update(
    { _id: playlist._id },
    { $push: { songs: { song: song._id } } }
  );
  return playlist;
};

const deleteSong = async ({playlistId, songId}) => {
  const playlist = await playlistController.update(
    { _id: playlistId, "songs.song": songId },
    { $set: { "songs.$.isActive": false } }
  );
  return playlist;
};

module.exports = {
  getPlaylist,
  createNewPlaylist,
  deletePlaylist,
  changePlaylistName,
  addSongToPlaylist,
  deleteSong
};
