const { MessageEmbed } = require('discord.js-self');
const { getRoleMention } = require('../../utils/Mentions.js');
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'role-hex',
    description: 'Takes a roles hex color and shows you it',
    usage: 'role-hex <Role>',
    aliases: ['rh'],
    async execute(msg, args) {

        let input = args.join(" ")

        if (!input) {
            await Functions.SilentModeSend(
                new MessageEmbed()
                    .setDescription('**You must input a role to scan**')
                    .setColor('RED')
                    .setTimestamp()
                , msg.channel.id, msg, "Normal")
            return;
        }

        let role = await getRoleMention(msg, args)

        let RoleHex = role.hexColor

        await Functions.SilentModeSend(
            new MessageEmbed()
                .setColor(RoleHex)
                .setDescription('`' + `${RoleHex}` + '`' + ` **Is ${role.toString()}'s Role HexCode**`)
                .setTimestamp()
            , msg.channel.id, msg, "Normal")
    }
}
