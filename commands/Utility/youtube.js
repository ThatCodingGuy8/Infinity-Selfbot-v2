const { Message, MessageEmbed } = require('discord.js-self');
const usetube = require('usetube')
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'youtube',
    description: 'Searches youtube for given input',
    usage: 'youtube <Input>',
    aliases: ['yt'],
    /**
     * @param {Message} msg
     */
    async execute(msg, args) {

        let input = args.join(" ")

        if (!input) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**You must provide something to search**`).setTimestamp(), msg.channel.id, msg, "Normal")

        await usetube.searchVideo(input).then(async data => {
            Functions.SilentModeSend(`https://www.youtube.com/watch?v=${data.videos[0].id}`, msg.channel.id, msg, "Normal")
        })

    }
}