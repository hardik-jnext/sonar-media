const express = require("express")
const router = express.Router()
const {createPost,imageInsert } = require("../../Controllers/post.controller.js")
const userAuth = require("../../middleware/userAuth.js")
const fileUpload = require('../../middleware/fileUpload.js')



router.post("/create-post",userAuth,createPost)


router.post('/upload-content',fileUpload,imageInsert)


module.exports = router