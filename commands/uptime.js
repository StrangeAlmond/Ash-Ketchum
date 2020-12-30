const Discord = require("discord.js");

module.exports = {
  name: "uptime",
  description: "View the bot's uptime.",
  async execute(message, args, bot) {
    const uptimeObject = bot.functions.botUptime(bot.uptime, true);
    const uptimeMsg = `${uptimeObject.days}d, ${uptimeObject.hours}h, ${uptimeObject.minutes}m, ${uptimeObject.seconds}s`;

    const uptime = new Discord.MessageEmbed()
      .setAuthor("Uptime")
      .setColor(message.member.displayHexColor)
      .setDescription(uptimeMsg)
      .setFooter(bot.user.username, bot.user.displayAvatarURL)
      .setTimestamp();
    message.channel.send(uptime);
  },
};
