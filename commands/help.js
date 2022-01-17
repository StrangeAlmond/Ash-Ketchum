const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "View the bot's commands.",
    aliases: ["commands"],
    async execute(message, args, bot) {
        const ownerCommands = ["eval", "restart", "reload"];
        const command = bot.commands
            .filter(c => !ownerCommands.includes(c.name))
            .map(c => `**${bot.prefix}${c.name}** - ${c.description}`)
            .join("\n");

        const helpEmbed = new Discord.MessageEmbed()
            .setAuthor({
                name: `${bot.user.username}'s Commands`,
                iconURL: bot.user.displayAvatarURL()
            })
            .setDescription(command)
            .setColor(message.member.displayHexColor)
            .setTimestamp();

        message.channel.send({
            embeds: [helpEmbed]
        });
    },
};