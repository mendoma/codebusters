const bcrypt = require('bcrypt')

module.exports = (sequelize, DataType) => {
    return sequelize.define('user', {
        username: {
            type: DataType.STRING,
            notNull: true,
            unique: true
        },
        password: {
            type: DataType.STRING,
            notNull: true
        }
    }, {
        hooks: {
            afterValidate: user => {
                user.password = bcrypt.hashSync(user.password, 10)
            }
        }
    })
}