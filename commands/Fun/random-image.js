const { MessageEmbed } = require('discord.js-self');
const { RandomPicture } = require('random-picture')
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'random-image',
    description: 'Fetches a random image',
    usage: 'random-image',
    aliases: ['randomimage', 'randomi', 'rimage'],
    async execute(msg, args) {

        const image = await RandomPicture()

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setImage(`${image.url}`)
            .setFooter(`These images are completely random`)
            .setTimestamp()
        Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
    }
}