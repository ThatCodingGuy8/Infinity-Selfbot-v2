const Discord = require("discord.js-self");
const { getMember, SilentModeSend } = require("../../utils/Functions")
module.exports = {
    name: "punch",
    description: "Punch someone!",
    usage: "punch <User>",
    async execute(message, args) {
        if (!args[0]) return message.channel.send("Specify a user!!");
        const user = getMember(message, args[0]);
        if (!user) return message.channel.send("User not found!");

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username} has punched ${user.user.username}!`)
            .setColor("RANDOM")
            .setImage(`https://api.no-api-key.com/api/v2/punch?punch=${message.author.avatarURL({ format: 'png', size: 512 }).replace(/.gif/g, '.png')}&punched=${user.user.avatarURL({ format: 'png', size: 512 }).replace(/.gif/g, '.png')}`)
            .setFooter("Brutal!")
            .setTimestamp()
        return SilentModeSend(embed, message.channel.id, message, "Normal")
    }
}