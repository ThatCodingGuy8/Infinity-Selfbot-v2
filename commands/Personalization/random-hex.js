const { MessageEmbed } = require('discord.js-self');
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'random-hex',
    description: 'Displays a random hex code and its color',
    usage: 'random-hex',
    aliases: ['reh'],
    async execute(msg, args) {

        function randomHexColor() {
            return '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
        }

        let randomhex = randomHexColor()

        let embed = new MessageEmbed()
            .setColor(randomhex)
            .setDescription(`**Random Hex Code: **` + '`' + `${randomhex}` + '`')
            .setFooter(`Embed color = Random Hex Code color`)
        await Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
    }
}
