const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class bankDetail extends Model {
    static associate(models) {
      models.user.hasOne(bankDetail, { foreignKey: "user_id" });
      bankDetail.belongsTo(db.user, { foreignKey: "user_id" });
    }
  }
  bankDetail.init(
    {
      Account_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bsb: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Account_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "bankDetail_tb",
    }
  );
  return bankDetail;
};
