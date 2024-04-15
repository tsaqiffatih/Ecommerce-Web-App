'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Product.belongsTo(models.User, { foreignKey: 'userId' });
      Product.belongsToMany(models.Category, { through: 'ProductCategory', foreignKey: 'productId' });
      Product.hasMany(models.ShoppingCart, { foreignKey: 'productId' });
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'description is required' },
        notEmpty: { msg: 'description is required' }
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'userId is required' },
        notEmpty: { msg: 'userId is required' }
      },
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product; 
};
