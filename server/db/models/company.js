const Sequelize = require('sequelize')
const db = require('../db')

const Company = db.define('company', {
  name: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Company
