const Sequelize = require('sequelize')
const db = require('../db')

const Forum = db.define('forum', {
  title: {
    type: Sequelize.STRING
  },
  commentNum: {
    type: Sequelize.INTEGER
  },
  comment: {
    type: Sequelize.STRING(3000),
    defaultValue: ''
  }
})

module.exports = Forum
