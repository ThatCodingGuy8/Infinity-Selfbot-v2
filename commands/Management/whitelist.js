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
        if (Functions.IsAllowed(msg.author.id) === true) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle('Error')
                .setDescription(`Sorry, but you don't have permission to use this!`)
                .setFooter("Skill Issue Lol!")
                .setTimestamp()
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        }
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
            if (user === undefined) {
                let embed = new Discord.MessageEmbed();
                embed.setTitle("Error")
                embed.setColor("RED")
                embed.setDescription("That user doesn't exist or isn't cached!")
                embed.setFooter("Do not report this to the devs")
                embed.setTimestamp()
                return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
            }
            fs.writeFileSync('whitelist.json', JSON.stringify(whitelist))
            let embed = new Discord.MessageEmbed();
            embed.setTitle("Success")
            embed.setColor("BLUE")
            embed.setDescription("Successfully whitelisted " + user.tag + "!")
            embed.setFooter("This gives access to the bot!")
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