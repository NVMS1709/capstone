const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('question', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  difficulty: {
    type: Sequelize.ENUM,
    values: ['easy', 'medium', 'hard'],
    allowNull: false
  }
})

module.exports = Question
