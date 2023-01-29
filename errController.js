const errModel = (code, message) => {
  return { code: code, message: message };
};

const errMessage = Object.freeze({
  USER_NOT_FOUND: errModel(400, "user not found"),
  MISSING_DATA: errModel(400, "missing data"),
  PASSWORDS_ARE_NOT_EQUAL: errModel(401, "passwords are not equal"),
  PASSWORDS_ARE_NOT_CORRECT: errModel(401, "email or password do not match"),
  CAN_NOT_CREATE_TOKEN: errModel(501, "try again later"),
  THE_SONG_IS_ALREADY_FAVORITE: errModel(999, "the song is already favorite"),
  CAN_NOT_CREATE_NEW_PLAYLIST: errModel(999, "try again"),
  THE_SONG_NOT_FOUND: errModel(400, "song not found"),
  PLAYLIST_NOT_FOUND: errModel(400, "playlist not found"),
  TRY_AGAIN: errModel(999, "try again"),
  SONG_IS_EXIST: errModel(999, "songe is already exists"),
  UNAUTHORIZED: errModel(401, "unauthorized"),
});

const checkData = (data, parameters) => {
  parameters.forEach((parameter) => {
    if (!data[parameter]) throw errMessage.MISSING_DATA;
  });
};

const sendError = (res, err) => {
  console.log(err);
  res.status(err.code||999).send(err.message || "try again later")
}

module.exports = { errMessage, checkData, sendError };
