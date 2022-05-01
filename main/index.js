const express = require('express');
const bodyParser = require("body-parser");
const indexRouter = require('./routes');
const booksRouter = require('./routes/books');
const booksApiRouter = require('./routes/api/books-api');
const authRouter = require('./routes/user')
const mongoose = require('mongoose');
const passport = require("passport");
const localStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const { Server } = require("socket.io");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true
}));

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new localStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect username.' });

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) return done(err);
            if (res === false) return done(null, false, { message: 'Incorrect password.' });

            return done(null, user);
        });
    });
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/api/auth');
}
app.use('/api/auth', authRouter);
app.use(isLoggedIn);
app.use('/public', express.static(__dirname+"/public"));
app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/api/books', booksApiRouter);


const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME;
const PasswordDB = process.env.DB_PASSWORD;
const NameDB = process.env.DB_NAME;
const HostDb = process.env.DB_HOST;
async function start() {
    try {
        await mongoose.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('chat message', (msg, room) => {
                socket.to(room).emit('receive message', msg);
                socket.emit('receive message', msg);
            });
            socket.on('join-room', room => {
                socket.join(room);
            })
        });


        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();
