const express = require('express');
const mainRouter = express.Router()
const userRouter = require('./userRouter')
const playlistRouter = require('./playlistRouter')
const auth = require('../auth')

mainRouter.use("/user",userRouter)
mainRouter.use("/playlist",auth.validToken,playlistRouter)


module.exports = mainRouter
