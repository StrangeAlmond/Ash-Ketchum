const Discord = require("discord.js");
const numeral = require("numeral");

module.exports = {
    name: "xp",
    description: "Set your xp.",
    aliases: ["setxp", "set-xp", "set_xp", "xpset", "xp-set", "xp_set"],
    async execute(message, args, bot) {
        if (!args[0]) return message.channel.send("Specify the xp you'd like to set!");

        const xp = numeral(args[0])._value;

        if (isNaN(xp) || xp < 1) return message.channel.send("Invalid xp.");

        const userInfo = bot.userInfo.get(message.author.id);
        if (xp == userInfo.xp) return message.channel.send(`You have already set your xp to **${xp}**`);

        let level = 0;

        for (const XP of bot.xpPerLevel) {
            if ((xp - XP) >= 0) level++;
        }

        bot.userInfo.set(message.author.id, level, "level");
        bot.userInfo.set(message.author.id, Date.now(), "lastLevelUp");
        bot.userInfo.set(message.author.id, xp, "xp");

        const guilds = bot.guilds.cache.filter(g => g.members.cache.some(m => m.id == message.author.id));

        guilds.forEach(guild => {
            const member = guild.members.cache.find(m => m.id == message.author.id);

            if (bot.functions.hasLevelInNickname(member.displayName)) {
                const newNickname = member.displayName.replace(bot.functions.getLvlFromNickname(member.displayName), `(L${level})`);
                member.setNickname(newNickname).catch(console.error)
            } else {
                member.setNickname(`${member.displayName} (L${level})`).catch(console.error);
            }
        });

        message.reply(`Got it! I have set your xp to **${numeral(xp).format("0,0")}** and your level to **${level}**.`);
    },
};