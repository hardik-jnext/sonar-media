const express = require("express")
const router = express.Router()
const {userRegistration,userlogin,userVerify,forgetPasswordmail,forgotPassword,test} = require("../../Controllers/user.controller.js")
const validator = require("../../validator/user.validator.js")

router.post("/Signup",validator.registerUservalid(),userRegistration)
router.post("/signin",validator.loginUservalid,userlogin)
router.get("/userVerify/:otp",validator.userVerifyvalid,userVerify)    

      // forgot  password mail
router.get("/forgotpasswordmail",validator.forgotPasswordmailValid,forgetPasswordmail)
       // forgot  password
router.put("/forgotpassword",validator.forgetPasswordvalid,forgotPassword)   




module.exports = router