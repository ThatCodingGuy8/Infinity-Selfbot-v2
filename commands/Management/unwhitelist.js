const whitelist = require('./../../whitelist.json')
const settings = require('./../../settings.json')
const Discord = require("discord.js-selfbot")

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
                return msg.channel.send(embed)
            }
            const index = await whitelist.whitelisted.indexOf(args[0])
            await whitelist.whitelisted.splice(index)
            const jsonString = await JSON.stringify(whitelist)
            await fs.writeFile('./../../whitelist.json', jsonString, err => {
                if (err) {
                    console.log('Error writing JSON Whitelist:', err)
                }
            })
            let embed = new Discord.MessageEmbed();
            await embed.setTitle("Success")
            await embed.setColor("BLUE")
            await embed.setDescription("Successfully unwhitelisted " + args[0])
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
