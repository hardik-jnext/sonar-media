const express = require("express")
const router = express.Router()
const {createSubscription,deleteSubscription,getSubscrition} = require('../../Controllers/subscription.controller.js')
const userAuth = require("../../middleware/userAuth.js")


router.post('/create-subscription',userAuth,createSubscription)

router.delete("/delete-subscription/:subscription_id",deleteSubscription)

router.get("/getSubscription",getSubscrition)

module.exports = router