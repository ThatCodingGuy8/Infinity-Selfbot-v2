const Discord = require("discord.js-self");
const { getMember, SilentModeSend } = require("../../utils/Functions")
module.exports = {
    name: "smrt",
    description: "Smrt!",
    usage: "smrt <user>",
    async execute(message, args) {
        if (!args[0]) return message.channel.send("Specify a user!!");
        const user = getMember(message, args[0]);
        if (!user) return message.channel.send("User not found!");

        const embed = new Discord.MessageEmbed()
            .setTitle(`Smrt!`)
            .setColor("RANDOM")
            .setImage(`https://api.no-api-key.com/api/v2/smrt?image=${user.user.avatarURL({ format: 'png', size: 512 }).replace(/.gif/g, '.jpeg')}`)
            return SilentModeSend(embed, message.channel.id, message, "Normal")
    }
}