const { Message, MessageEmbed } = require("discord.js-self")
const Functions = require("../../utils/Functions.js")
const { exec } = require("child_process")
module.exports = {
    name: 'restart',
    description: 'Restarts the bot, pretty simple',
    usage: 'restart',
    /**
     * @param {msg} msg
     */
    async execute(msg, args) {
        if (Functions.IsAllowed(msg.author.id) === false) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle('Error')
                .setDescription(`Sorry, but you don't have permission to use this!`)
                .setFooter("Skill Issue Lol!")
                .setTimestamp()
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        }
        exec("pm2 flush && pm2 reloadLogs", { windowsHide: true }, async (error, stdout, stderr) => {
            await Functions.SilentModeSend(new MessageEmbed().setTitle("Restarted!").setFooter("Ill be back soon!").setTimestamp(), msg.channel.id, msg, "Normal")
            process.exit(1)
        })
    }
}