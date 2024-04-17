'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {

      Product.belongsToMany(models.Order, { through: 'OrderProduct'});
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'name is required' },
        notEmpty: { msg: 'name is required' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'price is required' },
        notEmpty: { msg: 'price is required' },
        min: { args: [0], msg: 'Price must be greater than or equal to 0' }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'ImageUrl is required' },
        notEmpty: { msg: 'ImageUrl is required' }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product; 
};
