const express = require("express");
const { validToken } = require("../auth");
const userRouter = express.Router();
const userService = require("../BL/user.service");
const { sendError } = require("../errController");
const multer = require("multer");
const upload = multer({dest:"avatar_image"})
/**
 * @swagger
 * tags:
 *  name: user
 * /api/user/login:
 *  post:
 *    tags: [user]
 *    description: Use to login need to send email and password
 *    parameters:
 *      - name: user
 *        in: body
 *        description: The user object
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              format: email
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: In a successful response return token
 *        content:
 *           application/json:
 *             schema:
 *               type: string
 *      '400':
 *        description: bad request
 *        content:
 *           application/json:
 *             schema:
 *               type: string
 */
userRouter.post("/login", async (req, res) => {
  try {
    const token = await userService.login(req.body);
    const user = await userService.getUser(req.body.email,"+favoritesSongs","favoritesSongs.song")
    res.send({token,user});
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * @swagger
 * tags:
 *  name: user
 * /api/user/register:
 *  post:
 *    tags: [user]
 *    description: Use to create a new user
 *    parameters:
 *      - name: user
 *        in: body
 *        description: The user object
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              format: email
 *            fName:
 *              type: string
 *            lName:
 *              type: string
 *            firstPassword:
 *              type: string
 *            secondPassword:
 *              type: string
 *    responses:
 *      '200':
 *        description: In a successful response return token
 *        content:
 *           application/json:
 *             schema:
 *               type: string
 *      '400':
 *        description: missing data
 *        content:
 *           application/json:
 *             schema:
 *               type: string
 */
userRouter.post("/register", async (req, res) => {
  try {
    const user = await userService.createUser(req.body,req.protocol+"://"+req.headers.host);
    res.send(user);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * @swagger
 * tags:
 *  name: user
 * /api/user/:
 *  get:
 *    tags: [user]
 *    description: Use to get user information
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: In a successful response return user information
 *      '401':
 *        description: token isn't exists
 *      '400':
 *        description: user not authorized
*/
userRouter.get("/", validToken, async (req, res) => {
  try {
    const user = await userService.getUser(req.email,"+favoritesSongs","favoritesSongs.song");
    res.status(200).send(user);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * @swagger
 * tags:
 *  name: user
 * /api/user/favorite:
 *  get:
 *    tags: [user]
 *    description: Use to get user favorite songs
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: In a successful response return user's favorite songs
 *      '401':
 *        description: user not authorized
 */
userRouter.get("/favorite", validToken, async (req, res) => {
  try {
    const user = await userService.getUser(req.email,"+favoritesSongs","favoritesSongs.song");
    res.status(200).send(user);
  } catch (err) {
    sendError(res, err);
  }
});
/**
 * @swagger
 * tags:
 *  name: user
 * /api/user/favorite:
 *  put:
 *    tags: [user]
 *    description: Use to add user favorite songs
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *      - name: song
 *        in: body
 *        description: The song object
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            duration_formatted:
 *              type: string
 *            image:
 *              type: string
 *            id:
 *              type: string
 *    responses:
 *      '200':
 *        description: In a successful response return user's favorite songs
 *      '401':
 *        description: user not authorized
 */
userRouter.put("/favorite", validToken, async (req, res) => {
  try {
    const user = await userService.addToFavoriteSong(req.body, req.email);
    res.status(200).send(user);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * @swagger
 * tags:
 *  name: user
 * /api/user/avatar:
 *  put:
 *    tags: [user]
 *    description: Use to add user favorite songs
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *      - name: song
 *        in: body
 *        description: The song object
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            duration_formatted:
 *              type: string
 *            image:
 *              type: string
 *            id:
 *              type: string
 *    responses:
 *      '200':
 *        description: In a successful response return user's favorite songs
 *      '401':
 *        description: user not authorized
 */
userRouter.put("/avatar", validToken,upload.single("avatar"), async (req, res) => {
  try {
    const user = await userService.changeAvatar(req.file, req.email,req.protocol+"://"+req.headers.host);
    res.status(200).send(user);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * @swagger
 * tags:
 *  name: user
 * /api/user/favorite/song/delete:
 *  put:
 *    tags: [user]
 *    description: Use to get user favorite songs
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *      - name: song
 *        in: body
 *        description: The song object
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *    responses:
 *      '200':
 *        description: In a successful response updating song to active false
 *      '401':
 *        description: user not authorized
 */
userRouter.put("/favorite/song/delete", validToken, async (req, res) => {
  try {
    const user = await userService.deleteSongFromFavorite(
      req.email,
      req.body.id
    );
    res.status(200).send(user);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * @swagger
 * tags:
 *  name: user
 * /api/user/delete:
 *  put:
 *    tags: [user]
 *    description: Use to delete a user
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: In a successful response return true
 *      '401':
 *        description: user not authorized
 */
userRouter.put("/delete", validToken, async (req, res) => {
    try {
      const user = await userService.deleteUser(req.email);
      res.status(200).send(!user.isActive);
    } catch (err) {
      sendError(res, err);
    }
  });
/**
 * @swagger
 * tags:
 *  name: user
 * /api/user/playlists:
 *  get:
 *    tags: [user]
 *    description: Use to get user's playlists
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: JWT token for authentication
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: In a successful response return user's playlists
 *      '401':
 *        description: user not authorized
 */
userRouter.get("/playlists", validToken, async (req, res) => {
    try {
      const user = await userService.getUserPlaylists(req.email);
      res.status(200).send(user);
    } catch (err) {
      sendError(res, err);
    }
  });



module.exports = userRouter;
