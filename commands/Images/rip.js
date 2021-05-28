const Discord = require("discord.js-self");
const { getMember, SilentModeSend } = require("../../utils/Functions");
module.exports = {
    name: "rip",
    description: "Shows a users gravestone",
    usage: "rip <user>",
    async execute(message, args) {
        if (!args[0]) return message.channel.send("Specify a user!!");
        const user = getMember(message, args[0]);
        if (!user) return message.channel.send("User not found!");

        const embed = new Discord.MessageEmbed()
            .setTitle(`${user.user.username}'s Grave!`)
            .setColor("RANDOM")
            .setImage(`https://api.no-api-key.com/api/v2/rip?image=${user.user.avatarURL({ format: 'png', size: 512 }).replace(/.gif/g, '.jpeg')}`)
            return SilentModeSend(embed, message.channel.id, message, "Normal")
    }
}