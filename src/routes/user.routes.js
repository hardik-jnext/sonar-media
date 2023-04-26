const express = require("express")
const router = express.Router()
const {userRegistration,userlogin,userVerify,forgetPasswordmail,forgotPassword,} = require("../Controllers/user.controller.js")
const {registerUservalid,loginUservalid,userVerifyvalid,forgotPasswordmailValid,forgetPasswordvalid} = require("../validator/user.validator.js")

router.post("/Signup",registerUservalid,userRegistration)
router.post("/signin",loginUservalid,userlogin)
router.get("/userVerify/:otp",userVerifyvalid,userVerify)    

      // forgot  password mail
router.get("/forgotpasswordmail",forgotPasswordmailValid,forgetPasswordmail)
       // forgot  password
router.put("/forgotpassword",forgetPasswordvalid,forgotPassword)   





module.exports = router