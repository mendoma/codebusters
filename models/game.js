module.exports = (sequelize, DataType) => {
	return sequelize.define('game', {
		total_score: {
			type: DataType.INTEGER
		},
		total_time: {
			type: DataType.TIME
		}
	})
}