const express = require('express')
const router = express.Router()
const userAuth = require('../../middleware/userAuth.js')

const insertBank = require("../../Controllers/bankDetail.controller.js")

router.post('/insert-bankdetail',userAuth,insertBank)



module.exports = router