const whitelist = require('./../../whitelist.json')
const settings = require('./../../settings.json')
const Discord = require("discord.js-self")
const fs = require("fs")
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'whitelist',
    description: 'Whitelists a user to be able to use the selfbot, useful for botnets or friends',
    usage: 'whitelist <ID>',
    async execute(msg, args) {
        if (args[0]) {
            if (isNaN(args[0])) {
                let embed = new Discord.MessageEmbed();
                embed.setTitle("Error")
                embed.setColor("RED")
                embed.setDescription("This command requires a user ID, and that argument wasn't an ID!")
                embed.setFooter("Do not report this to the devs")
                embed.setTimestamp()
                return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            }
            var length = await whitelist.whitelisted.push(args[0]);
            fs.writeFileSync('whitelist.json', JSON.stringify(whitelist))
            let embed = new Discord.MessageEmbed();
            embed.setTitle("Success")
            embed.setColor("BLUE")
            embed.setDescription("Successfully whitelisted " + args[0] + ", who can use the bot on next restart!")
            embed.setFooter("Ez gottem")
            embed.setTimestamp()
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        } else {
            let embed = new Discord.MessageEmbed();
            embed.setTitle("Error")
            embed.setColor("RED")
            embed.setDescription("This command requires a user ID!")
            embed.setFooter("Do not report this to the devs")
            embed.setTimestamp()
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        }
    }
}
