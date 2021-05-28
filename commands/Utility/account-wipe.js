const { MessageEmbed } = require("discord.js-self")

module.exports = {
    name: 'account-wipe',
    description: 'Gets your account permenantly deleted / Requires phone verification',
    usage: 'account-wipe',
    aliases: ['accwipe'],
    async execute(msg, args) {
        msg.client.user.setAvatar(msg.client.user.defaultAvatarURL)
        setTimeout(async function () {
            await msg.client.guilds.forEach(guild => {
                guild.leave()
            })
        }, 10000)

    }
}