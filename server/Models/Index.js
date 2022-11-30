const {Sequelize, DataTypes} = require('sequelize')

//Establish database connection 
const sequelize = new Sequelize('veihcle_regitration', 'root', 'Haran@123', {
    host: 'localhost',
    dialect: 'mysql'
})

//Test the database connection
try
{
    sequelize.authenticate()
    console.log('Connection has been established successfully.')
} catch(error)
{
    console.error('Unable to connect the database: ', error)
}


const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.Vehicle = require("./Veihcle.js")(sequelize, DataTypes)

db.sequelize.sync({
    force: false
}).then(() => {
    console.log(`sync done`)
})

module.exports = db