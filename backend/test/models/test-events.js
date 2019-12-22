var expect = require('chai').expect
var Events = require('../../models/events')

describe('Events', function () {
  var params = {
    GlobalEventID: '894426511',
    Day: '20181221',
    MonthYear: '201812',
    Year: '2018',
    FractionDate: '2018.9616',
    Actor1Code: 'MEX',
    Actor1Name: 'MEXICO',
    Actor1CountryCode: 'MEX',
    Actor1KnownGroupCode: '',
    Actor1EthnicCode: '',
    Actor1Religion1Code: '',
    Actor1Religion2Code: '',
    Actor1Type1Code: '',
    Actor1Type2Code: '',
    Actor1Type3Code: '',
    Actor2Code: '',
    Actor2Name: '',
    Actor2CountryCode: '',
    Actor2KnownGroupCode: '',
    Actor2EthnicCode: '',
    Actor2Religion1Code: '',
    Actor2Religion2Code: '',
    Actor2Type1Code: '',
    Actor2Type2Code: '',
    Actor2Type3Code: '',
    IsRootEvent: '1',
    EventCode: '045',
    EventBaseCode: '045',
    EventRootCode: '04',
    QuadClass: '1',
    GoldsteinScale: '5.0',
    NumMentions: '2',
    NumSources: '1',
    NumArticles: '2',
    AvgTone: '-1.38364779874214',
    Actor1Geo_Type: '4',
    Actor1Geo_Fullname: 'Mexico City, Distrito Federal, Mexico',
    Actor1Geo_CountryCode: 'MX',
    Actor1Geo_ADM1Code: 'MX09',
    Actor1Geo_ADM2Code: '20887',
    Actor1Geo_Lat: '19.4342',
    Actor1Geo_Long: '-99.1386',
    Actor1Geo_FeatureID: '-1658079',
    Actor2Geo_Type: '0',
    Actor2Geo_Fullname: '',
    Actor2Geo_CountryCode: '',
    Actor2Geo_ADM1Code: '',
    Actor2Geo_ADM2Code: '',
    Actor2Geo_Lat: '',
    Actor2Geo_Long: '',
    Actor2Geo_FeatureID: '',
    ActionGeo_Type: '4',
    ActionGeo_Fullname: 'Mexico City, Distrito Federal, Mexico',
    ActionGeo_CountryCode: 'MX',
    ActionGeo_ADM1Code: 'MX09',
    ActionGeo_ADM2Code: '20887',
    ActionGeo_Lat: '19.4342',
    ActionGeo_Long: '-99.1386',
    ActionGeo_FeatureID: '-1658079',
    DATEADDED: '20191221134500',
    SOURCEURL: 'https://finance.yahoo.com/news/mexican-stocks-lag-latam-peers-120000374.html'
  }

  it('should return create an event', function (done) {
    Events.createEvent(params).then(response => {
      done()
    })
  })

  it('should return event', function (done) {
    Events.getEventByEventId(params['GlobalEventID']).then(res => {
      expect(res['GlobalEventID']).to.equal(params['GlobalEventID'])
      done()
    })
  })

  it('should return all events', function (done) {
    Events.getAllEvents().then(results => {
      expect(results.length).to.greaterThan(0)
      done()
    })
  })
})
