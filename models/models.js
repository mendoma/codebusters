const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

const private = process.env

// DB connection
const connection = new Sequelize(private.db_name, private.user, private.password, {
    dialect: 'mysql'
})

const User = connection.define('user', {
    player_name: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    player_age: {
        type: Sequelize.INTEGER,
        notEmpty: true
    },
    username: {
        type: Sequelize.STRING,
        notEmpty: true,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
    }
}, {
    hooks: {
        afterValidate: function (user) {
            user.password = bcrypt.hashSync(user.password, 10)
        }
    }
})

User.associate = function (models) {
    User.hasMany(models.Game, {
        onDelete: 'cascade'
    })
}
const Game = connection.define('game', {
    scores: {
        type: Sequelize.STRING,
    },
    answers: {
        type: Sequelize.TEXT
    }
})

Game.associate = function (models) {
    Game.belongsTo(models.User, {
        foreignKey: {
            allowNull: false
        }
    })
}

connection.sync({
        logging: console.log
    })
    // .then(function () {
    //     User.create({
    //         player_name: 'Manny Mendoza',
    //         player_age: '35',
    //         username: 'mmendoza',
    //         password: 'password'
    //     })
    // })

module.exports = {
    User: User,
    Game: Game
}