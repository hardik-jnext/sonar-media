const { Model, DataTypes } = require("sequelize");




module.exports = (sequelize)=>{

class post extends Model{}
   
 post.init({
    title :{
        type : DataTypes.STRING,
        allowNull : false
    },
     caption :{
        type: DataTypes.STRING,
        allowNull: true
     },
     like :{
        type :DataTypes.BOOLEAN,
        defaultValue : false 
     },
     view : {
        type :DataTypes.INTEGER
     },
     comment :{
        type : DataTypes.STRING
     },
     status :{
        type : DataTypes.ENUM("schedule","publish","deleted","draft"),
         defaultValue : "draft"
     },
     post_date :{
         type : DataTypes.DATE
     },
     user_id :{
        type : DataTypes.INTEGER
    },
    receiver_id :{
        type: DataTypes.INTEGER
    },
    category_id :{
        type : DataTypes.INTEGER
    },
    subscriptions_id :{
        type : DataTypes.INTEGER
    }
    

 },{
    sequelize,
    modelName:post
 }) 
return post
}
