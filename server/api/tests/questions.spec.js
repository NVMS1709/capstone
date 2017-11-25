const { expect } = require('chai')
const request = require('supertest')

const db = require('../../db')
const app = require('../../index')
const Question = db.model('question')
const Category = db.model('category')
const testData = require('./testData')

describe('[QUESTIONS ROUTE]', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('[API Questions Route Tests]', () => {
    console.log('hello', testData.Question[0])
    beforeEach(() => {
      const OPTIONS = { validate: true, individualHooks: true }
      return Category.bulkCreate(testData.Categories, OPTIONS)
        .then(() => { return Question.bulkCreate(testData.Question, OPTIONS) })
    })

    it('GET request to /api/questions/', () => {
      return request(app)
        .get('/api/questions')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal('Is Unique')
          expect(res.body[0].description).to.be.equal(
            'Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?'
          )
          expect(res.body[0].categoryId).to.be.equal(1)
        })
    })
  })
})
