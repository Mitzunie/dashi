const express = require('express');
const router = express();
const checkAuth = require('./../../config/auth');


router.get("/panel",checkAuth, async (req, res) =>{

  res.render("panel", {
    userid: req.user.id,
    username: req.user.username,
    useravatar: `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=2048`,
    pagetitle: "Panel"
  });
})
.get('/guilds', checkAuth, async (req, res) => {
   let datoServidores = req.user.guilds.filter(
    p => (p.permissions & 8) === 8
  );
  res.render("guilds", {
    pagetitle: "Servidores",
    servidor: datoServidores
  });
})


module.exports = router;