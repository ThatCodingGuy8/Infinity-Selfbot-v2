const whitelist = require('./../../whitelist.json')
const settings = require('./../../settings.json')
const Discord = require("discord.js-self")
const fs = require("fs")
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'unwhitelist',
    description: 'Unwhitelists a user',
    usage: 'unwhitelist <ID>',
    async execute(msg, args) {
        if (args[0]) {
            if (isNaN(args[0])) {
                let embed = new Discord.MessageEmbed();
                embed.setTitle("Error")
                embed.setColor("RED")
                embed.setDescription("This command requires a user ID, and that argument wasn't an ID!")
                return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            }
            const index = await whitelist.whitelisted.indexOf(args[0])
            if (index == -1) {
                let embed = new Discord.MessageEmbed();
                embed.setTitle("Error")
                embed.setColor("RED")
                embed.setDescription("That user isnt whitelisted!")
                return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            } else {
                await whitelist.whitelisted.splice(index)
                const jsonString = await JSON.stringify(whitelist)
                await fs.writeFileSync('whitelist.json', jsonString)
                let embed = new Discord.MessageEmbed();
                await embed.setTitle("Success")
                await embed.setColor("BLUE")
                await embed.setDescription("Successfully unwhitelisted " + args[0])
                return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            }
        } else {
            let embed = new Discord.MessageEmbed();
            embed.setTitle("Error")
            embed.setColor("RED")
            embed.setDescription("This command requires a user ID!")
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        }
    }
}
