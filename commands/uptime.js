const Discord = require("discord.js");

module.exports = {
  name: "uptime",
  description: "View the bot's uptime.",
  async execute(message, args, bot) {
    const uptimeObject = bot.functions.botUptime(bot.uptime, true);
    const uptimeMsg = `${uptimeObject.days}d, ${uptimeObject.hours}h, ${uptimeObject.minutes}m, ${uptimeObject.seconds}s`;

    const uptimeEmbed = new Discord.MessageEmbed()
      .setTitle("Uptime")
      .setColor(message.member.displayHexColor)
      .setDescription(uptimeMsg)
      .setFooter({
        text: bot.user.username,
        iconURL: bot.user.displayAvatarURL()
      })
      .setTimestamp();

    message.channel.send({
      embeds: [uptimeEmbed]
    });
  },
};