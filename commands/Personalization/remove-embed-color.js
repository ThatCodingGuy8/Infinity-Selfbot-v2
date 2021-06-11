const { MessageEmbed } = require('discord.js-self');
const { readFileSync, existsSync, writeFileSync, lstatSync } = require('fs');
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'remove-embed-color',
    description: 'Removes an embed color from your storage',
    usage: 'remove-embed-color <Input>',
    aliases: ['rec'],
    async execute(msg, args) {

        let input = args.join(" ")

        if (!input) {
            await Functions.SilentModeSend(
                new MessageEmbed()
                    .setDescription('**You must input a color to remove**')
                    .setColor('RED')
                    .setTimestamp()
                , msg.channel.id, msg, "Normal")
            return;
        }

        if (!existsSync('embed-colors.json')) {
            writeFileSync('embed-colors.json', '{}')
        }

        const object = JSON.parse(readFileSync('embed-colors.json', {encoding: 'utf8'}));

        if (Object.keys(object).indexOf(input) === -1) {
            await Functions.SilentModeSend(
                new MessageEmbed()
                    .setDescription('**Input was not found in database**')
                    .setColor('RED')
                    .setTimestamp()
                , msg.channel.id, msg, "Normal")
            return;
        }

        delete object[input]

        writeFileSync('embed-colors.json', JSON.stringify(object, null, 2), { encoding: 'utf8' })

        await Functions.SilentModeSend(
            new MessageEmbed()
                .setColor(input)
                .setDescription('`' + `${input}` + '`' + ` **has been removed from favourite Ecolors**`)
                .setTimestamp()
            , msg.channel.id, msg, "Normal")
    }
}
