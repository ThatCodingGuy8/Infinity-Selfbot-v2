const { MessageEmbed } = require('discord.js-self');
const facts = require('./../../assets/cat-facts.json');
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'cat-fact',
    description: 'Returns an image of a cat',
    usage: 'cat-fact',
    aliases: ['catfact', 'cf'],
    /**
     * @param {Message} msg
     * @param args
     */
    async execute(msg, args) {

        let answer = facts[Math.floor(facts.length * Math.random())]

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setDescription(`**${answer}**`)
            .setFooter("Floofy")
            .setTimestamp()
        await Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
    }
}
