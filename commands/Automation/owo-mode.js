const { MessageEmbed } = require("discord.js-self");
const settings = require("./../../settings.json")
const { writeFileSync } = require("fs");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'owo-mode',
    description: 'Activates owo mode',
    usage: 'owo-mode <On/Off>',
    aliases: ['owomode', 'owom'],
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
        if (settings.owo == undefined ? [] : settings.owo)
            if (settings.owo == undefined) {
                settings.owo = false
            }

        if (!args[0]) {
            Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**Incorrect usage of command**`).setTimestamp(), msg.channel.id, msg, "Normal")
        }

        if (args[0]) {
            if (args[0].toUpperCase() == 'OFF') {
                settings.owo = false
                let embed = new MessageEmbed()
                    .setColor(settings.embedcolor)
                    .setDescription(`**OwO Mode: Disabled**`)
                    .setTimestamp()

                Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            }

            if (args[0].toUpperCase() == 'ON') {
                settings.owo = true
                let embed = new MessageEmbed()
                    .setColor(settings.embedcolor)
                    .setDescription(`**OwO Mode: Enabled**`)
                    .setTimestamp()

                Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            }

            writeFileSync("settings.json", JSON.stringify(settings, null, 1))
        }
    }
}