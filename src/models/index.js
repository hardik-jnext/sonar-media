
const path = require('path')
const fs = require("fs")

const env = process.env.NODE_ENV || "development"
const config = require("../Config/config.json")[env]
global.config = config


 
const basename = path.basename(__filename)

const Sequelize = require("sequelize")
const sequelize = new Sequelize(global.config.DB.database,global.config.DB.username,global.config.DB.password,global.config.DB)
 



db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

fs
 .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });


Object.keys(db).forEach(modelName =>{
  if(db[modelName].associate){
    db[modelName].associate(db)
  }
})


// db.category.hasMany(db.post,{foreignKey:'category_id'})
// db.post.belongsTo(db.category)

try {
    sequelize.authenticate();
    console.log("Database Connected...");
  } catch (e) {
    console.log(e);
  }
  
  module.exports = db
