'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: 'Full Name Is Required'},
          notEmpty: {msg: 'Full Name Is Required'}
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        validate: {
          notNull: {msg: 'Email Is Required'},
          notEmpty: {msg: 'Email Is Required'},
          isEmail:{msg: 'Invalid Email Format'}
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: 'Password Is Required'},
          notEmpty: {msg: 'Password Is Required'},
          len: {msg: 'Password must be at least 8 characters long'}
        }
      },
      phoneNumber: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};