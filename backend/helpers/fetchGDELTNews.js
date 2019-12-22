const csv = require('csv-parser')
const fs = require('fs')
var AdmZip = require('adm-zip')
const request = require('request')
const events = require('../models/events')
const gkgs = require('../models/gkgs')
const mentions = require('../models/mentions')
var os = require('os')
var dbUtils = require('../graphdb/dbUtils')

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
var allCreateFunctions = [events.createEvent, mentions.createMention, gkgs.createGKG]

var getRawNews = function (fileUrl, fields) {
  var output = './newsdata/' + fileUrl.split('/').pop()
  var csvFile = output.slice(0, -4)

  var promise = new Promise((resolve, reject) => {
    request(fileUrl).pipe(fs.createWriteStream(output)).on('close', function () {
      var zip = new AdmZip(output)
      var zipEntries = zip.getEntries()

      zipEntries.forEach(function (zipEntry) {
        zip.extractEntryTo(zipEntry.entryName, './newsdata', false, true)
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

var validateJSON = function (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

var fixString = function (str) {
  return str.replace(/"/g, ' ').replace(/\u2013|\u2014/g, '-')
}

var extractTitle = function (xmlStr) {
  var match = xmlStr.match(/<PAGE_TITLE>(.*)<\/PAGE_TITLE>/)
  if (match) {
    return match[1]
  } else {
    return ''
  }
}

var eventToRDF = function (event) {
  var id = 'GlobalEventID'
  var initial = ':' + fixString(event[id]) + ' ' + 'rdf:type' + ' ' + 'ont:Event' + ' ' + '.'
	// Object Properties
	// hasLocation
  var objectProperties = [
    [':' + fixString(event[id]), 'ont:hasLocation', 'ont:' + fixString(event['ActionGeo_CountryCode']), '.'].join(
			' '
		)
  ].join(os.EOL)

	// Data Properties
  var dataProperties = [
		// hasTrustLevel
    [':' + fixString(event[id]), 'ont:hasTrustLevel', '""'].join(' '),
		// hasArticleURL
    [':' + fixString(event[id]), 'ont:hasArticleURL', '<' + fixString(event['SOURCEURL']) + '>'].join(' '),
		// hasAvgTone
    [':' + fixString(event[id]), 'ont:hasAvgTone', fixString(event['AvgTone'])].join(' '),
		// hasDate
    [':' + fixString(event[id]), 'ont:hasDate', '"' + fixString(event['Day']) + '"'].join(' '),
		// hasDateAdded
    [':' + fixString(event[id]), 'ont:hasDateAdded', '"' + fixString(event['DATEADDED']) + '"'].join(' '),
		// hasEventCode
    [':' + fixString(event[id]), 'ont:hasEventCode', '"' + fixString(event['EventCode']) + '"'].join(' '),
		// hasFractionDate
    [':' + fixString(event[id]), 'ont:hasFractionDate', '"' + fixString(event['FractionDate']) + '"'].join(' '),
		// hasGoldsteinScale
    [':' + fixString(event[id]), 'ont:hasGoldsteinScale', fixString(event['GoldsteinScale'])].join(' '),
		// hasNumMentions
    [':' + fixString(event[id]), 'ont:hasNumMentions', fixString(event['NumMentions'])].join(' '),
		// hasNumSources
    [':' + fixString(event[id]), 'ont:hasNumSources', fixString(event['NumSources'])].join(' '),
		// isRootEvent
    [':' + fixString(event[id]), 'ont:isRootEvent', fixString(event['IsRootEvent'])].join(' ')
  ].join(os.EOL)

  return initial + os.EOL + objectProperties + os.EOL + dataProperties
}

var mentionToRDF = function (mention) {
  var initial = ':' + fixString(mention['GlobalEventID']) + ' ' + 'rdf:type' + ' ' + ':Mention' + ' ' + '.'
  var rest = Object.entries(mention)
		.map(([key, val]) => {
  return (
				':' +
				fixString(mention['GlobalEventID']) +
				' ' +
				':has' +
				key +
				' ' +
				'"' +
				fixString(val) +
				'"' +
				' ' +
				'.'
  )
})
		.join(os.EOL)

  return initial + os.EOL + rest
}

var extractTones = function (toneStr) {
  return toneStr.split(',')
}

var gkgToRDF = function (gkg) {
  var id = 'GKGRECORDID'
  var initial = ':' + fixString(gkg[id]) + ' ' + 'rdf:type' + ' ' + 'ont:NewsArticle' + ' ' + '.'

	// Tone Values
  var tones = extractTones(gkg['V15TONE'])

	// Object Properties
  var objectProperties = [[].join(' ')].join(os.EOL)

	// Data Properties
  var dataProperties = [
		// hasGKG_ID
    [':' + fixString(gkg[id]), 'ont:hasGKG_ID', '"' + fixString(gkg[id]) + '"', '.'].join(' '),
		// hasArticleURL
    [':' + fixString(gkg[id]), 'ont:hasArticleURL', '<' + fixString(gkg['V2DOCUMENTIDENTIFIER']) + '>', '.'].join(
			' '
		),
		// hasPolarity
    [':' + fixString(gkg[id]), 'ont:hasPolarity', tones[3] !== undefined ? tones[3] : '""', '.'].join(' '),
		// hasTone
    [':' + fixString(gkg[id]), 'ont:hasTone', tones[0] !== undefined ? tones[0] : '""', '.'].join(' '),
		// hasPositiveScore
    [':' + fixString(gkg[id]), 'ont:hasPositiveScore', tones[1] !== undefined ? tones[1] : '""', '.'].join(' '),
		// hasNegativeScore
    [':' + fixString(gkg[id]), 'ont:hasNegativeScore', tones[2] !== undefined ? tones[2] : '""', '.'].join(' '),
		// hasPublishDate
    [':' + fixString(gkg[id]), 'ont:hasPublishDate', '"' + fixString(gkg['V21DATE']) + '"', '.'].join(' '),
		// hasImageURL
    [':' + fixString(gkg[id]), 'ont:hasImageURL', '<' + fixString(gkg['V21SHARINGIMAGE']) + '>', '.'].join(' '),
		// hasVideoURL
    [':' + fixString(gkg[id]), 'ont:hasVideoURLs', '"' + fixString(gkg['V21SOCIALVIDEOEMBEDS']) + '"', '.'].join(
			' '
		),
		// hasTitle
    [':' + fixString(gkg[id]), 'ont:hasTitle', '"' + fixString(extractTitle(gkg['V2EXTRASXML'])) + '"', '.'].join(
			' '
		),
		// hasThemes
    [':' + fixString(gkg[id]), 'ont:hasThemes', '"' + fixString(gkg['V1THEMES']) + '"', '.'].join(' '),
		// hasSourceCommonName
    [
      ':' + fixString(gkg[id]),
      'ont:hasSourceCommonName',
      '"' + fixString(gkg['V2SOURCECOMMONNAME']) + '"',
      '.'
    ].join(' ')
  ].join(os.EOL)

  return initial + os.EOL + objectProperties + os.EOL + dataProperties
}

var allToRDF = [eventToRDF, mentionToRDF, gkgToRDF]

var getAllSources = function () {
  return getAllFiles().then(fileUrls => {
    var allData = []
    fileUrls.forEach((fileUrl, key) => {
      allData.push(
				getRawNews(fileUrl, allFields[key]).then(results => {
  var prefix =
						'@prefix : <http://www.stnews.com/> .' +
						os.EOL +
						'@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .' +
						os.EOL +
						'@prefix ont: <https://github.com/atakanguney/Semantic-Trustworthy-News/blob/master/ontology/trustworthy-news.owl/>'
  var rdf = results.map(item => allToRDF[key](item)).join(os.EOL)

  return prefix + os.EOL + rdf
})
			)
    })

    return Promise.all(allData).then(res => {
      let names = ['events', 'mentions', 'gkgs']
      res.forEach((item, key) => {
        fs.writeFile('/tmp/' + names[key] + '.ttl', item + os.EOL, function (err) {
          if (err) {
            console.log(err)
            return false
          }
          console.log(`The file of ${names[key]} was saved!`)
        })
      })

      return true
    })
  })
}

var uploadRDTToGraphDB = function () {
  return this.getAllSources().then(res => {
    if (res) {
      let names = ['events', 'mentions', 'gkgs']
      let contexts = ['ssw:stn:Events', 'ssw:stn:Mention', 'ssw:stn:GKG']
      const contentType = dbUtils.getRDFMimeType().TURTLE
      const files = names.map(item => '/tmp/' + item + '.ttl')

      const repository = dbUtils.getRepository()

      files.forEach((item, key) => {
        fs.readFile(item, (err, stream) => {
          repository
						.upload(stream, contentType, contexts[key], null)
						.then(r => console.log(`Turtle File Uploaded Successfully ${contexts[key]}`))
						.catch(e => {
  console.log(e)
  return false
})
        })
      })

      return true
    }
  })
}

module.exports = {
  eventFields: eventFields,
  mentionsFields: mentionsFields,
  gkgFields: gkgFields,
  getAllSources: getAllSources,
  uploadRDTToGraphDB: uploadRDTToGraphDB
}
