const Discord = require("discord.js");

module.exports = {
    name: "about",
    description: "Bot information/statistics.",
    async execute(message, args, bot) {
        // Bot stats
        const uptimeObject = bot.functions.botUptime(bot.uptime, true);
        const uptime = `${uptimeObject.hours}h, ${uptimeObject.minutes}m, ${uptimeObject.seconds}s`;
        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        // Create a RichEmbed for it and send it
        const statsEmbed = new Discord.RichEmbed()
            .setColor(message.member.displayHexColor)
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("Uptime", `${uptime}`)
            .addField("Memory Usage", `${memoryUsage} MB`)
            .addField("Version", bot.version)
            .addField("Library", `Discord.js v${Discord.version}`)
            .addField("Node.js", `${process.version}`)
            .setFooter("© 2019 StrangeAlmond#0001", bot.user.displayAvatarURL)
            .setTimestamp();
        message.channel.send(statsEmbed);
    },
};
