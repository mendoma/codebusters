require('dotenv').config()
require('./config/passport')
const express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    favicon = require('serve-favicon'),
    path = require('path'),
    flash = require('connect-flash'),
    passport = require('passport')

const app = express()
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))

// Port to listen on
const PORT = process.env.PORT || 8080

// Static directory for public
app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))

// Use handlebars
app.engine('handlebars', hbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(flash())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    secret: process.env.secret,
    maxAge: 6000,
    resave: false,
    saveUninitialized: false,
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Globals
app.use((req, res, next) => {
    // currentUser
    res.locals.currentUser = req.user

    // flash messages
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
})

// Routes
const indexRoutes = require('./controllers/index')
const indexUsers = require('./controllers/users')
const apiRoutes = require('./controllers/api')

app.use(indexUsers)
app.use(apiRoutes)
app.use(indexRoutes)

// Start server
app.listen(PORT, () => {
    console.log(`The codebusters app is running on http://localhost:${PORT}`)
})

//=====================p5js==================
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
 var host = server.address().address;
 var port = server.address().port;
 console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
 // We are given a websocket object in our function
 function (socket) {

   console.log("We have a new client: " + socket.id);

   // When this user emits, client side: socket.emit('otherevent',some data);
   socket.on('mouse',
     function(data) {
       // Data comes in as whatever was sent, including objects
       //console.log("Received: 'mouse' " + data.x + " " + data.y);

       // Send it to all other clients
       socket.broadcast.emit('mouse', data);

       // This is a way to send to everyone including sender
       // io.sockets.emit('message', "this goes to everyone");

     }
   );

   socket.on('disconnect', function() {
     console.log("Client has disconnected");
   });
 }
);
//=====================p5js end==============

module.exports = app