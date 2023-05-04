const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class subscription extends Model {
    static associate(models){
        models.user.hasMany(subscription,{foreignKey :'user_id'})
        subscription.belongsTo(db.user,{foreignKey: 'user_id'})
      }
  }
  subscription.init({
    subscription_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost :{
        type : DataTypes.INTEGER,
        allowNull: false
    },
    payment_period :{
        type : DataTypes.ENUM('Monthly',"yearly"),
        allowNull: false
    },
    description :{
        type : DataTypes.STRING,
        allowNull :  false
    },
    user_id :{
         type : DataTypes.INTEGER,
         allowNull: false
    }
  },{
    sequelize
  });
  return subscription;
};
