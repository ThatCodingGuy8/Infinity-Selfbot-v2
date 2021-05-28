const { MessageEmbed } = require('discord.js-self');
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'random-member',
    description: 'Gets a random member fron the discord',
    usage: 'random-member',
    aliases: ['randommember', 'randomm', 'rmember', 'rmem'],
    async execute(msg, args) {

        let member = msg.guild.members.cache.random()

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setDescription(`**Randomly Chose Member: ${member}**`)
            .setFooter("Why did you use this?")
            .setTimestamp()
        Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
    }
}