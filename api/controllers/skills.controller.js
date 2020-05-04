const SkillsModel = require('../models/skills.model.js')
const { handleError } = require('../utils')

module.exports = {
  getAllSkills
}

function getAllSkills (req, res) {
  SkillsModel
    .find()
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}
