const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class category extends Model {
    static associate(models){
    models.channel.hasMany(category,{foreignKey :'channel_id'})
    category.belongsTo(db.channel,{foreignKey: 'channel_id'})

  }
}
  category.status = { ACTIVE: "active", DELETED: "deleted" };
  category.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.values(category.status),
        defaultValue: category.status.ACTIVE,
      },
      channel_id :{
        type:DataTypes.INTEGER
      }
    },
    {
      sequelize,
      tableName:"category_tb" ,
      modelName:"category",
    }
  )
  return category
};

