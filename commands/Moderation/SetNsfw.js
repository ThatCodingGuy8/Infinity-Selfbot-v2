const { ResizeNearestNeighborGrad } = require('@tensorflow/tfjs-core');
const { Message, MessageEmbed } = require('discord.js-selfbot');
const ms = require('ms');

module.exports = {
    name: 'Setnsfw',
    description: 'set the state of the channel (NSFW/SFW)',
    usage: 'SN',
    /**
     * @param {msg} msg
     */
    async execute(msg, args) {

if (msg.channel.type == "text" && args[0]) {
if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send("You do not have permission to do that");
if ( args[0].toLowerCase() == "true" || args[0].toLowerCase() == "false")
{
msg.channel.setNSFW(args[0].toLowerCase())

}





}
    }






    }