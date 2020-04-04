const prefix = require("../botconfig.json").prefix;
const moment = require("moment-timezone");

module.exports = async (bot, message) => {
    if (!message.content.startsWith(bot.prefix) || message.author.bot) return;

    bot.userInfo.ensure(message.author.id, {
        user: message.author.id,
        level: 0,
        xp: 0,
        lastLevelUp: Date.now()
    });

    const args = message.content.slice(prefix.length).toLowerCase().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
   
    if (!command) return;

    await command.execute(message, args, bot).catch(e => {
        console.error(`Error executing command: ${e.stack}`);
        message.channel.send("🚫  There was an error trying to execute that command, please contact StrangeAlmond#0001.");
    });

    const commandLog = `${message.member.displayName} (${message.author.id}), used the ${bot.prefix}${command.name} ${args.join(" ")} command, in channel #${message.channel.name} (${message.channel.id}) at ${moment(message.createdTimestamp).tz("America/Los_Angeles").format("llll")}, in the guild ${message.guild.name} (${message.guild.id}).`;
    console.info(commandLog);
};
