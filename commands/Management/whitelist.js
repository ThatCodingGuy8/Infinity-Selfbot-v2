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
            const length = await whitelist.whitelisted.push(final);
            const user = await msg.client.users.cache.get(final)
            fs.writeFileSync('whitelist.json', JSON.stringify(whitelist))
            let embed = new Discord.MessageEmbed();
            embed.setTitle("Success")
            embed.setColor("BLUE")
            embed.setDescription("Successfully whitelisted " + user.tag + "!")
            embed.setFooter("Ez gottem")
            embed.setTimestamp()
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        } else {
            let embed = new Discord.MessageEmbed();
            embed.setTitle("Error")
            embed.setColor("RED")
            embed.setDescription("This command requires a user ID or mention!")
            embed.setFooter("Do not report this to the devs")
            embed.setTimestamp()
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        }
    }
}
