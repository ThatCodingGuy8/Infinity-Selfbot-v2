const whitelist = require('./../../whitelist.json')
const settings = require('./../../settings.json')

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
            const User = await msg.client.users.cache.get(args[0])
            await whitelist.whitelisted.push(User.id)
            const jsonString = await JSON.stringify(whitelist)
            fs.writeFile('./../../whitelist.json', jsonString, err => {
                if (err) {
                    console.log('Error writing JSON Whitelist:', err)
                }
            })
            let embed = new Discord.MessageEmbed();
            await embed.setTitle("Success")
            await embed.setColor("BLUE")
            await embed.setDescription("Successfully whitelisted " + args[0])
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
