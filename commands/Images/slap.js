const Discord = require("discord.js-self");
const { Canvas: Canvacord } = require("canvacord");

module.exports = {
    name: "slap",
    description: "apyx made this",
    usage: "slap user",

    async execute(message, args) {
        if(!args[0]) {
            message.channel.send("mention someon");
            return;
        }

        let user =  message.mentions.users.first() || getMember(message, args[0]);

        if (!user) {
            message.channel.send("user not found");
            return;
        }

        const img = await Canvacord.slap(message.author.displayAvatarURL({ format: "png", size: 2048 }), user.user.displayAvatarURL({ format: "png", size: 2048 }));
        message.channel.send(new Discord.MessageAttchment(img, "slap.png"));
    }
}