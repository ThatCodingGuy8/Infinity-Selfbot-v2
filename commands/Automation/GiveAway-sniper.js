let interval;

const { MessageEmbed } = require("discord.js-self");
const { randomTime } = require("../../utils/Functions");
const settings = require("./../../settings.json")
const Functions = require("./../../utils/Functions.js")
const { writeFileSync} = require("fs")
module.exports = {
    name: 'Giveaway-sniper',
    description: 'Enable Giveaway sniper',
    usage: 'Giveaway-sniper',
    aliases: ['gs', 'giveawaysnipe'],
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
        if (!args[0]) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**Incorrect usage of command**`).setTimestamp(), msg.channel.id, msg, "Normal")

        if (args[0].toUpperCase() == 'ON'){
            
                settings.Giveawaysniper = true
                Functions.SilentModeSend(new MessageEmbed().setColor(settings.embedcolor).setDescription(`**Giveaway sniper has been turned on**`).setTimestamp(), msg.channel.id, msg, "Normal")       
               
            }

        else if (args[0].toUpperCase() == 'OFF') {
            settings.Giveawaysniper = false
            Functions.SilentModeSend(new MessageEmbed().setColor(settings.embedcolor).setDescription(`**Giveaway-Sniper turned off**`).setTimestamp(), msg.channel.id, msg, "Normal")
        }
        writeFileSync("settings.json", JSON.stringify(settings, null, 1))  }
}