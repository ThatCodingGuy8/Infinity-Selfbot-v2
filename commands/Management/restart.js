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
        if (msg.author.id !== msg.client.user.id) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle('Error')
                .setDescription(`Sorry, but only the account im connected to can run this!`)
                .setFooter("Skill Issue")
                .setTimestamp()
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        }
        await Functions.SilentModeSend(new MessageEmbed().setTitle("Restarted!").setFooter("Ill be back soon!").setTimestamp(), msg.channel.id, msg, "Normal")
        process.exit(1)
    }
}