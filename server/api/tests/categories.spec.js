const Promise = require('bluebird')
const { expect } = require('chai')
const request = require('supertest')

const db = require('../../db')
const app = require('../../index')
const Category = db.model('category')

describe('[CATEGORIES ROUTE]', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('[API Categories Route Tests]', () => {
    beforeEach(() => {
      return Category.create({
        name: 'Arrays',
        description: 'An array is a collection of items stored at continuous memory locations. Each item (element) is accessible by their index.'
      })
    })

    it('GET request to /api/categories/', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal('Arrays')
          expect(res.body[0].description).to.be.equal('An array is a collection of items stored at continuous memory locations. Each item (element) is accessible by their index.')
        })
    })
  })
})
