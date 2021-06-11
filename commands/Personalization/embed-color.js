const { MessageEmbed } = require('discord.js-self');
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'embed-color',
    description: 'Shows you what an embed color would look like',
    usage: 'embed-color <Input>',
    aliases: ['ec'],
    async execute(msg, args) {

        let input = args.join(" ")

        if (!input) {
            await Functions.SilentModeSend(
                new MessageEmbed()
                    .setDescription('**You must input a color to test**')
                    .setColor('RED')
                    .setTimestamp()
                , msg.channel.id, msg, "Normal")
            return;
        }

        await Functions.SilentModeSend(new MessageEmbed().setColor(input).setDescription(`**This is an example for how the color** ` + '`' + `${input}` + '`' + ` **would look like**`).setTimestamp(), msg.channel.id, msg, "Normal")
    }
}
