const bcrypt = require("bcrypt");
const { createToken } = require("../auth");
const userController = require("../DL/user.controller");
const { errMessage, checkData } = require("../errController");
const { getSong, createSong } = require("./songs.service");
const SALTROUNDS = Number(process.env.SALTROUNDS);

const getUser = async (email, proj = undefined,populate) => {
  const user = await userController.readOne({ email }, proj,populate);
  if (!user && !user.isActive) throw errMessage.USER_NOT_FOUND;
  return user;
};

const getUserForRegister = async (email, proj = undefined) => {
  const user = await userController.readOne({ email }, proj);
  if (user) throw errMessage.USER_IS_EXIST;
  return user;
};

const login = async (data) => {
  checkData(data, ["email", "password"]);
  const user = await getUser(data.email, "+password");
  const isEqual = bcrypt.compareSync(data.password, user.password);
  if (!isEqual) throw errMessage.PASSWORDS_ARE_NOT_CORRECT;
  const token = createToken(user.email);
  return token;
};

const createUser = async (data) => {
  checkData(data, [
    "fName",
    "lName",
    "email",
    "firstPassword",
    "secondPassword",
  ]);
  if (data.firstPassword !== data.secondPassword)
    throw errMessage.PASSWORDS_ARE_NOT_EQUAL;
  await getUserForRegister(data.email);
  data.password = bcrypt.hashSync(data.firstPassword, SALTROUNDS);
  return await userController.create(data);
};

const addToFavoriteSong = async (data, email) => {
  checkData({ ...data, email }, [
    "id",
    "email",
  ]);
  const user = await getUser(email,"favoritesSongs","favoritesSongs.song");
  var song = await getSong(data.id);
  var isUpdated = false;
  if (!song) {
    song = await createSong(data);
  } else if (song && user.favoritesSongs.length > 0) {
    if (user.favoritesSongs.find((obj) => obj.song.id === song.id)) {
      await userController.update(
          { email, "favoritesSongs.song": song._id } ,
        { $set: { "favoritesSongs.$.isActive": true } },"favoritesSongs.song"
      );
      isUpdated = true;
    }
  }
  if (!isUpdated) {
    await userController.update(
      { _id: user._id },
      { $push: { "favoritesSongs": {song:song._id,isActive:true} } } ,"favoritesSongs.song"
    );
  }
  return await getUser(email,"favoritesSongs","favoritesSongs.song");
};

const addToPlaylist = async (data) => {
  checkData(data,["_id", "email"]);
  const updatedUser = await userController.update(
    {email:data.email },
    { $push: { playlists: data._id } }, "playlists"
  );
  return updatedUser;
};

const getUserPlaylists = async (email) => {
  checkData({ email }, ["email"]);
  const user = await getUser(email,"+playlists","playlists");
  const playlist = user.playlists.filter((playlist) => playlist.isActive);
  return playlist;
};

const deleteUser = async (email) => {
  const user = await getUser(email);
  userController.del({ _id: user._id });
  return true;
};

const deleteSongFromFavorite = async (email, id) => {
  checkData({ email, id }, ["email", "id"]);
  const song = await getSong(id)
  const isUpdated = await userController.update({ email, "favoritesSongs.song": song._id },
    { $set: { "favoritesSongs.$.isActive": false } },"favoritesSongs.song");
  if (!isUpdated) throw errMessage.TRY_AGAIN;
  return isUpdated;
};

module.exports = {
  login,
  createUser,
  getUserForRegister,
  getUser,
  addToFavoriteSong,
  addToPlaylist,
  getUserPlaylists,
  deleteUser,
  deleteSongFromFavorite,
};
