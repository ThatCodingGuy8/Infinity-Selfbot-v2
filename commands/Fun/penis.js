const { MessageEmbed } = require('discord.js-self');
const { getMemberMention } = require('../../utils/Mentions');
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'penis',
    description: 'Gets a users penis size',
    usage: 'penis <Mention>',
    aliases: ['pp'],
    async execute(msg, args) {

        let member = await getMemberMention(msg, args)

        if (!member) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**You must mention someone to measure their penis (kinda gay ngl)**`).setTimestamp(), msg.channel.id, msg, "Normal")

        let replies = [
            "8D",
            "8=D",
            "8==D",
            "8===D",
            "8====D",
            "8=====D",
            "8======D",
            "8=======D",
            "8========D",
            "8=========D",
            "8==========D",
            "8===========D",
            "8============D",
            "8=============D",
            "8==============D",
            "8===============D",
            "8================D",
        ]

        let random = replies[Math.floor(Math.random() * replies.length)]

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setDescription(`**${member}'s Penis size is: ${random}**`)
            .setFooter(`You should start an OnlyFans`)
            .setTimestamp()
        await Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
    }
}
