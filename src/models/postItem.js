const { Model, DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  class postItem extends Model {
    static associate(models) {
      models.post.hasMany(postItem, { foreignKey: "post_id" });
      postItem.belongsTo(models.post,{foreignKey:"post_id"})
    }
  }
  {
    postItem.status = {
      ACTIVE: "Active",
      PENDING: "pending",
      DELETED: "deleted",
    };
    postItem.init(
      {
        post_content: {
          type: DataTypes.STRING,
        },
        post_type: {
          type: DataTypes.ENUM("text", "video", "audio", "image"),
        },
        status: {
          type: DataTypes.ENUM("Active", "pending", "deleted"),
          values: Object.values(postItem.status),
          defaultValue: postItem.status.ACTIVE,
        },
        post_id: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: "postItem",
        tableName: "post_item",
      }
    );
  }

  return postItem
}
