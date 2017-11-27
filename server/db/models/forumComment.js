const Sequelize = require('sequelize')
const db = require('../db')

const ForumComment = db.define('forumComment', {
  comment: {
    type: Sequelize.STRING(3000)
  }
})

module.exports = ForumComment
