const { MessageEmbed } = require("discord.js-self");
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'edit-snipe',
    description: 'Fetches the most recent edited message within the channel',
    usage: 'edit-snipe',
    aliases: ['esnipe'],
    async execute(msg, args) {

        const esnipedb = msg.client.editMsgBefore.get(`${msg.channel.id}`);
        const esnipeda = msg.client.editMsgAfter.get(`${msg.channel.id}`);

        if (!esnipedb) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**There are no messages to edit-snipe**`).setTimestamp(), msg.channel.id, msg, "Normal")

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setAuthor(`Edited by ${esnipedb.author.tag}`, esnipedb.author.displayAvatarURL())
            .setThumbnail(esnipedb.author.displayAvatarURL)
            .addField(`Before:`, esnipedb.content || "**Cannot display embeds**")
            .addField(`After:`, esnipeda.content || "**Cannot display embeds**")
            .addFooter("W-Why are you looking at me?! Pervert!")
            .setTimestamp()

        await Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")

    }
}
