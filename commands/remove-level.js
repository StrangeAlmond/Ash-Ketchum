module.exports = {
    name: "remove-level",
    description: "Remove your level from your nickname.",
    aliases: ["levelremove", "removelevel", "remove_level"],
    async execute(message, args, bot) {
        if (!bot.functions.hasLevelInNickname(message.member.displayName)) {
            return message.channel.send("Your nickname does not currently contain your level.");
        }

        const newNickname = message.member.displayName.replace(bot.functions.getLvlFromNickname(message.member.displayName), "");
        message.member.setNickname(newNickname).catch(console.error);

        message.channel.reply("Got it! I have removed your level from your nickname.");
    },
};