var expect = require('chai').expect
var Authors = require('../models/authors')
var dbUtils = require('../neo4j/dbUtils')

describe('Authors', function () {
  describe('#createAuthor', function () {
    it('should return created object', function (done) {
      name = 'Abdurrezzak'
      Authors.createAuthor(dbUtils.getSession({}), name)
				.then(response => {
  expect(response['personname']).to.equal(name)
})
				.finally(done)
    })
  })
})
