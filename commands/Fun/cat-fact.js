const { MessageEmbed } = require('discord.js-selfbot-new');
const facts = require('./../../assets/cat-facts.json');
const settings = require("./../../settings.json");

module.exports = {
    name: 'cat-fact',
    description: 'Returns an image of a cat',
    usage: 'cat-fact',
    aliases: ['catfact', 'cf'],
    /**
     * @param {Message} msg
     */
    async execute(msg, args) {

        let answer = facts[Math.floor(facts.length * Math.random())]

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setDescription(`**${answer}**`)
            .setTimestamp()
        msg.channel.send(embed)
    }
}