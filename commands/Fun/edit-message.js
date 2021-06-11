const { MessageEmbed } = require('discord.js-self');
const { sleep } = require('./../../utils/Functions.js')
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'edit-message',
    description: 'Edits given message 1 by 1',
    usage: 'edit-message <Text>',
    aliases: ['edit-msg', 'em'],
    /**
     * @param {Message} msg
     * @param args
     */
    async execute(msg, args) {

        let input = args.join(" ").trim().split("")

        if (!input) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**You must provide some text to edit**`).setTimestamp(), msg.channel.id, msg, "Normal")

        let mes = await msg.channel.send(input[0])
        let str = input[0]
        for (let i = 1; i < input.length; i++) {
            await sleep(1000)
            str += input[i]
            await mes.edit(str)
        }
    }
}
