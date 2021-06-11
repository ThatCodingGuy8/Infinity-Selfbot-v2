const { MessageEmbed } = require('discord.js-self');
const Functions = require("../../utils/Functions.js")
module.exports = {
    name: 'listening',
    description: 'Sets your status to listening to <input>',
    usage: 'listening <Input>',
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
        let input = args.join(" ")

        if (!input) {
            msg.channel.send(
                new MessageEmbed()
                    .setDescription('**You must input a status to set**')
                    .setColor('RED')
                    .setTimestamp()
            )
            return;
        }

        await msg.client.user.setActivity(`${input}`, {type: 'LISTENING'})

        msg.channel.send(new MessageEmbed().setColor(`#918bff`).setDescription(`**Successfully set activity to** ` + '`' + `Listening to ${input}` + '`').setTimestamp())
    }
}
