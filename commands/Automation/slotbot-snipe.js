const { MessageEmbed } = require("discord.js-selfbot");
const settings = require("../../settings.json")
const { writeFileSync } = require("fs");

module.exports = {
    name: 'slotbot-snipe',
    description: 'Activates a sniper for the slotbot bot',
    usage: 'slotbot-snipe <On/Off>',
    aliases: ['sb-snipe', 'sbsnipe'],
    async execute(msg, args) {

        if (settings.slotbot == undefined ? [] : settings.slotbot)
            if (settings.slotbot == undefined) {
                settings.slotbot = false
            }

        if (!args[0]) {
            msg.channel.send(new MessageEmbed().setColor(`RED`).setDescription(`**Incorrect usage of command**`).setTimestamp())
        }

        if (args[0]) {
            if (args[0].toUpperCase() == 'OFF') {
                settings.slotbot = false
                let embed = new MessageEmbed()
                    .setColor(settings.embedcolor)
                    .setDescription(`**Slotbot Snipe: Disabled**`)
                    .setTimestamp()

                msg.channel.send(embed)
            }

            if (args[0].toUpperCase() == 'ON') {
                settings.slotbot = true
                let embed = new MessageEmbed()
                    .setColor(settings.embedcolor)
                    .setDescription(`**Slotbot Snipe: Enabled**`)
                    .setTimestamp()

                msg.channel.send(embed)
            }

            writeFileSync("settings.json", JSON.stringify(settings, null, 1))
        }
    }
}