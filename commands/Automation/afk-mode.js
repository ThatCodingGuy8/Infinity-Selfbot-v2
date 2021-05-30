const { MessageEmbed } = require("discord.js-self");
const settings = require("./../../settings.json")
const { writeFileSync } = require("fs");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'afk-mode',
    description: 'Activates an auto response mode for dms',
    usage: 'afk-mode <Text/Off>',
    aliases: ['afkmode', 'afk'],
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
        if (settings.afk == undefined ? [] : settings.afk)
            if (settings.afk == undefined) {
                settings.afk = false
            }

        let input = args.join(" ") || "I'm currently away, please dm later"

        if (!input) {
            settings.afk = input

            let embed = new MessageEmbed()
                .setColor(settings.embedcolor)
                .setDescription(`**AFK Mode [Automatic]: ${input}**`)
                .setTimestamp()
            Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")

            writeFileSync("settings.json", JSON.stringify(settings, null, 1))

        }

        if (input) {
            settings.afk = input

            let embed = new MessageEmbed()
                .setColor(settings.embedcolor)
                .setDescription(`**AFK Mode: ${input}**`)
                .setTimestamp()

            Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")

            writeFileSync("settings.json", JSON.stringify(settings, null, 1))

            if (input.toUpperCase() == 'OFF') {

                settings.afk = false

                let embed = new MessageEmbed()
                    .setColor(settings.embedcolor)
                    .setDescription(`**AFK Mode: Disabled**`)
                    .setTimestamp()

                Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")

                writeFileSync("settings.json", JSON.stringify(settings, null, 1))
            }

            writeFileSync("settings.json", JSON.stringify(settings, null, 1))
        }
    }
}