'use strict'
require('dotenv').config()

module.exports = {
  database: {
    username: process.env.DATABASE_USERNAME || 'username',
    password: process.env.DATABASE_PASSWORD || 'password',
    neo4j: 'bolt://' + process.env.DATABASE_HOST || 'localhost' + ':7687'
  }
}
