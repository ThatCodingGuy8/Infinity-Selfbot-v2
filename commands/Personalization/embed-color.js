const { MessageEmbed } = require('discord.js-selfbot-new');

module.exports = {
    name: 'embed-color',
    description: 'Shows you what an embed color would look like',
    usage: 'embed-color <Input>',
    aliases: ['ec'],
    async execute(msg, args) {

        let input = args.join(" ")

        if (!input) {
            msg.channel.send(
                new MessageEmbed()
                    .setDescription('**You must input a color to test**')
                    .setColor('RED')
                    .setTimestamp()
            )
            return;
        }

        msg.channel.send(new MessageEmbed().setColor(input).setDescription(`**This is an example for how the color** ` + '`' + `${input}` + '`' + ` **would look like**`).setTimestamp())
    }
}