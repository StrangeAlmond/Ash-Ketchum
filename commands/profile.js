const Discord = require("discord.js");
const moment = require("moment-timezone");
const numeral = require("numeral");

module.exports = {
    name: "profile",
    description: "View your profile.",
    async execute(message, args, bot) {
        // This allows a user to view both their own level and somebody else's.
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const userInfo = bot.userInfo.get(user.id);

        const profileEmbed = new Discord.MessageEmbed()
            .setAuthor({
                name: `${user.displayName}'s Profile`,
                iconURL: user.user.displayAvatarURL()
            })
            .addField("Level", userInfo.level.toString(), true)
            .addField("XP", numeral(userInfo.xp).format("0,0"), true)
            .addField("Last Level Up", moment(userInfo.lastLevelUp).tz("America/Los_Angeles").format("lll"))
            .setColor(user.displayHexColor)
            .setTimestamp();

        message.channel.send({
            embeds: [profileEmbed]
        });
    },
};