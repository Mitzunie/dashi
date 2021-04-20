const express = require('express');
const router = express.Router();
const passport = require("passport");
const bot = require('./../../bot/index')
let pedidos = ["indetify", "guilds"];
router
.get("/", function (req, res) {

        res.render("index.ejs", {
            pagetitle: "inicio",
        });
    })
    .get("/login", passport.authenticate("discord", {
            failureRedirect: "/"
        }),
        function (req, res) {
            res.redirect("/panel");
        })
    .get("/logout", async function (req, res) {
        await req.logout();
        await res.redirect("/");
    })

module.exports = router;