const { mock } = require('./../../utils/Functions.js');
const { MessageEmbed } = require('discord.js-self');
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'mock',
    description: 'Converts given text to mocking form',
    usage: 'mock <Text>',
    async execute(msg, args) {

        let input = args.join(" ")

        if (!input) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**You must provide some text to convert**`).setTimestamp(), msg.channel.id, msg, "Normal")

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setDescription(`**${mock(input)}**`)
            .setFooter("Thats not nice >:(")
            .setTimestamp()
        msg.channel.send(embed)
    }
}