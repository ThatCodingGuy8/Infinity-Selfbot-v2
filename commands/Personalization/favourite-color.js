const { MessageEmbed } = require('discord.js-self');
const { readFileSync } = require('fs');
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'favourite-color',
    description: 'Selects an embed color from favourites, and shows the color',
    usage: 'favourite-color <Number>',
    aliases: ['favc'],
    async execute(msg, args) {

        if (!args[0]) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**You must input a favourites number**`).setTimestamp(), msg.channel.id, msg, "Normal")

        const object = JSON.parse(readFileSync('embed-colors.json', { encoding: 'utf8' }))

        const tags = Object.keys(object);
        const ans = tags[args[0] - 1]

        if (!ans) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**That is not a valid input, try again**`).setFooter(`${tags.length} Total Favourites`).setTimestamp(), msg.channel.id, msg, "Normal")

        let embed = new MessageEmbed()
            .setColor(ans)
            .setDescription(`** This is what your favourite Hex Code ** ` + '`' + `${ans}` + '`' + ` ** would look like **`)
            .setTimestamp()
        await Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")

    }
}
