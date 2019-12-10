var expect = require('chai').expect
var Sources = require('../../models/sources')
var dbUtils = require('../../neo4j/dbUtils')

describe('Sources', function () {
  describe('#createSource', function () {
    it('Source Model Creation', function (done) {
      id = 'abc-news'
      name = 'ABC News'
      description =
				'Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.'
      url = 'https://abcnews.go.com'
      category = 'general'
      language = 'en'
      country = 'us'
      Sources.createSource({
        session: dbUtils.getSession({}),
        id,
        name,
        description,
        url,
        category,
        language,
        country
      })
				.then(response => {
  expect(response['id']).to.equal(id)
})
				.finally(done)
    })
  })
})
