const { Message, MessageEmbed } = require('discord.js-self');
const settings = require('./../../settings.json')
const prefix = settings.prefix
const Functions = require("./../../utils/Functions.js")

module.exports = {
	name: 'help',
	description: 'Prints out each command and its function',
	usage: 'help <Command> // <Nothing>',
	/**
	 * @param {Message} msg
	 */
	async execute(msg, args) {
		const embed = new MessageEmbed()
		embed.setTitle('Infinity | Help Menu')
		embed.setColor(settings.embedcolor)
		embed.setTimestamp()
		embed.setFooter("Made by Weis, Branden, Rapid, and Synergy")
        embed.setTimestamp()

		for (let i = 0; i < Object.keys(msg.client.commands).length; i++) {
			const key = Object.keys(msg.client.commands)[i]
			if (args.length > 0 && Object.keys(msg.client.commands[key]).indexOf(args[0]) !== -1) {
				if (!msg.client.commands[key][args[0]].aliases) alias = "This command has no aliases"
				else alias = msg.client.commands[key][args[0]].aliases.join(", ")
				embed.fields = []
				embed.addField('Command Name', args[0])
				embed.addField('Description', msg.client.commands[key][args[0]].description)
				embed.addField('Usage', `${prefix}${msg.client.commands[key][args[0]].usage}`)
				embed.addField('Command Aliases', alias)
				Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
				return;
			}
			embed.addField(key, Object.keys(msg.client.commands[key]).join(', '))
		}

		Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
	}
}