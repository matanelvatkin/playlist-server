const express = require("express");
const { validToken } = require("../auth");
const playlistService = require("../BL/playlist.service");
const { sendError } = require("../errController");
const playlistRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: playlist
 * /api/playlist/{playlistId}:
 *  get:
 *    tags: [playlist]
 *    description: Use to get playlist
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *      - name: playlistId
 *        in: path
 *        description: id's playlist
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: In a successful response return user playlists
 *      '401':
 *        description: user not authorized
 */
playlistRouter.get("/:playlistId", validToken, async (req, res) => {
  try {
    const playlist = await playlistService.getPlaylist(req.params.playlistId);
    res.status(200).send(playlist);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * @swagger
 * tags:
 *  name: playlist
 * /api/playlist:
 *  post:
 *    tags: [playlist]
 *    description: Use to create playlist
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *      - name: name
 *        in: body
 *        description: name's playlist
 *        required: true
  *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *    responses:
 *      '200':
 *        description: In a successful response return playlist
 *      '401':
 *        description: user not authorized
 */

playlistRouter.post("/", validToken, async (req, res) => {
  try {
    const playlist = await playlistService.createNewPlaylist(req.body,req.email);
    res.status(200).send(playlist);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * @swagger
 * tags:
 *  name: playlist
 * /api/playlist/song:
 *  put:
 *    tags: [playlist]
 *    description: Use to add song to playlist
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *      - name: song details
 *        in: body
 *        description: song details
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *            id:
 *              type: string
 *            title:
 *              type: string
 *            duration_formatted:
 *              type: string
 *            image:
 *              type: string
 *    responses:
 *      '200':
 *        description: In a successful response return playlist
 *      '401':
 *        description: user not authorized
 */

playlistRouter.put("/song", validToken, async (req, res) => {
  try {
    const playlist = await playlistService.addSongToPlaylist(req.body);
    res.status(200).send(playlist);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * @swagger
 * tags:
 *  name: playlist
 * /api/playlist/delete:
 *  put:
 *    tags: [playlist]
 *    description: Use to delete playlist
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *      - name: playlisy id
 *        in: body
 *        description: id's playlist
 *        schema:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: In a successful response return "delete suscceded"
 *      '401':
 *        description: user not authorized
 */

playlistRouter.put("/delete", validToken, async (req, res) => {
  try {
    await playlistService.deletePlaylist(req.body);
    res.status(200).send("delete suscceded");
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * @swagger
 * tags:
 *  name: playlist
 * /api/playlist/song/delete:
 *  put:
 *    tags: [playlist]
 *    description: Use to delete song from playlist
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *      - name: song details
 *        in: body
 *        description: song id and playlist id
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            playlistId:
 *              type: string
 *            songId:
 *              type: string
 *    responses:
 *      '200':
 *        description: In a successful response return playlist
 *      '401':
 *        description: user not authorized
 */

playlistRouter.put("/song/delete", validToken, async (req, res) => {
  try {
    const playlist = await playlistService.deleteSong(req.body);
    res.status(200).send(playlist);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * @swagger
 * tags:
 *  name: playlist
 * /api/playlist/rename:
 *  put:
 *    tags: [playlist]
 *    description: Use to update playlist's name
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *      - name: playlist id
 *        in: body
 *        description: song id and playlist id
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            playlistId:
 *              type: string
 *            name:
 *              type: string
 *    responses:
 *      '200':
 *        description: In a successful response return playlist
 *      '401':
 *        description: user not authorized
 */

playlistRouter.put("/rename", validToken, async (req, res) => {
  try {
    const playlist = await playlistService.changePlaylistName(req.body);
    res.status(200).send(playlist);
  } catch (err) {
    sendError(res, err);
  }
});

module.exports = playlistRouter;
