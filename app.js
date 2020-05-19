const express = require('express')
const app = express()

//Get port from possible set variable else 3000
const PORT = process.env.PORT ? process.env.PORT : 3000;

//Static serving from ./public
app.use(express.static('public'))

//Setup ejs view engine
app.set('view engine', 'ejs')

//Setup routes
const authRouter = require('./routes/auth.js')
const indexRouter = require('./routes/index.js')
const productRouter = require('./routes/product.js')
const storeRouter = require('./routes/store.js')
const userRouter = require('./routes/user.js')

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/stores', storeRouter)
app.use('/products', productRouter)

//Start express server
app.listen(PORT, (error) => {
    if (error) {
        console.log(error)
    }
    console.log("Server started on port", PORT)
})