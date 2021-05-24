const { MessageEmbed } = require('discord.js-selfbot');
const { readFileSync, existsSync, writeFileSync } = require('fs');

module.exports = {
    name: 'add-embed-color',
    description: 'Adds an embed color to your storage for later viewing',
    usage: 'add-embed-color <Input>',
    aliases: ['aec'],
    async execute(msg, args) {

        let input = args.join(" ")

        if (!input) return msg.channel.send(new MessageEmbed().setColor(`RED`).setDescription(`**You must provide a color to store**`).setTimestamp())

        if (!existsSync('embed-colors.json')) {
            writeFileSync('embed-colors.json', '{}')
        }

        var object = JSON.parse(readFileSync('embed-colors.json', { encoding: 'utf8' }))

        if (Object.keys(object).indexOf(input) !== -1) {
            msg.channel.send(
                new MessageEmbed()
                    .setColor(`#918bff`)
                    .setDescription(`**${input} is already a favourite Ecolor**`)
                    .setTimestamp()
            )
            return;
        }

        object[input] = true

        writeFileSync('embed-colors.json', JSON.stringify(object, null, 2), { encoding: 'utf8' })

        msg.channel.send(
            new MessageEmbed()
                .setColor(input)
                .setDescription('`' + `${input}` + '`' + ` **has been added to favourite Ecolors**`)
                .setTimestamp()
        )
    }
}