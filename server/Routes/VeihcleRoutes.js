const router = require('express').Router()

//import veihcle controll
const vehicleDetails = require('../Controller/VeichleController')

//router for add veihcle
router.post('/addveihcle', vehicleDetails.addVehicle)

//roter for edit
router.put('/editveihcle', vehicleDetails.editVehicle)

//router for delete
router.delete('/delete/:id', vehicleDetails.deleteVehicle)

//router for details
router.get('/details', vehicleDetails.VehicleDetails)

//router for single
router.get('/single/:id', vehicleDetails.singVehicle)

module.exports = router