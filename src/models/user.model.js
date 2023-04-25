const {DataTypes} = require("sequelize")


module.exports = (sequelize,Sequelize)=>{

const user  = sequelize.define("user",{
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
    type : DataTypes.ENUM("Active","InActive"),
    defaultValue :"InActive"
},is_verify : {
    type : DataTypes.BOOLEAN,
    defaultValue : 0 
}
},{
    tableName: 'user_tb'
})
 return user
}

