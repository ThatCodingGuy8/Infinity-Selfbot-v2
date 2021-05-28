const { MessageEmbed } = require('discord.js-self');
const leet = require('1337');
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'leet',
    description: 'Converts given text to 1337 form',
    usage: 'leet <Text>',
    aliases: ['1337'],
    async execute(msg, args) {

        let input = args.join(" ")

        if (!input) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**You must provide some text to convert**`).setTimestamp(), msg.channel.id, msg, "Normal")

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setDescription(`**${leet(input)}**`)
            .setTimestamp()
        msg.channel.send(embed)
    }
}