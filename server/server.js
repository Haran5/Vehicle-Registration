//Include express
const express = require('express')

//set the express to the variable
const app = express()

//import to the variable
const cors =require('cors')
const bodyParser = require('body-Parser')


//
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))

//Import the veihcle route
const veihcleRoutes = require('./Routes/VeihcleRoutes')
app.use('/api/veihcle', veihcleRoutes)

//create server
app.listen(5000, () => {
    console.log(`SERVER RUN ON 5000`)
})