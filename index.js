const express = require("express")
const app = express()
const body = require("body-parser")
const db = require("./src/models/index.js")
const router = require('./src/routes/public/user.routes.js')
const i18n = require("./src/helpers/i18n.helper.js")
const env = process.env.NODE_ENV || "development"
const config = require("./src/Config/config.json")[env]
global.config = config
const  hadleErrorMessage  = require('./src/middleware/errorHandle.js')


app.use(body.json())

db.sequelize.sync({alter : true})



app.use(i18n.init)

app.use("/user",router)

app.use(hadleErrorMessage)

app.listen(config.PORT,()=>{
    console.log(`Server running at port no.${config.PORT}`);
})