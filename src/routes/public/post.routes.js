const express = require("express")
const router = express.Router()
const createPost  = require("../../Controllers/post.controller.js")
const userAuth = require("../../middleware/userAuth.js")

router.post("/create-post",userAuth,createPost)





module.exports = router