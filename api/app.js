  // --== Require ==--
const expres = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const path = require("path");

// --== Express ==--
const app = expres();

// --== Config ==--
const {
    port,
    client_id,
    callbackURL,
    client_secret
} = require('../config/config');
var exports = module.exports = {};
const bot = require('./../bot/index')

exports.startApp = (client) => {
    // --== Discord Auth ==--
    const passport = require("passport");
    const Strategy = require("passport-discord").Strategy;
    const Discord = require('discord.js')

    passport.serializeUser((user, done) => {
        done(null, user);
    })
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    })

    let pedidos = ["identify", "guilds"];

    passport.use(
        new Strategy(
          {
            clientID: client_id,
            clientSecret: client_secret,
            callbackURL: `${callbackURL}/login`,
            scope: pedidos
          },
          function(accesToken, refreshToken, profile, done) {
            process.nextTick(function() {
              return done(null, profile);
            });
          }
        )
      );

    // --== Middleware ==--
    app
        .use(bodyparser.json())
        .use(bodyparser.urlencoded({
            extended: true
        }))
        .engine("html", require("ejs").renderFile)
        .use(expres.static(path.join(__dirname, "/views")))
        .set("view engine", "ejs")
        .set("view", path.join(__dirname, "views"))
        .use(session({
            secret: "name",
            resave: false,
            saveUninitialized: false
        }))
        .use(passport.initialize())
        .use(passport.session())
        .use(function (req, res, next) {
            req.bot = client;
            next()
        })
        .use('/', require("./routes/routes"));
    app.listen(port, () => {
        console.log(">> Api Iniciado en " + port);
    })
}