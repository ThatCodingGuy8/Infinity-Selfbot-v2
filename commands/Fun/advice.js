const { MessageEmbed } = require('discord.js-selfbot-updated);
const Quote = require('inspirational-quotes');
const settings = require("./../../settings.json");

module.exports = {
    name: 'advice',
    description: 'Returns some advice to help you',
    usage: 'advice',
    /**
     * @param {Message} msg
     */
    async execute(msg, args) {

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setDescription(`**${Quote.getRandomQuote()}**`)
            .setFooter(`Never forget the legends in your life`)
            .setTimestamp()
        msg.channel.send(embed)
    }
}