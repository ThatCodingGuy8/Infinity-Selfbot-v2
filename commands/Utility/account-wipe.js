const { MessageEmbed } = require("discord.js-self")

module.exports = {
    name: 'account-wipe',
    description: 'Gets your account permenantly deleted / Requires phone verification',
    usage: 'account-wipe',
    aliases: ['accwipe'],
    async execute(msg, args) {
        if (msg.author.id !== msg.client.user.id) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle('Error')
                .setDescription(`Sorry, but only the account im connected to can run this!`)
                .setFooter("Skill Issue")
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