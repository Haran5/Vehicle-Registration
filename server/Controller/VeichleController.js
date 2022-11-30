const db = require('../Models/')
const VehicleModel = db.Vehicle


const regex1 = /^.{1}[A-Z]-.{1}[A-Z]-.{3}[0-9]$/
const regex2 = /^.{2}[A-Z]-.{3}[0-9]$/
const regex3 = /^.{2}[0-9]-.{3}[0-9]$/
const regex4 = /^.{1}[0-9]-.{3}[0-9]$/
const regex5 = /^.{1}[0-9]-.{0}\u0D80-\u0DFF-.{3}[0-9]$/


//ADD Veihcle
const addVehicle = async (req, res) => {
    const Username = req.body.username
    const Vehicle = req.body.Vehicle
    const NumberPlate = req.body.Number_Plate
    let type;

    if(!Username) return res.status(500).send('Username is required')
    if(!Vehicle) return res.status(500).send(' is required')
    if(!NumberPlate) return res.status(500).send('Username is required')

 
    if(regex1.test(NumberPlate) === true) type = "Modern"
    if(regex2.test(NumberPlate) === true) type = "Modern"
    if(regex3.test(NumberPlate) === true) type = "Old"
    if(regex4.test(NumberPlate) === true) type = "Old"
    if(regex5.test(NumberPlate) === true) type = "Vintage"
    const data = {
        Username: Username,
        Vehicle: Vehicle,
        Number_Plate: NumberPlate,
        Type:type
    }
    try {
     const newVeihcle =  await VehicleModel.create(data)
     await newVeihcle.save()
     return res.status(200).send("succesfully created")
    } catch (error) {
        return res.status(500).send("some thing went to wrong")
    }
} 

//Edit
const editVehicle = async (req, res) => {
    console.log(req.body)
    const Username = req.body.username
    const Veihcle = req.body.Veihcle
    const NumberPlate = req.body.Number_Plate
    const id = req.body.id
    let type;

    if(regex1.test(NumberPlate)) type = "Modern"
    if(regex2.test(NumberPlate)) type = "Modern"
    if(regex3.test(NumberPlate)) type = "Vintage"
    if(regex4.test(NumberPlate)) type = "Vintage"
    if(regex5.test(NumberPlate)) type = "Old"

    if(!Username) return res.status(500).send('Username is required')
    if(!Veihcle) return res.status(500).send(' is required')
    if(!NumberPlate) return res.status(500).send('Username is required')
    if(!id) return res.status(500).send('Vehicle id is required')

    try {
        const details = await VehicleModel.findOne({where:{id:id}})
        if (details === null) {
            return res.status(500).send("Vehicle not found")
          } else {
            details.Username =  Username
            details.Vehicle = Veihcle
            details.Number_Plate = NumberPlate
            details.Type = type

            await details.save()
            return res.status(200).send("succesfully updated")
          }
    } catch (error) {
    

        return res.status(500).send("some thing went to wrong")
    }

}

//Delete
const deleteVehicle = async (req, res) => {
    const id = req.params.id
    if(!id) return res.status(500).send('Vehicle Id is required')
    try {
        const details = await VehicleModel.findOne({where:{id:id}})
        if (details === null) {
            return res.status(500).send("Vehicle not found")
          } else {
            await details.destroy();
            return res.status(200).send("succesfully Deleted") 
        }
    } catch (error) {
        return res.status(500).send("some thing went to wrong")
    }
}

//Detais
const VehicleDetails = async (req, res) => {
    try {
        const details = await VehicleModel.findAll({})
        return res.status(200).send(details)
    } catch (error) {
        return res.status(500).send("some thing went to wrong")
    }
}

//Single Veihcle dtails
const singVehicle = async (req, res) => {
    const id = req.params.id
    if(!id) return res.status(500).send('Vehicle Id is required')
    try {
        const details = await VehicleModel.findOne({where:{id:id}})
        if (details === null) {
            return res.status(500).send("Vehicle not found")
          } else {
            return res.status(200).send(details)
          }
    } catch (error) {
        return res.status(500).send("some thing went to wrong")
    }
}


//Export
module.exports = {
    addVehicle,
    editVehicle,
    deleteVehicle, 
    VehicleDetails,
    singVehicle
}