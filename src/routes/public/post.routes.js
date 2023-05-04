const express = require("express")
const router = express.Router()
const {getpost,createPost,imageInsert,updatePost,postDelete,deletecontent } = require("../../Controllers/post.controller.js")
const userAuth = require("../../middleware/userAuth.js")
const fileUpload = require('../../middleware/fileUpload.js')



router.get('/all-post',userAuth,getpost)

router.post("/create-post",userAuth,createPost)


router.post('/upload-content',fileUpload,imageInsert)


router.put("/post-update",userAuth,updatePost)


router.delete("/post-delete/:id",postDelete)

router.delete("/content-delete/:id",deletecontent)



module.exports = router