const express = require("express")
const router = express.Router()
const {templateCreation} = require("../../Controllers/template.controller.js")


router.post("/template-create",templateCreation)


module.exports = router