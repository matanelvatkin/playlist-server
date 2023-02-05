const mongoose = require("mongoose");
require("./songs.model");
require("./playlist.model");

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  gender: {
    enum: ['male', 'female'],
    type: String,
  } ,
  avatar: {
    type: String,
  } ,
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "playlist" ,select:false}],
  favoritesSongs: [{song:{ type: mongoose.Schema.Types.ObjectId, ref: "song" },isActive:{type:Boolean,default:true},select:false}],
  createDate: {
    type: Date,
    default: Date.now,
  },
  permission: {
    type: String,
    enum: ["admin", "editor", "viewer"],
    default: "viewer",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const userData = mongoose.model("user", userSchema);

module.exports = userData;
