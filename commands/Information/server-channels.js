const { Message, MessageEmbed } = require('discord.js-self');
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'server-channels',
    description: 'Displays every channel, including hidden ones',
    usage: 'server-channels',
    aliases: ['schannels', 'serverchannels', 'serverch'],
    /**
     * @param {Message} msg
     */
    async execute(msg, args) {

        let channels = msg.guild.channels.cache.map(ch => ch.toString()).join(", ")

        if (channels.length > 2000) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**This server has too many channels to list\n${msg.guild.channels.cache.size} Channels**`).setTimestamp(), msg.channel.id, msg, "Normal")

        const embed = new MessageEmbed()
            .setDescription(`**${channels}**`)
            .setColor(settings.embedcolor)
            .setTimestamp()
            .setFooter(`There are ${msg.guild.channels.cache.size} channels in total`)

        await Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
    }
}
