let interval;

const { Message, MessageEmbed } = require('discord.js-self');
const ms = require('ms');
const figlet = require('figlet');
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'repeat',
    description: 'Repeats the given message for the amount of time you put',
    usage: 'repeat <Time> <Text>',
    /**
     * @param {Message} msg
     * @param args
     */
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
        if (args[0].toUpperCase() === 'OFF') {
            clearInterval(interval)
            interval = undefined;
            await Functions.SilentModeSend(new MessageEmbed().setColor('#918bff').setDescription(`**Stopped the message repeating**`).setTimestamp(), msg.channel.id, msg, "Normal")
            figlet("Ignore Error", async (err, ascii) => { console.log(ascii) })
            stop();
        }

        let time = ms(args[0])

        if (!time) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**You must provide an interval to repeat at**`).setTimestamp(), msg.channel.id, msg, "Normal")

        let input = await args.shift() && args.join(" ")

        if (!input) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**You must provide something to repeat**`).setTimestamp(), msg.channel.id, msg, "Normal")

        if (!interval) {
            interval = setInterval(function () { Functions.SilentModeSend(input, msg.channel.id, msg, "Normal") }, time)
            await Functions.SilentModeSend(new MessageEmbed().setColor('#918bff').setDescription(`**Starting your message: "${input}" on repeat for ${time}ms**`).setTimestamp(), msg.channel.id, msg, "Normal")

        }
    }
}
