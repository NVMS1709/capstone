const Question = require('./question')
const User = require('./user')
const Category = require('./category')
const Difficulty = require('./difficulty')
const Comment = require('./comment')
const Forum = require('./forum')
const ForumComment = require('./forumComment')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

ForumComment.belongsTo(Forum)
Forum.hasMany(ForumComment, { onDelete: 'cascade', hooks: true })

ForumComment.belongsTo(User)
User.hasMany(ForumComment, { onDelete: 'cascade', hooks: true })

Forum.belongsTo(User)
User.hasMany(Forum, { onDelete: 'cascade', hooks: true })

Category.hasMany(Question)
Question.belongsTo(Category)

Difficulty.hasMany(Question)
Question.belongsTo(Difficulty)

Question.belongsTo(User)
User.hasMany(Question)

Question.hasMany(Comment, { onDelete: 'cascade', hooks: true })
Comment.belongsTo(Question)

User.hasMany(Comment, { onDelete: 'cascade', hooks: true })
Comment.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  Question,
  User,
  Category,
  Difficulty,
  Comment,
  Forum,
  ForumComment
}
