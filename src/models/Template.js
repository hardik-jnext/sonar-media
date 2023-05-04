const {Model,DataTypes} = require("sequelize")

module.exports = (sequelize)=>{
class Template extends Model{}
Template.init({
    template_name :{
        type:DataTypes.STRING
    },
    description :{
        type : DataTypes.STRING
    }
},{
    sequelize,
    tableName:"template_tb"

})
 return Template
}