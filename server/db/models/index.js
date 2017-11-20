const Question = require('./question')
const User = require('./user')
const Category = require('./category')
const Difficulty = require('./difficulty')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Category.hasMany(Question)
Question.belongsTo(Category)

Difficulty.hasMany(Question)
Question.belongsTo(Difficulty)

Question.belongsTo(User)
User.hasMany(Question)

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
  Difficulty
}
