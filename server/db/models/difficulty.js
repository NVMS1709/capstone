const Sequelize = require('sequelize')
const db = require('../db')

const Difficulty = db.define('difficulty', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

module.exports = Difficulty;
