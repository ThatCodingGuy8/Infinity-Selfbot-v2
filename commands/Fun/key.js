const { MessageEmbed } = require('discord.js-self');
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'key',
    description: 'Generates a random string like a key',
    usage: 'key',
    async execute(msg, args) {

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setDescription(`**${[...new Array(65).keys()].map(key => String.fromCharCode(Math.floor(Math.random() * 15) + 65)).map(key => String(key)[`to${new Array('Lower', 'Upper')[Math.floor(Math.random() * 2)]}Case`]()).join('')}**`)
            .setTimestamp()
        Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
    }
}