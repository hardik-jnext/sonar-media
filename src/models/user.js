const {DataTypes,Model} = require("sequelize");



module.exports = (sequelize)=>{

class user extends Model {}
user.status = {ACTIVE :"active",INACTIVE :"Inacitve"}
user.init({
   firstname : {
      type: DataTypes.STRING,
      allowNull : false
     },
   lastname :{
      type : DataTypes.STRING,
      allowNull: false
   },
   email :{
      type : DataTypes.STRING,
      allowNull : false
   },
   password :{
      type : DataTypes.STRING,
      allowNull : false
   },
   otp :{
      type : DataTypes.INTEGER
   },
   otp_expiry :{
      type : DataTypes.DATE
   },
  status :{
      type : DataTypes.ENUM,
      values : Object.values(user.status),
      defaultValue : user.status.INACTIVE
  },is_verify : {
      type : DataTypes.BOOLEAN,
      defaultValue : 0 
  },
  stripe_id :{
   type : DataTypes.STRING
  }
}, {
  sequelize, 
  tableName: 'user_tb'
});
     return user
}


