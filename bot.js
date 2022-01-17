const Discord = require("discord.js");
const Enmap = require("enmap");
const botconfig = require("./botconfig.json");
const fs = require("fs");

const bot = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
});

bot.userInfo = new Enmap({
    name: "users"
});

bot.guildInfo = new Enmap({
    name: "guilds"
});

// Command and Event Handlers
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];

    bot.on(eventName, event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
}

// Debugging
process.on("unhandledRejection", error => console.error("Uncaught Promise Rejection", error));

bot.login(botconfig.token);
