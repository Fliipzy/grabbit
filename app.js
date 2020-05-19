const express = require('express')
const app = express()

//Get port from possible set variable else 3000
const PORT = process.env.PORT ? process.env.PORT : 3000;

//Setup middleware
//Static serving from ./public
app.use(express.static('public'))

//Setup routes

//Start express server
app.listen(PORT, (error) => {
    if (error) {
        console.log(error)
    }
    console.log("Server started on port", PORT)
})