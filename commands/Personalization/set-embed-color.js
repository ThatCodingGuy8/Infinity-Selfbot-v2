const { MessageEmbed } = require('discord.js-self');
const { writeFileSync } = require("fs");
const settings = require("../../settings.json");

module.exports = {
    name: 'set-embed-color',
    description: 'Sets your embed colors to whichever color you have inputted',
    usage: 'set-embed-color <color>',
    aliases: ['sec', 'setec'],
    async execute(msg, args) {

        if (settings.embedcolor == undefined ? [] : settings.embedcolor)
            if (settings.embedcolor == undefined) {
                settings.embedcolor = "#918bff"
            }

        let input = args.join(" ") || "#918bff"

        settings.embedcolor = input
        writeFileSync("settings.json", JSON.stringify(settings, null, 1))

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setDescription(`**Changed embed color to: ${input}**`)
            .setTimestamp()

        msg.channel.send(embed)

    }
}