const Discord = require("discord.js");

module.exports = {
  name: "reload",
  description: "Reload a command.",
  async execute(message, args, bot, getUserFromMention) {
    if (message.author.id != bot.ownerId) return;
    if (!args[0]) return message.channel.send("Specify which command to reload.");
    const commandName = args[0];

    if (!bot.commands.has(commandName)) {
      return message.channel.send("Invalid command.").then(msg => msg.delete(5000));
    }

    delete require.cache[require.resolve(`./${commandName}.js`)];
    bot.commands.delete(commandName);
    const props = require(`./${commandName}.js`);

    bot.commands.set(commandName, props);
    message.reply(`The command !${commandName} has been reloaded.`).then(msg => msg.delete(5000) && message.delete(5000));
  },
};
