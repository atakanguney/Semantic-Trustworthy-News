var expect = require('chai').expect
var dbUtils = require('../neo4j/dbUtils')

var News = require('../models/news')

describe('News', function () {
  describe('#createNews', function () {
    it('should return created news', function (done) {
      params = {
        source: {
          id: 'wired',
          name: 'Wired'
        },
        author: 'Laura Mallonee',
        title: 'Inside the Icelandic Facility Where Bitcoin Is Mined',
        description:
					"Cryptocurrency mining now uses more of the Nordic island nation's electricity than its homes.",
        url: 'https://www.wired.com/story/iceland-bitcoin-mining-gallery/',
        urlToImage:
					'https://media.wired.com/photos/5dbc37a4c955950008b26751/191:100/w_1280,c_limit/photo_barnard_explosions_4.jpg',
        publishedAt: '2019-11-03T15:00:00Z',
        content:
					'Less than two miles from Icelands Reykjavik airport sits a nondescript metal building as monolithic and drab as a commercial poultry barn. Theres a deafening racket inside, too, but it doesnt come from clucking chickens. Instead, tens of thousands of whirring… [+3426 chars]'
      }

      News.createNews({ session: dbUtils.getSession({}), ...params })
				.then(response => {
  expect(response.title).to.equal(params['title'])
})
				.finally(done)
    })
  })
})
