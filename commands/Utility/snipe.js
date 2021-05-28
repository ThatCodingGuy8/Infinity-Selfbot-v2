const { MessageEmbed } = require("discord.js-self");
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'snipe',
    description: 'Fetches the most recent deleted message within the channel',
    usage: 'snipe',
    async execute(msg, args) {

        const sniped = msg.client.delMsg.get(`${msg.channel.id}`);

        if (!sniped) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**There are no messages to snipe**`).setTimestamp(), msg.channel.id, msg, "Normal")

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setAuthor(`Deleted by ${sniped.author.tag}`, sniped.author.displayAvatarURL())
            .setThumbnail(sniped.author.displayAvatarURL)
            .setDescription(sniped.content || sniped.attachments[0].proxyUrl)
            .setTimestamp()

        Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")

    }
}