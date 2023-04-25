const express = require("express")
const router = express.Router()
const {userRegistration,userlogin,userVerify,forgetPasswordmail,forgotPassword,} = require("../Controllers/user.controller.js")
const {celebrate} = require("celebrate")
const {registerUservalid,loginUservalid,userVerifyvalid,forgotPasswordmailValid,forgetPasswordvalid} = require("../validator/user.validator.js")

router.post("/Signup",celebrate(registerUservalid),userRegistration)
router.post("/signin",celebrate(loginUservalid),userlogin)
router.get("/userVerify/:otp",celebrate(userVerifyvalid),userVerify)    

      // forgot  password mail
router.get("/forgotpasswordmail",celebrate(forgotPasswordmailValid),forgetPasswordmail)
       // forgot  password
router.put("/forgotpassword",celebrate(forgetPasswordvalid),forgotPassword)   





module.exports = router