module.exports = (sequelize, DataType) => {
	return sequelize.define('answers', {
		score: {
			type: DataType.INTEGER
		},
		code: {
			type: DataType.TEXT
		},
		time: {
			type: DataType.TIME
		}
	})
}