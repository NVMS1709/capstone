const { expect } = require('chai')
const request = require('supertest')

const db = require('../../db')
const app = require('../../index')
const User = db.model('user')
const testData = require('./testData')

describe('[User Route Tests]', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Determine if data is coming from specific GET requests', () => {

    beforeEach(() => {
      return User.bulkCreate(testData.Users)
    })

    xit('GET request to /api/users/ path', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal('Cody')
          expect(res.body[0].id).to.be.equal(1)
          expect(res.body[0].email).to.be.equal('cody@puppybook.com')
        })
    })

    xit('GET request to a specific user', () => {
      return request(app)
        .get('/api/users/2')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[1].name).to.be.equal('Stephanie')
          expect(res.body[1].id).to.be.equal(2)
          expect(res.body[1].email).to.be.equal('stephis@thebest.com')
        })
    })

    xit('Check is Stephanie has a questions solved attribute', () => {
      return request(app)
        .get('/api/users/2')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[1].questionsSolved).to.be.equal([])
        })
    })

  })
})
