const { MessageEmbed } = require("discord.js-self");
const settings = require("../../settings.json")
const { writeFileSync } = require("fs");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'slotbot-snipe',
    description: 'Activates a sniper for the slotbot bot',
    usage: 'slotbot-snipe <On/Off>',
    aliases: ['sb-snipe', 'sbsnipe'],
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
        if (settings.slotbot === undefined ? [] : settings.slotbot)
            if (settings.slotbot === undefined) {
                settings.slotbot = false
            }

        if (!args[0]) {
            await Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**Incorrect usage of command**`).setTimestamp(), msg.channel.id, msg, "Normal")
        }

        if (args[0]) {
            if (args[0].toUpperCase() === 'OFF') {
                settings.slotbot = false
                let embed = new MessageEmbed()
                    .setColor(settings.embedcolor)
                    .setDescription(`**Slotbot Snipe: Disabled**`)
                    .setTimestamp()

                await Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            }

            if (args[0].toUpperCase() === 'ON') {
                settings.slotbot = true
                let embed = new MessageEmbed()
                    .setColor(settings.embedcolor)
                    .setDescription(`**Slotbot Snipe: Enabled**`)
                    .setTimestamp()

                await Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            }

            writeFileSync("settings.json", JSON.stringify(settings, null, 1))
        }
    }
}
