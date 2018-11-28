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
    }, 
    {
        classMethods: {
            validPassword: (password, passwd, done, user) => {
                bcrypt.compare(password, passwd, (err, isMatch) => {
                    if (err) console.log(err)
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                })
            }
        },
        hooks: {
            afterValidate: user => {
                user.password = bcrypt.hashSync(user.password, 10)
            }
        }
    })
}