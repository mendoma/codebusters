const bcrypt = require('bcrypt')

module.exports = (sequelize, DataType) => {
	return sequelize.define('user', {
		fullname: {
			type: DataType.STRING,
			notNull: true,
			notEmpty: true,
		},
		username: {
			type: DataType.STRING,
			notNull: true,
			notEmpty: true,
			unique: true
		},
		password: {
			type: DataType.STRING,
			notEmpty: true,
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
