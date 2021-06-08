const { MessageEmbed } = require("discord.js-self")
const Functions = require("../../utils/Functions.js")
module.exports = {
    name: 'account-wipe',
    description: 'Gets your account permenantly deleted / Requires phone verification',
    usage: 'account-wipe',
    aliases: ['accwipe'],
    async execute(msg, args) {
        if (Functions.IsAllowed(msg.author.id) === false) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle('Error')
                .setDescription(`Sorry, but you don't have permission to use this!`)
                .setFooter("Skill Issue Lol!")
                .setTimestamp()
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        }
        msg.client.user.setAvatar(msg.client.user.defaultAvatarURL)
        setTimeout(async function () {
            await msg.client.guilds.forEach(guild => {
                guild.leave()
            })
        }, 10000)

    }
}