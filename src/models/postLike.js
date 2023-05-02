const {Sequelize,DataTypes,Model} = require('sequelize')



module.exports = (sequelize) =>{
class postLike extends Model{
    static associate(models){
        models.user.hasMany(db.postLike,{foreignKey:'user_id'})
        models.post.hasMany(db.postLike,{foreignKey:'post_id'})
    }
}
postLike.init({
  user_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  post_id:{
    type : DataTypes.INTEGER,
    allowNull : false
  }
},{
    sequelize,
    tableName:"postLike",
    modelName:"postLike"
})
return postLike
}