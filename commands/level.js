const Discord = require("discord.js");

module.exports = {
    name: "level",
    description: "Set your level.",
    aliases: ["set-level", "setlevel", "level-set", "levelset"],
    async execute(message, args, bot) {
        if (!args[0]) return message.channel.send("Specify what you'd like to set your level to.");

        const level = parseInt(args[0]);

        if (isNaN(level)) return message.channel.send("Invalid level.");
        if (level < 1 || level > bot.levelLimit) return message.channel.send("Invalid level.");

        const userInfo = bot.userInfo.get(message.author.id);
        if (level == userInfo.level) return message.channel.send(`You have already set your level to ${level}.`);

        const xp = bot.xpPerLevel[level - 1];

        bot.userInfo.set(message.author.id, level, "level");
        bot.userInfo.set(message.author.id, Date.now(), "lastLevelUp");
        bot.userInfo.set(message.author.id, xp, "xp");

        const guilds = bot.guilds.filter(g => g.members.some(m => m.id == message.author.id));

        guilds.forEach(guild => {
            const user = guild.members.find(m => m.id == message.author.id);

            if (bot.functions.hasLevelInNickname(user.displayName)) {
                const newNickname = user.displayName.replace(bot.functions.getLevelFromNickname(user.displayName), `(L${level})`);
                user.setNickname(newNickname);
            } else {
                user.setNickname(`${user.displayName} (L${level})`);
            }
        });

        message.channel.send(`Got it! I have set your level to **${level}**.`);
    },
};
