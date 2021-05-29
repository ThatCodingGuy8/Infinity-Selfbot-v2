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
            let final;
            if (isNaN(args[0]) && msg.mentions.users.size === 0) {
                let embed = new Discord.MessageEmbed();
                embed.setTitle("Error")
                embed.setColor("RED")
                embed.setDescription("This command requires a user ID or mention!")
                embed.setFooter("Do not report this to the devs")
                embed.setTimestamp()
                return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            }
            if (msg.mentions.users.size > 0) {
                final = msg.mentions.users.first().id
            } else {
                final = args[0]
            }
            const index = await whitelist.whitelisted.indexOf(final)
            const user = await msg.client.users.cache.get(final)
            if (index == -1) {
                let embed = new Discord.MessageEmbed();
                embed.setTitle("Error")
                embed.setColor("RED")
                embed.setDescription("That user isn't whitelisted!")
                embed.setFooter("Do not report this to the devs")
                embed.setTimestamp()
                return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            } else {
                await whitelist.whitelisted.splice(index)
                const jsonString = await JSON.stringify(whitelist)
                await fs.writeFileSync('whitelist.json', jsonString)
                let embed = new Discord.MessageEmbed();
                await embed.setTitle("Success")
                await embed.setColor("BLUE")
                await embed.setDescription("Successfully unwhitelisted " + user.tag)
                await embed.setFooter("This means access to all commands!")
                await embed.setTimestamp()
                return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            }
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
