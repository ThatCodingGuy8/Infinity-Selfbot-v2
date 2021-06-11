const { MessageEmbed } = require('discord.js-self');
const superagent = require('superagent');
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'cat',
    description: 'Returns an image of a cat',
    usage: 'cat',
    /**
     * @param {Message} msg
     * @param args
     */
    async execute(msg, args) {

        let {body} = await superagent.get(`https://nekos.life/api/v2/img/meow`);

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setDescription(`**Here's a cat to brighten your day**`)
            .setImage(body.url)
            .setFooter("Cats are adorable")
            .setTimestamp()
        await Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
    }
}
