const express = require('express')
const app = express()

//Create server
const server = require('http').createServer(app)

//Try get PORT env var else default 3000
const PORT = process.env.PORT || 3000;

//Setup helmet
const helmet = require('helmet')
app.use(helmet())

//Setup bodyparsing
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false}))

//Static serving from ./public
app.use(express.static('public'))

//Setup ejs view engine
app.set('view engine', 'ejs')

//Setup express-session
const session = require('express-session')
const sessionConfig = require('./configs/session.json')

//Use in-memory session store for now
app.use(session({
    name: 'sid',
    secret: sessionConfig['secret'],
    resave: false,
    saveUninitialized: false,  
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, //1 day
        secure: false
    }
}))

//Setup Objection & Knex
const { Model } = require('objection')
Model.knex(require('./database/knexfile.js'))

//Setup routes
app.use('/', require('./routes/auth.js'))
app.use('/', require('./routes/index.js'))
app.use('/gchat', require('./routes/gchat.js'))
app.use('/users', require('./routes/user.js'))
app.use('/stores', require('./routes/store.js'))
app.use('/products', require('./routes/product.js'))

//test delete
app.get('/test', (req, res) => {
    res.render('test.ejs', { session: req.session })
})

//Setup REST API routes
app.use('/api/v1/products', require('./routes/api/product.js'))

//Setup our gchat server
const gchat = new (require('./gchat_server.js'))(server)
gchat.startListening()

//Start express server
server.listen(PORT, (error) => {
    if (error) {
        console.log(error)
    }
    console.log("Server started on port", PORT)
})