const { Message, MessageEmbed } = require('discord.js-selfbot');
const akaneko = require('akaneko');


module.exports = {
    name: 'solo',
    description: 'Solo Masturbation turns me on personally',
    usage: 'solo',
    /**
     * @param {msg} msg
     */
    async execute(msg, args) {
        if (msg.channel.type != "dm" || !msg.channel.nsfw) return msg.channel.send(new MessageEmbed().setTitle("HiHi! This is Self-Bot-Chan~~ in your service!").setDescription("This is not a nsfw channel nor is it in dms, Master!"))
 nsfw = await akaneko.nsfw
 
   msg.channel.send(new MessageEmbed().setDescription("Here you go Master!").setImage(await nsfw.masturbation()))

    }}