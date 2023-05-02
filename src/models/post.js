const { Model, DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  class post extends Model {
    static associate(models){
      models.user.hasMany(db.post,{foreignKey :'user_id'})
      models.category.hasMany(db.post,{foreignKey:'category_id'})
    }
  }
  post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      like: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      view: {
        type: DataTypes.INTEGER,
      },
      comment: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM("schedule", "publish", "deleted", "draft"),
        defaultValue: "draft",
      },
      post_date: {
        type: DataTypes.DATE,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      receiver_id: {
        type: DataTypes.INTEGER,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
      subscriptions_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName : "post_tb",
      modelName: "post"
    }
  );
  return post;
};
