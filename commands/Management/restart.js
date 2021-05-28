const { Message, MessageEmbed } = require("discord.js-self")
const Functions = require("../../utils/Functions.js")
module.exports = {
    name: 'restart',
    description: 'Restarts the bot, pretty simple',
    usage: 'restart',
    /**
     * @param {msg} msg
     */
    async execute(msg, args) {
        await Functions.SilentModeSend(new MessageEmbed().setTitle("Restarted!").setFooter("Ill be back soon!").setTimestamp(), msg.channel.id, msg, "Normal")
        process.exit(1)
    }
}