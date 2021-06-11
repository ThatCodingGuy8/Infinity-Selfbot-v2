const Discord = require("discord.js-self");
const { getMember, SilentModeSend } = require("../../utils/Functions")
module.exports = {
    name: "shoot",
    description: "Shoot a user!",
    usage: "shoot <user>",
    async execute(message, args) {
        if (!args[0]) return message.channel.send("Specify a user!!");
        let user = message.mentions.users.first() || getMember(message, args[0]);
        if (!user) return message.channel.send("User not found!");
        // fuck you synergy im gonna make a dumb code for your ass
        if (user == getMember(message, args[0])) user = user.user;

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username} has shot ${user.username}`)
            .setColor("RANDOM")
            .setImage(`https://api.no-api-key.com/api/v2/shoot?image=${user.avatarURL({ format: 'jpg', size: 512 }).replace(/.gif/g, '.jpg')}`)
            .setFooter("You're going to jail")
            .setTimestamp()
            return SilentModeSend(embed, message.channel.id, message, "Normal")
    }
}
