/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const Question = db.model('question')

describe('[Question Model]', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('correct name', () => {
    let example

    beforeEach(() => {
      return Question.create({
        name: 'Binary Search',
        description: 'Traverse binary tree'
      })
        .then(question => {
          example = question
        })
    })

    // Check the association, difficulty isn't being loaded in correctly.
    it('returns correct name', () => {
      expect(example.name).to.be.equal('Binary Search')
    })
  })
})
