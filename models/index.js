const Sequelize = require('sequelize'),
    config = require('../config/keys'),
    UserModel = require('./user'),
    GameModel = require('./game'),
    AnswerModel = require('./answers')

const sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
    host: config.db_host,
    dialect: 'mysql'
})

const User = UserModel(sequelize, Sequelize)
const Game = GameModel(sequelize, Sequelize)
const Answer = AnswerModel(sequelize, Sequelize)

User.hasMany(Game)
Game.belongsTo(User)
Game.hasMany(Answer)
Answer.belongsTo(Game)

sequelize
    .sync()
    .then(() => {
        console.log('Database & tables created')
    })

module.exports = {
    User,
    Game,
    Answer
}