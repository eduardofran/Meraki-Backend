const seeder = require('mongoose-seed')
const bcrypt = require('bcrypt')

require('dotenv').config()

const SKILLS = require('./skills.json')
const OFFERS = require('./offers.json')
const EVENTS = require('./events.json')
const USERS = require('./users.json')

const EventsModel = require('../api/models/events.model.js')
const UsersModel = require('../api/models/users.model.js')
const SkillsModel = require('../api/models/skills.model.js')
const OffersModel = require('../api/models/offers.model.js')

seeder.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB || 'test',
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, async function () {
  seeder.loadModels([
    'api/models/users.model.js',
    'api/models/events.model.js',
    'api/models/skills.model.js',
    'api/models/offers.model.js'
  ])
  seeder.clearModels(['user', 'event', 'skill', 'offer'], async function () {
    let user = USERS[0].documents[0]
    user.password = bcrypt.hashSync(user.password, 10)
    user = await UsersModel.create(user)

    seeder.populateModels(SKILLS, async function () {
      seeder.populateModels(OFFERS, async function () {
        SkillsModel.find().then(async skills => {
          OffersModel.find().then(async offers => {
            for (let i = 0; i < EVENTS[0].documents.length; i++) {
              const event = EVENTS[0].documents[i]
              const randomSkill1 = skills[Math.floor(Math.random() * skills.length)]
              const randomSkill2 = skills[Math.floor(Math.random() * skills.length)]
              const randomSkill3 = skills[Math.floor(Math.random() * skills.length)]
              const randomOffer1 = offers[Math.floor(Math.random() * offers.length)]
              const randomOffer2 = offers[Math.floor(Math.random() * offers.length)]
              const randomOffer3 = offers[Math.floor(Math.random() * offers.length)]
              event.offers = [randomOffer1._id, randomOffer2._id, randomOffer3._id]
              event.skillsRequired = [randomSkill1._id, randomSkill2._id, randomSkill3._id]
              event.creator = user._id
              await EventsModel.create(event)
            }

            seeder.disconnect()
          })
        })
      })
    })
  })
})
