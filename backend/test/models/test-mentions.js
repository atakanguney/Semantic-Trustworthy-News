var expect = require('chai').expect
var Mentions = require('../../models/mentions')

describe('Mentions', function () {
  var params = {
    GlobalEventID: '894330669',
    EventTimeDate: '20191221000000',
    MentionTimeDate: '20191221140000',
    MentionType: '1',
    MentionSourceName: 'registerguard.com',
    MentionIdentifier: 'https://www.registerguard.com/news/20191221/oregon-bans-cannabis-infused-alcoholic-drinks',
    SentenceID: '14',
    Actor1CharOffset: '-1',
    Actor2CharOffset: '3385',
    ActionCharOffset: '3419',
    InRawText: '0',
    Confidence: '10',
    MentionDocLen: '3520',
    MentionDocTone: '-0.33500837520938',
    MentionDocTranslationInfo: '',
    Extras: ''
  }

  describe('#CreateMention', function () {
    it('Mention Creation', function (done) {
      Mentions.createMention(params).then(res => done())
    })
  })

  describe('#Get Mention By Event Id', function () {
    it('Mention Get By Id', function (done) {
      Mentions.getMentionByGlobalEventID(params['GlobalEventID']).then(res => {
        expect(res['GlobalEventID']).to.equal(params['GlobalEventID'])
        done()
      })
    })
  })

  describe('#Get All Mentions', function () {
    it('Mention Get By Id', function (done) {
      Mentions.getAllMentions().then(results => {
        expect(results.length).to.greaterThan(0)
        done()
      })
    })
  })
})
