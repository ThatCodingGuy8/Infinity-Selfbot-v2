const { MessageEmbed } = require("discord.js-self");
const settings = require("./../../settings.json")
const { writeFileSync } = require("fs");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'anigame-snipe',
    description: 'Activates a sniper for the anigame bot',
    usage: 'anigame-snipe <On/Off>',
    aliases: ['ag-snipe', 'agsnipe'],
    async execute(msg, args) {
        if (msg.author.id !== msg.client.user.id) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle('Error')
                .setDescription(`Sorry, but only the account im connected to can run this!`)
                .setFooter("Skill Issue")
                .setTimestamp()
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        }
        if (settings.anigame == undefined ? [] : settings.anigame)
            if (settings.anigame == undefined) {
                settings.anigame = false
            }

        if (!args[0]) {
            Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**Incorrect usage of command**`).setTimestamp(), msg.channel.id, msg, "Normal")
        }

        if (args[0]) {
            if (args[0].toUpperCase() == 'OFF') {
                settings.anigame = false
                let embed = new MessageEmbed()
                    .setColor(settings.embedcolor)
                    .setDescription(`**Anigame Snipe: Disabled**`)
                    .setTimestamp()

                Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            }

            if (args[0].toUpperCase() == 'ON') {
                settings.anigame = true
                let embed = new MessageEmbed()
                    .setColor(settings.embedcolor)
                    .setDescription(`**Anigame Snipe: Enabled**`)
                    .setTimestamp()

                Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            }

            writeFileSync("settings.json", JSON.stringify(settings, null, 1))
        }
    }
}