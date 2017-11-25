const Sequelize = require('sequelize')
const db = require('../db')

const Comment = db.define('comment', {
  comment: {
    type: Sequelize.STRING(3000)
  }
})

module.exports = Comment
