const Discord = require("discord.js");
const numeral = require("numeral");

module.exports = {
    name: "xp",
    description: "Set your xp.",
    aliases: ["setxp", "set-xp", "set_xp", "xpset", "xp-set", "xp_set"],
    async execute(message, args, bot) {
        if (!args[0]) return message.channel.send("Specify the level you'd like to set!");

        const xp = numeral(args[0])._value;

        if (isNaN(xp) || xp < 1) return message.channel.send("Invalid xp.");

        const userInfo = bot.userInfo.get(message.author.id);
        if (xp == userInfo.level) return message.channel.send(`You have already set your xp to **${xp}**`);

        let level = 0;

        for (const XP of bot.xpPerLevel) {
            if ((xp - XP) >= 0) level++;
        }

        bot.userInfo.set(message.author.id, level, "level");
        bot.userInfo.set(message.author.id, Date.now(), "lastLevelUp");
        bot.userInfo.set(message.author.id, xp, "xp");

        const guilds = bot.guilds.cache.filter(g => g.members.cache.some(m => m.id == message.author.id));

        guilds.forEach(guild => {
            const user = guild.members.cache.find(m => m.id == message.author.id);

            if (bot.functions.hasLevelInNickname(user.displayName)) {
                const newNickname = user.displayName.replace(bot.functions.getLvlFromNickname(user.displayName), `(L${level})`);
                user.setNickname(newNickname);
            } else {
                user.setNickname(`${user.displayName} (L${level})`);
            }
        });

        message.channel.send(`Got it! I have set your xp to **${numeral(xp).format("0,0")}** and your level to **${level}**.`);
    },
};
