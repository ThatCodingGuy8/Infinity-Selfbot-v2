const whitelist = require('./../../whitelist.json')
const settings = require('./../../settings.json')
const Discord = require("discord.js-selfbot")

module.exports = {
    name: 'unwhitelist',
    description: 'Unwhitelists a user',
    usage: 'unwhitelist <ID>',
    async execute(msg, args) {
        if (args[0]) { // ill co
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
        } else {
            let embed = new Discord.MessageEmbed();
            embed.setTitle("Error")
            embed.setColor("RED")
            embed.setDescription("This command requires a user ID!")
        }
    }
}
