const { MessageEmbed } = require('discord.js-selfbot');
const { readFileSync } = require('fs');
const settings = require("./../../settings.json");

module.exports = {
    name: 'favourites',
    description: 'Your embed color storage',
    usage: 'favourites',
    aliases: ['favs'],
    async execute(msg, args) {

        const object = JSON.parse(readFileSync('embed-colors.json', { encoding: 'utf8' }))

        const tags = Object.keys(object);
        const ans = tags.join(', ')

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setTitle(`**Favourite Embed color List**`)
            .setDescription('`' + `${ans}` + '`')
            .setTimestamp()
        msg.channel.send(embed)

    }
}