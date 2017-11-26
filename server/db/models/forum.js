const Sequelize = require('sequelize')
const db = require('../db')

const Forum = db.define('forum', {
  title: {
    type: Sequelize.STRING
  },
  commentNum: {
    type: Sequelize.INTEGER
  }
})

module.exports = Forum
