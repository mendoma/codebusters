const Sequelize = require('sequelize'),
    UserModel = require('./user'),
    GameModel = require('./game')

const private = process.env
const sequelize = new Sequelize(private.db_name, private.user, private.password, {
    host: private.db_host,
    dialect: 'mysql'
})

const User = UserModel(sequelize, Sequelize)
const Game = GameModel(sequelize, Sequelize)

Game.belongsTo(User)

sequelize
    .sync()
    .then(() => {
        console.log('Database & tables created')
    })

module.exports = {
    User,
    Game
}