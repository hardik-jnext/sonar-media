const {Model,DataTypes} = require("sequelize")

module.exports = (sequelize)=>{
class Template extends Model{}
Template.init({
    template_name :{
        type:DataTypes.STRING,
        allowNull: false
    },
    description :{
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    sequelize,
    tableName:"template_tb"

})
 return Template
}