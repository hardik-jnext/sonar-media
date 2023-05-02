const express = require("express")
const app = express()
const body = require("body-parser")
const db = require("./src/models/index.js")
const userRouter = require('./src/routes/public/user.routes.js')
const postRouter = require('./src/routes/public/post.routes.JS')
const i18n = require("./src/helpers/i18n.helper.js")
const env = process.env.NODE_ENV || "development"
const config = require("./src/Config/config.json")[env]
global.config = config
const  hadleErrorMessage  = require('./src/middleware/errorHandle.js')






app.use(body.json())

db.sequelize.sync({alter : false})


app.use(i18n.init)

app.use("/user",userRouter)
app.use("/post",postRouter)



app.use(hadleErrorMessage)

app.listen(config.PORT,()=>{
    console.log(`Server running at port no.${config.PORT}`);
})