const { Message, MessageEmbed } = require('discord.js-self');
const ms = require('ms');
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'setnsfw',
    description: 'Sets the state of the channel (NSFW/SFW)',
    usage: 'setnsfw <NSFW/SFW>',
    /**
     * @param {msg} msg
     */
    async execute(msg, args) {
        if (msg.channel.type == "text" && args[0]) {
            if (!msg.member.hasPermission("MANAGE_CHANNELS")) return Functions.SilentModeSend("You do not have permission to do that", msg.channel.id, msg, "Normal");
            if ( args[0].toLowerCase() == "true" || args[0].toLowerCase() == "false")
            {
                msg.channel.setNSFW(args[0].toLowerCase())
            }
        }
    }
}