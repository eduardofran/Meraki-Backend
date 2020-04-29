const seeder = require('mongoose-seed')
require('dotenv').config()

const EVENTS = require('./events.json')
const USERS = require('./users.json')

seeder.connect(process.env.MONGO_URL + process.env.MONGO_DB, function () {
  seeder.loadModels(['api/models/users.model.js'])
  seeder.loadModels(['api/models/events.model.js'])
  seeder.clearModels(['event', 'user'], function () {
    seeder.populateModels(EVENTS, function () {
      seeder.populateModels(USERS, function () {
        seeder.disconnect()
      })
    })
  })
})
