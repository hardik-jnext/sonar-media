const multer = require("multer")
const path = require("path")




const uploadsPath = path.join(__dirname,"../uploads")
const uploads  = multer({
 storage:multer.diskStorage({
    destination : uploadsPath,
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
 })
}).array('upload')


module.exports = uploads