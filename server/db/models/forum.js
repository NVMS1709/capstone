const Sequelize = require('sequelize')
const db = require('../db')
const ForumComment = require('./forumComment')

const Forum = db.define('forum', {
  title: {
    type: Sequelize.STRING
  },
  commentNum: {
    type: Sequelize.INTEGER,
    get() {
      let commentNumber = ForumComment.findAll().then(comments => {
        comments.forEach(comment => {
          if (comment.forumId === this.id) commentNumber++
        })
      })
    }
  },
  comment: {
    type: Sequelize.STRING(3000),
    defaultValue: ''
  }
})

module.exports = Forum
