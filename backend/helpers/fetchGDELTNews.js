const csv = require('csv-parser')
const fs = require('fs')
var AdmZip = require('adm-zip')
const request = require('request')

var eventFields = [
  'GlobalEventID',
  'Day',
  'MonthYear',
  'Year',
  'FractionDate',
  'Actor1Code',
  'Actor1Name',
  'Actor1CountryCode',
  'Actor1KnownGroupCode',
  'Actor1EthnicCode',
  'Actor1Religion1Code',
  'Actor1Religion2Code',
  'Actor1Type1Code',
  'Actor1Type2Code',
  'Actor1Type3Code',
  'Actor2Code',
  'Actor2Name',
  'Actor2CountryCode',
  'Actor2KnownGroupCode',
  'Actor2EthnicCode',
  'Actor2Religion1Code',
  'Actor2Religion2Code',
  'Actor2Type1Code',
  'Actor2Type2Code',
  'Actor2Type3Code',
  'IsRootEvent',
  'EventCode',
  'EventBaseCode',
  'EventRootCode',
  'QuadClass',
  'GoldsteinScale',
  'NumMentions',
  'NumSources',
  'NumArticles',
  'AvgTone',
  'Actor1Geo_Type',
  'Actor1Geo_Fullname',
  'Actor1Geo_CountryCode',
  'Actor1Geo_ADM1Code',
  'Actor1Geo_ADM2Code',
  'Actor1Geo_Lat',
  'Actor1Geo_Long',
  'Actor1Geo_FeatureID',
  'Actor2Geo_Type',
  'Actor2Geo_Fullname',
  'Actor2Geo_CountryCode',
  'Actor2Geo_ADM1Code',
  'Actor2Geo_ADM2Code',
  'Actor2Geo_Lat',
  'Actor2Geo_Long',
  'Actor2Geo_FeatureID',
  'ActionGeo_Type',
  'ActionGeo_Fullname',
  'ActionGeo_CountryCode',
  'ActionGeo_ADM1Code',
  'ActionGeo_ADM2Code',
  'ActionGeo_Lat',
  'ActionGeo_Long',
  'ActionGeo_FeatureID',
  'DATEADDED',
  'SOURCEURL'
]

var mentionsFields = [
  'GlobalEventID',
  'EventTimeDate',
  'MentionTimeDate',
  'MentionType',
  'MentionSourceName',
  'MentionIdentifier',
  'SentenceID',
  'Actor1CharOffset',
  'Actor2CharOffset',
  'ActionCharOffset',
  'InRawText',
  'Confidence',
  'MentionDocLen',
  'MentionDocTone',
  'MentionDocTranslationInfo',
  'Extras'
]

var gkgFields = [
  'GKGRECORDID',
  'V21DATE',
  'V2SOURCECOLLECTIONIDENTIFIER',
  'V2SOURCECOMMONNAME',
  'V2DOCUMENTIDENTIFIER',
  'V1COUNTS',
  'V21COUNTS',
  'V1THEMES',
  'V2ENHANCEDTHEMES',
  'V1LOCATIONS',
  'V2ENHANCEDLOCATIONS',
  'V1PERSONS',
  'V2ENHANCEDPERSONS',
  'V1ORGANIZATIONS',
  'V2ENHANCEDORGANIZATIONS',
  'V15TONE',
  'V21ENHANCEDDATES',
  'V2GCAM',
  'V21SHARINGIMAGE',
  'V21RELATEDIMAGES',
  'V21SOCIALIMAGEEMBEDS',
  'V21SOCIALVIDEOEMBEDS',
  'V21QUOTATIONS',
  'V21ALLNAMES',
  'V21AMOUNTS',
  'V21TRANSLATIONINFO',
  'V2EXTRASXML'
]

var allFields = [eventFields, mentionsFields, gkgFields]

var getRawNews = function (fileUrl, fields) {
  var output = fileUrl.split('/').pop()
  var csvFile = output.slice(0, -4)

  var promise = new Promise((resolve, reject) => {
    request(fileUrl).pipe(fs.createWriteStream(output)).on('close', function () {
      var zip = new AdmZip(output)
      var zipEntries = zip.getEntries()

      zipEntries.forEach(function (zipEntry) {
        zip.extractEntryTo(zipEntry.entryName, '.', false, true)
      })
      const results = []
      fs
				.createReadStream(csvFile)
				.pipe(csv({ separator: '\t', headers: fields }))
				.on('data', data => results.push(data))
				.on('error', reject)
				.on('end', () => {
  resolve(results)
})
    })
  })
  return promise
}

var getAllFiles = function () {
  var promise = new Promise((resolve, reject) => {
    request('http://data.gdeltproject.org/gdeltv2/lastupdate.txt', function (err, res, body) {
      resolve(
				body.split('\n').slice(0, 3).map(item => {
  return item.match('http://.*')[0]
})
			)
    })
  })

  return promise
}

var getAllSources = function () {
  return getAllFiles().then(fileUrls => {
    var allData = []
    fileUrls.forEach((fileUrl, key) => {
      allData.push(getRawNews(fileUrl, allFields[key]))
    })

    return Promise.all(allData)
  })
}
