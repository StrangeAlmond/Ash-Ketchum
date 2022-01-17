const Discord = require("discord.js");
const numeral = require("numeral");

module.exports = {
    name: "leaderboard",
    description: "View the guilds' leaderboard.",
    aliases: ["board"],
    async execute(message, args, bot) {
        let board = "xp";
        if (args[0] == "level") board = "level";

        const users = bot.userInfo
            .array()
            .filter(u => u.xp > 0 && message.guild.members.cache.get(u.user))
            .sort((a, b) => b.xp - a.xp)
            .splice(0, 10);

        const boardEmbed = new Discord.MessageEmbed()
            .setAuthor({
                name: `${message.guild.name}'s ${board.charAt(0).toUpperCase() + board.slice(1)} Leaderboard`,
                iconURL: message.guild.iconURL
            })
            .setTimestamp();

        for (const user of users) {
            boardEmbed.addField(`${message.guild.members.cache.get(user.user).displayName}`,
                `${board == "level" ? `Level ${user.level}` : `${numeral(user.xp).format("0,0")} XP`}`);
        }

        message.channel.send({
            embeds: [boardEmbed]
        });
    },
};