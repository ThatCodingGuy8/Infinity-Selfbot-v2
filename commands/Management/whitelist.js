const whitelist = require('./../../whitelist.json')
const settings = require('./../../settings.json')
const Discord = require("discord.js-selfbot")
const fs = require("fs")

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
                return msg.channel.send(embed)
            }
            var length = await whitelist.whitelisted.push(args[0]);
            fs.writeFileSync('whitelist.json', JSON.stringify(whitelist))
            let embed = new Discord.MessageEmbed();
            embed.setTitle("Success")
            embed.setColor("BLUE")
            embed.setDescription("Successfully whitelisted " + args[0] + ", who can use the bot on next restart!")
            return msg.channel.send(embed)
        } else {
            let embed = new Discord.MessageEmbed();
            embed.setTitle("Error")
            embed.setColor("RED")
            embed.setDescription("This command requires a user ID!")
            return msg.channel.send(embed)
        }
    }
}
