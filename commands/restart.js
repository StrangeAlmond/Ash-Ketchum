module.exports = {
  name: "restart",
  description: "Restart the bot.",
  async execute(message, args, bot) {
    if (message.author.id != bot.ownerId) return;
    await message.channel.send("Restarting...");
    await process.exit();
  },
};
