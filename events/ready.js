const botconfig = require("../botconfig.json");
const pogoinfo = require("../pogoinfo.json");
const functions = require("../utils/functions.js");
const prefix = botconfig.prefix;
const moment = require("moment-timezone");

module.exports = async bot => {
    // Bot info
    bot.prefix = botconfig.prefix;
    bot.version = botconfig.version;
    bot.ownerId = botconfig.ownerId;
    // Information about pogo, eg maximum level, xp per level, etc
    bot.levelLimit = pogoinfo.levelLimit;
    bot.xpPerLevel = pogoinfo.xpPerLevel;
    // Helper functions
    bot.functions = functions;

    bot.user.setActivity("Just Started, Sorry for the downtime!");

    setTimeout(async () => {
        bot.user.setActivity(`${bot.prefix}help | Version ${botconfig.version}`);
    }, 300000);

    console.log(`Bot is logged in!\nBot was ready at: ${moment().tz("America/Los_Angeles").format("LLLL")}\nUser: ${bot.user.username}\nGuilds: ${bot.guilds.cache.size}\nMembers: ${bot.users.cache.size}\nChannels: ${bot.channels.cache.size}\nPrefix: ${prefix}\nCommands Loaded: ${bot.commands.size}\nBot is logged in!`);
};
