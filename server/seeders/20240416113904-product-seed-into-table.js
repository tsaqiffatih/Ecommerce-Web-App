'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require ('../data/product.json')
              .map((e) => {
                e.createdAt = e.updatedAt = new Date()
                return e
              })

    console.log(data);

    await queryInterface.bulkInsert('Products',data, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
