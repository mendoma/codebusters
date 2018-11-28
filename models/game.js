module.exports = (sequelize, DataType) => {
    return sequelize.define('game', {
        name: {
            type: DataType.STRING
        },
        score: {
            type: DataType.INTEGER
        }
    })
}