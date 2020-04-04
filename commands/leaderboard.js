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
            .filter(u => u.xp > 0 && message.guild.members.get(u.user))
            .sort((a, b) => b.xp - a.xp)
            .splice(0, 10);

        const embed = new Discord.RichEmbed()
            .setAuthor(`${message.guild.name}'s ${board.charAt(0).toUpperCase() + board.slice(1)} Leaderboard`, message.guild.iconURL)
            .setTimestamp();

        for (const user of users) {
            embed.addField(`${message.guild.members.get(user.user).displayName}`, `${board == "level" ? `Level ${user.level}` : `${numeral(user.xp).format("0,0")} XP`}`);
        }

        message.channel.send(embed);
    },
};
