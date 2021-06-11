const { MessageEmbed } = require('discord.js-self');
const figlet = require('figlet');
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'ascii',
    description: 'Returns ascii converted text',
    usage: 'ascii <Text>',
    /**
     * @param {Message} msg
     * @param args
     */
    async execute(msg, args) {

        let message = args.join(" ")

        if (!message) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**You must provide text to convert**`).setTimestamp(), msg.channel.id, msg, "Normal")

        figlet(message, (err, ascii) => {
            if (err) {
                let embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**An error occured while executing the command**`)
                    .setFooter("You should report this to the devs")
                    .setTimestamp()

                Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
                return;
            }
            Functions.SilentModeSend("```" + ascii + "```", msg.channel.id, msg, "Normal")
        })
    }
}
