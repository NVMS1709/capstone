/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Question = db.model('question')

describe('Question model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('correct name', () => {
    let example

    beforeEach(() => {
      return Question.create({
        name: 'Binary Search',
        description: 'Traverse binanry tree',
        type: 'BST',
        difficulty: '3'
      })
        .then(question => {
          example = question
        })
    })

    it('returns correct name', () => {
      expect(example.name).to.be.equal('Binary Search')
    })
  })
})
