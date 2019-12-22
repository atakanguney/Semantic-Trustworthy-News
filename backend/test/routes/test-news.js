const chai = require('chai')
var dbUtils = require('../../neo4j/dbUtils')
const app = require('../../')({
  port: 8000,
  host: '0.0.0.0'
})
const chaiHttp = require('chai-http')

const { expect } = chai
chai.use(chaiHttp)

describe('News', function () {
  const req = {
    body: {
      source: 'wired',
      author: 'Laura Mallonee',
      title: 'Inside the Icelandic Facility Where Bitcoin Is Mined',
      description:
				"Cryptocurrency mining now uses more of the Nordic island nation's electricity than its homes.",
      url: 'https://www.wired.com/story/iceland-bitcoin-mining-gallery/',
      urlToImage:
				'https://media.wired.com/photos/5dbc37a4c955950008b26751/191:100/w_1280,c_limit/photo_barnard_explosions_4.jpg',
      publishedAt: '2019-11-03T15:00:00Z',
      content:
				'Less than two miles from Icelands Reykjavik airport sits a nondescript metal building as monolithic and drab as a commercial poultry barn. Theres a deafening racket inside, too, but it doesnt come from clucking chickens. Instead, tens of thousands of whirring… [+3426 chars]',
      slug: 'Inside-the-Icelandic-Facility-Where-Bitcoin-Is-Mined'
    },
    headers: {
      authorization: 'Token 52dbb196f4e4ccd0cea8'
    }
  }

  after(function (done) {
    dbUtils
			.getSession({})
			.run('MATCH (news: NewsArticle{slug: {slug}}) DETACH DELETE news', { slug: req.body['slug'] })
			.then(done())
  })

  it('should NOT create a news due to authorization', function (done) {
    chai.request(app).post('/api/create-news').send(req.body).end((err, res) => {
      expect(res.status).to.equal(401)
      done()
    })
  })

  it('should create a news', function (done) {
    chai
			.request(app)
			.post('/api/create-news')
			.set('authorization', req.headers.authorization)
			.send(req.body)
			.end((err, res) => {
  expect(res.status).to.equal(201)
  done()
})
  })

  it('should get all news', function (done) {
    chai.request(app).get('/api/all-news').end((err, res) => {
      expect(res.status).to.equal(200)
      done()
    })
  })

  it('should return news with the slug parameter', function (done) {
    chai.request(app).get(`/api/news/${req.body.slug}`).end((err, res) => {
      expect(res.status).to.equal(200)
      expect(JSON.parse(res.text).slug).to.equal(req.body.slug)
      done()
    })

  it('should update news', function (done) {
    chai
			.request(app)
			.post('/api/update-news')
			.send({ source: 'the-new-york-times', pageSize: 10 })
			.end((err, res) => {
  expect(res.status).to.equal(200)
  done()
})

  })
})
