const express = require("express")
const router = express.Router()
const {templateCreation,templateList} = require("../../Controllers/template.controller.js")


router.post("/template-create",templateCreation)

router.get('/template-list',templateList)

module.exports = router