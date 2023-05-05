const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class channel extends Model {
    static associate(models){
        models.user.hasMany(channel,{foreignKey :'user_id'})
        channel.belongsTo(db.user,{foreignKey: 'user_id'})
        models.Template.hasMany(channel,{foreignKey:'template_id'})
        channel.belongsTo(db.Template,{foreignKey:'template_id' })
      }
    }
  channel.status = {
    ACTIVE: "Active",
    PENDING: "pending",
    DELETED: "deleted",
  };
  channel.init(
    {
      channel_name: {
        type: DataTypes.STRING,
      },
      template_id: {
        type: DataTypes.INTEGER,
      },
      created_date: {
        type: DataTypes.DATE,
      },
      cover_image: {
        type: DataTypes.STRING,
      },
      profile_image: {
        type: DataTypes.STRING,
      },
      about: {
        type: DataTypes.STRING(512),
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.values(channel.status),
        defaultValue: channel.status.ACTIVE,
      },
    },
    {
      sequelize,
      modelName: 'channel',
      tableName: 'channel_tb'
    }
  );
  return channel;
};
