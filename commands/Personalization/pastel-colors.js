const { MessageEmbed } = require('discord.js-self');
const settings = require("../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'pastel-colors',
    description: 'Shows some pastel hex codes',
    usage: 'pastel-colors',
    aliases: ['pc'],
    async execute(msg, args) {

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setDescription(`**"Pastel Rainbow" colors**`)
            .setTimestamp()
        await Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")

    }
}
