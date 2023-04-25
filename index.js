const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const body = require("body-parser")
const db = require("./src/Config/Config.js")
const router = require('./src/routes/user.routes.js')
const {I18n} = require("i18n")
const path = require('path')

app.use(body.json())

db.sequelize.sync({alter : false})


const i18n = new I18n({
    locales :['en','de','fr'],
    directory : path.join(__dirname,'/src/translation'),
    defaultLocale : 'en',
    header :'accept-language'   
})

app.use(i18n.init)

app.use("/user",router)

app.listen(port,()=>{
    console.log(`Server runnning at port no.${port}`);
})