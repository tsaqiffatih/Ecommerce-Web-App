'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

    static associate(models) {
      // define association here
      Order.belongsTo(models.User,{
        foreignKey: 'userId', 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Order.belongsToMany(models.Product, { through: 'OrderProduct' });
    }
  }
  Order.init({
    userId:{ 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalAmount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    transactionToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};