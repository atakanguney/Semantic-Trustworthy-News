var expect = require('chai').expect
var Users = require('../../models/users')
var dbUtils = require('../../neo4j/dbUtils')
var _ = require('lodash')

const assert = require('assert')

describe('Users Test', function () {
  describe('Register User', function () {
    var username = 'Kamil'
    var password = '12345'
    var wrongPassword = '1234'

    it('should register the user', function (done) {
      Users.register(username, password).then(user => {
        expect(_.has(user, 'username')).to.be.true
        expect(_.has(user, 'id')).to.be.true
        expect(_.has(user, 'password')).to.be.true
        expect(_.has(user, 'apikey')).to.be.true
        done()
      })
    })

    it('should login', function (done) {
      Users.login(username, password).then(result => {
        console.log(result)
        done()
      })
    })

    it('should not login', function (done) {
      Users.login(username, wrongPassword)
				.then(res => {
  console.log(res)
  assert.fail()
})
				.catch(err => {
  done()
})
    })
  })
})
