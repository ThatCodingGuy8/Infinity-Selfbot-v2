const { MessageEmbed } = require("discord.js-selfbot-updated");
const settings = require("./../../settings.json")
const { writeFileSync } = require("fs");

module.exports = {
    name: 'owo-mode',
    description: 'Activates owo mode',
    usage: 'owo-mode <On/Off>',
    aliases: ['owomode', 'owom'],
    async execute(msg, args) {

        if (settings.owo == undefined ? [] : settings.owo)
            if (settings.owo == undefined) {
                settings.owo = false
            }

        if (!args[0]) {
            msg.channel.send(new MessageEmbed().setColor(`RED`).setDescription(`**Incorrect usage of command**`).setTimestamp())
        }

        if (args[0]) {
            if (args[0].toUpperCase() == 'OFF') {
                settings.owo = false
                let embed = new MessageEmbed()
                    .setColor(settings.embedcolor)
                    .setDescription(`**OwO Mode: Disabled**`)
                    .setTimestamp()

                msg.channel.send(embed)
            }

            if (args[0].toUpperCase() == 'ON') {
                settings.owo = true
                let embed = new MessageEmbed()
                    .setColor(settings.embedcolor)
                    .setDescription(`**OwO Mode: Enabled**`)
                    .setTimestamp()

                msg.channel.send(embed)
            }

            writeFileSync("settings.json", JSON.stringify(settings, null, 1))
        }
    }
}