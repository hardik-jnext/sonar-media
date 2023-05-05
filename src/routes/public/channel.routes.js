const express = require("express");
const router = express.Router();
const {
  channelCreate,
  uploadCoverImage,
  uploadProfileImage,
  addDescription,
  gethome,
  feed,
  getSubscription,
} = require("../../Controllers/channel.controller.js");
const fileUpload = require("../../middleware/fileUpload.js");
const userAuth = require("../../middleware/userAuth.js");



router.post("/channel-create", userAuth, channelCreate);

router.post("/upload-cover", userAuth, fileUpload, uploadCoverImage);

router.post("/upload-profileimage", userAuth, fileUpload, uploadProfileImage);

router.post("/add-description", userAuth, addDescription);

router.get("/channel-home", gethome);

router.get("/feed", userAuth, feed);

router.get("/subscription", getSubscription);

module.exports = router;
