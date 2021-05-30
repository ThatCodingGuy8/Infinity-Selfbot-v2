const { MessageEmbed } = require('discord.js-self');

module.exports = {
    name: 'streaming',
    description: 'Sets your status to streaming <input>',
    usage: 'streaming <Input>',
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

        msg.client.user.setActivity(`${input}`, { type: 'STREAMING' })

        msg.channel.send(new MessageEmbed().setColor(`#918bff`).setDescription(`**Successfully set activity to** ` + '`' + `Streaming ${input}` + '`').setTimestamp())
    }
}