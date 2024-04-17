'use strict';
const { log } = require('console');
const fs = require ('fs');
const { hashPassword } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require ('../data/user.json')
              .map((e) => {
                e.password = hashPassword(e.password)
                e.createdAt = e.updatedAt = new Date()
                return e
              })

    console.log(data);

    await queryInterface.bulkInsert('Users',data, {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
