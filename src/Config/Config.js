const Sequelize = require("sequelize")
const sequelize = new Sequelize("Sonar_media_practice_db","root","",{
    host : "localhost",
    dialect : "mysql",
    logging  : false
})




db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
db.user = require("../models/user.model.js")(sequelize,Sequelize)



try {
    sequelize.authenticate();
    console.log("Database Connected...");
  } catch (e) {
    console.log(e);
  }
  
  module.exports = db