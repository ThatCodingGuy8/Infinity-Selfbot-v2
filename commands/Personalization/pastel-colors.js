const { MessageEmbed } = require('discord.js-selfbot-updated');
const settings = require("../../settings.json");

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
        msg.channel.send(embed)

    }
}