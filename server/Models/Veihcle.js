
// Create the tables
module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('vehicle', {

        Id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },


        Username:
        {
            type: DataTypes.STRING,
            allowNULL: false
        },

        Vehicle:
        {
            type: DataTypes.STRING,
            allowNULL:false
        },

        Number_Plate:
        {
            type: DataTypes.STRING,
            allowNULL:false
        },

        Type:
        {
            type: DataTypes.STRING,
            allowNULL:false
        }

        
    })

    return Vehicle
}