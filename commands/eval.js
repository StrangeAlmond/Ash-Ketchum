const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports = {
  name: "eval",
  description: "Evaluates the provided code.",
  aliases: ["evaluate"],
  async execute(message, args, bot) {
    // Only StrangeAlmond#0001 can use this command
    if (message.author.id != bot.ownerId) return;

    // Evaluate the code
    try {
      // Get the code
      const code = message.content.slice(4 + bot.prefix.length);

      // String representation of the returned value of the evaluated code
      const ev = require("util").inspect(eval(code));

      // Replace bot token if its in the evaluation
      if (ev.includes(botconfig.token)) ev.replace(/botConfig.token/gi, "Bot-Token-Replacement");

      if (ev.length > 1900) {
        return message.channel.send("This worked, but the response code is too long to send").then(msg => {
          setTimeout(() => {
            msg.delete();
            message.delete();
          }, 60000);
        });
      }

      message.channel.send(`**Input:**\n\`\`\`js\n${code}\`\`\`\n\n**Eval:**\`\`\`js\n${ev}\`\`\``).then(msg => {
        setTimeout(() => {
          msg.delete();
          message.delete();
        }, 60000);
      });

    } catch (err) {
      message.channel.send(`**Error:**\n!\`\`\`js\n${err}\`\`\``).then(msg => {
        setTimeout(() => {
          msg.delete();
          message.delete();
        }, 60000);
      });
    }
  },
};