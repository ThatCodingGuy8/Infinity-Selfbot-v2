const { MessageEmbed } = require('discord.js-self');
const Quote = require('inspirational-quotes');
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'advice',
    description: 'Returns some advice to help you',
    usage: 'advice',
    /**
     * @param {Message} msg
     * @param args
     */
    async execute(msg, args) {

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setDescription(`**${Quote.getRandomQuote()}**`)
            .setFooter(`You can do this!`)
            .setTimestamp()
        await Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
    }
}
