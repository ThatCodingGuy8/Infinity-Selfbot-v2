const whitelist = require('./../../whitelist.json')
const settings = require('./../../settings.json')

module.exports = {
    name: 'whitelist',
    description: 'Whitelists a user to be able to use the selfbot, useful for botnets or friends',
    usage: 'whitelist <ID>',
    async execute(msg, args) {
        if (args[0]) {
            const User = await msg.client.users.cache.get(args[0])
            await whitelist.whitelisted.push(User.id)
            const jsonString = await JSON.stringify(whitelist)
            fs.writeFile('./../../whitelist.json', jsonString, err => {
                if (err) {
                    console.log('Error writing JSON Whitelist:', err)
                }
            })
        }
    }
}
