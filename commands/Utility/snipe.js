const { MessageEmbed } = require("discord.js-selfbot-new");
const settings = require("./../../settings.json");

module.exports = {
    name: 'snipe',
    description: 'Fetches the most recent deleted message within the channel',
    usage: 'snipe',
    async execute(msg, args) {

        const sniped = msg.client.delMsg.get(`${msg.channel.id}`);

        if (!sniped) return msg.channel.send(new MessageEmbed().setColor(`RED`).setDescription(`**There are no messages to snipe**`).setTimestamp())

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setAuthor(`Deleted by ${sniped.author.tag}`, sniped.author.displayAvatarURL())
            .setThumbnail(sniped.author.displayAvatarURL)
            .setDescription(sniped.content || sniped.attachments[0].proxyUrl)
            .setTimestamp()

        msg.channel.send(embed)

    }
}