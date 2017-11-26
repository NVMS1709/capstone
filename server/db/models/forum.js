const Sequelize = require('sequelize')
const db = require('../db')
const ForumComment = require('./forumComment')

const Forum = db.define('forum', {
  title: {
    type: Sequelize.STRING
  },
  comment: {
    type: Sequelize.STRING(3000),
    defaultValue: ''
  }
})

module.exports = Forum
