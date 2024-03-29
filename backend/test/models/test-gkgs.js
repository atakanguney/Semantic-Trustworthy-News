var expect = require('chai').expect
var GKGs = require('../../models/gkgs')

describe('GKG Records', function () {
  var params = {
    GKGRECORDID: '20191221141500-0',
    V21DATE: '20191221141500',
    V2SOURCECOLLECTIONIDENTIFIER: '1',
    V2SOURCECOMMONNAME: 'stisd.net',
    V2DOCUMENTIDENTIFIER:
			'http://medhigh.stisd.net/cms/one.aspx?portalId=6077901&pageId=6077917&objectId.374398=48326309&contextId.374398=6304201&parentId.374398=6304202&ref=mesTP9fg96fVsgzpWYeogMWdrk/HA6V2eR8WbsbI4pQ=',
    V1COUNTS: '',
    V21COUNTS: '',
    V1THEMES:
			'APPOINTMENT;EDUCATION;TAX_FNCACT;TAX_FNCACT_TEACHER;SOC_POINTSOFINTEREST;SOC_POINTSOFINTEREST_SCHOOL;CRISISLEX_C01_CHILDREN_AND_EDUCATION;TAX_FNCACT_STUDENTS;',
    V2ENHANCEDTHEMES:
			'APPOINTMENT,66;TAX_FNCACT_STUDENTS,106;SOC_POINTSOFINTEREST_SCHOOL,93;EDUCATION,74;TAX_FNCACT_TEACHER,74;CRISISLEX_C01_CHILDREN_AND_EDUCATION,93;',
    V1LOCATIONS: '',
    V2ENHANCEDLOCATIONS: '',
    V1PERSONS: '',
    V2ENHANCEDPERSONS: '',
    V1ORGANIZATIONS: '',
    V2ENHANCEDORGANIZATIONS: '',
    V15TONE: '-10.3448275862069,0,10.3448275862069,10.3448275862069,24.1379310344828,3.44827586206897,26',
    V21ENHANCEDDATES: '',
    V2GCAM:
			'wc:26,c12.1:2,c12.10:2,c12.12:1,c12.14:1,c12.5:2,c12.7:1,c12.9:2,c14.1:2,c14.10:1,c14.11:1,c14.2:1,c14.3:1,c14.4:1,c14.5:2,c15.105:1,c15.147:1,c15.212:1,c16.109:3,c16.110:2,c16.116:2,c16.117:1,c16.12:3,c16.121:4,c16.124:1,c16.125:2,c16.127:3,c16.129:3,c16.13:1,c16.130:1,c16.134:7,c16.136:1,c16.138:4,c16.139:1,c16.145:3,c16.146:2,c16.153:1,c16.155:1,c16.159:3,c16.16:1,c16.162:2,c16.163:2,c16.164:3,c16.17:1,c16.2:1,c16.22:1,c16.26:3,c16.3:1,c16.31:2,c16.33:2,c16.38:1,c16.46:1,c16.47:4,c16.48:1,c16.5:1,c16.52:1,c16.53:1,c16.56:2,c16.57:15,c16.6:2,c16.60:1,c16.65:1,c16.66:2,c16.68:2,c16.70:1,c16.76:1,c16.78:1,c16.80:1,c16.81:1,c16.84:1,c16.86:1,c16.87:1,c16.88:3,c16.89:5,c16.90:1,c16.91:4,c16.94:2,c16.95:1,c16.96:1,c16.98:4,c17.1:7,c17.10:4,c17.11:4,c17.12:3,c17.13:1,c17.15:3,c17.18:1,c17.19:2,c17.20:1,c17.25:1,c17.27:4,c17.29:3,c17.30:2,c17.31:4,c17.32:2,c17.33:3,c17.35:2,c17.36:5,c17.37:2,c17.38:2,c17.39:3,c17.4:4,c17.40:1,c17.42:3,c17.43:3,c17.5:3,c17.7:3,c17.8:1,c18.142:1,c18.147:2,c18.193:2,c18.298:1,c2.1:2,c2.10:1,c2.102:2,c2.104:5,c2.108:1,c2.11:1,c2.113:1,c2.114:1,c2.115:1,c2.117:1,c2.119:9,c2.12:2,c2.122:2,c2.125:4,c2.127:5,c2.128:1,c2.134:1,c2.14:4,c2.143:1,c2.144:2,c2.146:2,c2.147:3,c2.148:6,c2.153:3,c2.155:1,c2.156:2,c2.157:1,c2.158:2,c2.160:3,c2.162:1,c2.166:1,c2.176:1,c2.177:1,c2.179:3,c2.181:1,c2.183:1,c2.185:5,c2.186:1,c2.187:2,c2.191:1,c2.192:2,c2.195:2,c2.197:1,c2.198:2,c2.199:1,c2.203:3,c2.204:3,c2.209:2,c2.210:2,c2.211:1,c2.213:1,c2.214:1,c2.226:3,c2.227:1,c2.228:1,c2.25:2,c2.26:1,c2.27:1,c2.30:2,c2.34:2,c2.35:2,c2.36:1,c2.37:1,c2.38:1,c2.39:6,c2.45:1,c2.46:1,c2.48:2,c2.50:2,c2.52:1,c2.53:1,c2.54:3,c2.59:1,c2.64:2,c2.65:1,c2.75:5,c2.76:19,c2.77:1,c2.78:5,c2.79:1,c2.80:4,c2.82:4,c2.84:1,c2.86:3,c2.88:1,c2.90:2,c2.95:3,c2.97:1,c2.98:2,c35.1:1,c35.2:1,c35.20:2,c35.31:3,c35.33:2,c35.5:1,c39.3:5,c39.32:1,c39.34:2,c39.38:2,c39.4:3,c39.5:1,c4.8:1,c41.1:1,c5.12:2,c5.22:1,c5.25:1,c5.27:1,c5.30:3,c5.40:1,c5.43:2,c5.44:1,c5.46:3,c5.47:1,c5.49:2,c5.50:3,c5.51:1,c5.52:3,c5.53:1,c5.54:3,c5.57:1,c5.60:1,c5.61:4,c5.62:12,c5.7:1,c5.8:4,c5.9:2,c7.1:1,c7.2:2,c8.38:2,c8.40:1,c8.42:1,c8.43:1,c9.1018:1,c9.109:1,c9.113:1,c9.124:1,c9.143:1,c9.145:2,c9.158:2,c9.161:1,c9.162:1,c9.168:1,c9.169:1,c9.177:2,c9.184:1,c9.196:1,c9.302:1,c9.312:1,c9.314:1,c9.36:1,c9.432:1,c9.437:1,c9.479:1,c9.498:1,c9.507:1,c9.513:1,c9.517:1,c9.522:1,c9.523:1,c9.53:1,c9.549:1,c9.55:1,c9.556:1,c9.56:1,c9.562:1,c9.565:2,c9.566:1,c9.567:1,c9.576:1,c9.581:1,c9.61:1,c9.618:1,c9.62:1,c9.630:1,c9.642:1,c9.648:1,c9.653:1,c9.658:1,c9.661:1,c9.668:1,c9.670:1,c9.676:1,c9.687:1,c9.692:1,c9.698:1,c9.701:2,c9.704:1,c9.705:1,c9.708:2,c9.710:1,c9.714:1,c9.719:1,c9.723:1,c9.73:1,c9.745:1,c9.746:1,c9.748:1,c9.757:1,c9.76:1,c9.771:1,c9.783:1,c9.785:1,c9.8:1,c9.818:1,c9.82:1,c9.83:3,c9.838:1,c9.853:1,c9.860:1,c9.861:1,c9.88:1,c9.884:1,c9.903:1,c9.908:2,c9.921:1,c9.930:1,c9.935:1,c9.937:1,c9.938:1,c9.962:1,c9.976:1,c9.978:1,c9.980:1,c9.985:1,c9.986:1,v10.1:0.369047619047619,v10.2:0.213541666666667,v11.1:0.0195673809523809,v19.1:5.182,v19.2:4.92,v19.3:4.928,v19.4:5.124,v19.5:4.816,v19.6:4.882,v19.7:5.254,v19.8:5.058,v19.9:4.98,v20.1:0.656,v20.11:0.656,v20.13:0.5155,v20.14:-0.275,v20.15:0.5155,v20.16:-0.275,v20.3:0.656,v20.5:0.656,v20.7:0.656,v20.9:0.656,v21.1:5.26041666666667,v26.1:-0.45',
    V21SHARINGIMAGE: '',
    V21RELATEDIMAGES: '',
    V21SOCIALIMAGEEMBEDS: '',
    V21SOCIALVIDEOEMBEDS: '',
    V21QUOTATIONS: '',
    V21ALLNAMES: 'Work Day,86',
    V21AMOUNTS: '',
    V21TRANSLATIONINFO: '',
    V2EXTRASXML: '<PAGE_TITLE>Calendar - South Texas ISD Health Professions</PAGE_TITLE>'
  }
	// describe('Create a GKG Record', function () {
	//   it('should create a GKG record', function (done) {
	//     GKGs.createGKG(params).then(res => done())
	//   })
	// })

  describe('Get a GKG Record by Record Id', function () {
    it('should get a GKG record by its id', function (done) {
      GKGs.getGKGByGKGRECORDID('20191222200000-5').then(result => {
        console.log(result)
				// expect(result['GKGRECORDID']).to.equal(params['GKGRECORDID'])
        done()
      })
    })
  })

	// describe('Get ALL GKG records', function () {
	//   it('should get all gkg records', function (done) {
	//     GKGs.getAllGKGs().then(results => {
	//       console.log(results.length)
	// 			// expect(results.length).to.greaterThan(0)
	//       done()
	//     })
	//   })
	// })
})
