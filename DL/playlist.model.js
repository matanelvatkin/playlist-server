const mongoose = require("mongoose");
require("./songs.model");

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [
    {
      song: { type: mongoose.Schema.Types.ObjectId, ref: "song" },
      isActive: { type: Boolean, default: true },
    },
  ],
  createDate: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const playlistData = mongoose.model("playlist", playlistSchema);

module.exports = playlistData;
