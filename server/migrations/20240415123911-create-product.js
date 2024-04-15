'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          notNull: {msg: 'name is required'},
          notEmpty: {msg: 'name is required'}
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          notNull: {msg: 'description is required'},
          notEmpty: {msg: 'description is required'}
        }
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
          notNull: {msg: 'price is required'},
          notEmpty: {msg: 'price is required'}
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
          notNull: {msg: 'userId is required'},
          notEmpty: {msg: 'userId is required'}
        },
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};