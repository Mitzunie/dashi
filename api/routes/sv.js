const express = require("express");
const app = express();
const checkAuth = require("./../../config/auth");

app
  .get("/sv/:id", checkAuth, (req, res) => {
    let id = req.params.id;

    let sv = req.bot.guilds.get(id);
    if (!sv)
      return res.redirect(
        `https://discordapp.com/oauth2/authorize?client_id=591353600626917416&scope=bot&permissions=8&guild_id=${id}`
      );

    res.render("sv", {
      pagetitle: "Servidores",
      client: req.bot,
      guild: sv,
      user: req.user
    });
  })

  .post("/sv/:id", checkAuth, async (req, res, next) => {
  if(!req.body.message || req.body.message.length === 0) return res.send("Mensaje Mensaje No Especificado.");
    await req.bot.guilds.get(req.params.id).channels.get(req.body.channel).send(req.body.message);
    await res.redirect(`/sv/${req.params.id}`);
  });

module.exports = app;
