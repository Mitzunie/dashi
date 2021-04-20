var exports = module.exports = {};

// --== Require ==--
const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs')

// --== config ==--
const {token, prefix} = require('../config/config');
const app = require('../api/app');
const databot = require('../data/bot.json');

// --== Bot And Commands ==--
const bot = new discord.Client();
bot.commands = new discord.Collection();
const botprefix = prefix;

// --== File Manager (Command Handler And Events Handler) ==--

fs.readdir("./bot/commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("No hay Comandos");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./../bot/commands/${f}`);
        console.log(`De file ${f} is geladen!`);

        bot.commands.set(fileGet.help.name, fileGet);

    })

});

fs.readdir('./bot/events/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        const eventFunction = require(`./../bot/events/${file}`);
        const eventName = file.split('.')[0];
         bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
    });
}); 

client.on('ready', () => {
    console.log('===================')
    console.log('[NAME]: '+client.user.tag)
    console.log('[ID]: '+client.user.id)
    console.log('[CREADO]: '+client.user.createdAt.toLocaleString())
    console.log('-------------------')
    console.log('[CANALES]: '+client.channels.size.toLocaleString())
    console.log('[SERVIDORES]: '+client.guilds.size.toLocaleString())
    console.log('[USUARIOS]: '+client.users.size.toLocaleString())
    console.log('===================')

    app.startApp(client);
})

client.on("message", message => {

  // ---=== Commands ===---

  if(!message.content.startsWith(prefix)) return;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
  var commands_getter = bot.commands.get(command.slice(prefix.length));
  if (commands_getter) commands_getter.run(bot, message, args, prefix);

})


client.login(token);