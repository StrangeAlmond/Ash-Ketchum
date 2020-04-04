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
      const code = message.content.slice(6);

      // String representation of the returned value of the evaluated code
      const ev = require("util").inspect(eval(code));

      // Replace bot token if its in the evaluation
      if (ev.includes(botconfig.token)) ev.replace(/botConfig.token/gi, "Bot-Token-Replacement");

      if (ev.length > 1900) {
        return message.channel.send("This worked but the response code is too long to send").then(msg => {
          msg.delete(30000);
          message.delete(60000);
        });
      }

      message.channel.send(`**Input:**\n\`\`\`js${code}\`\`\`\n\n**Eval:**\`\`\`js\n${ev}\`\`\``).then(msg => {
        msg.delete(30000);
        message.delete(60000);
      });

    } catch (err) {
      message.channel.send(`**Error:**\n!\`\`\`js\n${err}\`\`\``).then(msg => {
        msg.delete(30000);
        message.delete(60000);
      });
    }
  },
};
