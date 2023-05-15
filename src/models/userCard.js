const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class userCard extends Model {
    static associate(models) {
      models.user.hasOne(userCard, { foreignKey: "user_id" });
      userCard.belongsTo(db.user, { foreignKey: "user_id" });
    }
  }
  userCard.init(
    {
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      exp_month: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      exp_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cvc: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "userCard_tb",
    }
  );
  return userCard;
};
