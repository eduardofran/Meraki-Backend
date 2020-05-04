const seeder = require('mongoose-seed')
const bcrypt = require('bcrypt')

require('dotenv').config({ path: '../.env' })

const SKILLS = require('./skills.json')
const EVENTS = require('./events.json')
const USERS = require('./users.json')

const EventsModel = require('../api/models/events.model.js')
const UsersModel = require('../api/models/users.model.js')
const SkillsModel = require('../api/models/skills.model.js')

seeder.connect(process.env.MONGO_URL + process.env.MONGO_DB, async function () {
  seeder.loadModels([
    '../api/models/users.model.js',
    '../api/models/events.model.js',
    '../api/models/skills.model.js'
  ])

  seeder.clearModels(['user', 'event', 'skill'], async function () {
    let user = USERS[0].documents[0]
    user.password = bcrypt.hashSync(user.password, 10)
    user = await UsersModel.create(user)

    seeder.populateModels(SKILLS, async function () {
      SkillsModel.find().then(async skills => {
        for (let i = 0; i < EVENTS[0].documents.length; i++) {
          const event = EVENTS[0].documents[i]
          const randomSkill = skills[Math.floor(Math.random() * skills.length)]
          event.skillsRequired = [randomSkill._id]
          event.creator = user._id
          await EventsModel.create(event)
        }

        seeder.disconnect()
      })
    })
  })
})
