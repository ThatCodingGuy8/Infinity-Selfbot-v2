const { MessageEmbed } = require("discord.js-self");
const settings = require("../../settings.json")
const Functions = require("../../utils/Functions.js")
const { exec } = require("child_process")

module.exports = {
    name: 'exec',
    description: 'Executes a terminal command',
    usage: 'exec <Command>',
    aliases: ['execute'],
    async execute(msg, args) {
        let Command = args.join(" ")
        exec(Command, { windowsHide: true }, (error, stdout, stderr) => {
            if (error) {
                let embed = new MessageEmbed()
                embed.setTitle("Execution Error")
                embed.setColor("RED")
                embed.addField("Error:", `\`\`\`${error.message}\`\`\``)
                embed.setFooter("Lol ur bad")
                embed.setTimestamp()
                Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
                return;
            }
            if (stderr) {
                let embed = new MessageEmbed()
                embed.setTitle("STDERR")
                embed.setColor("RED")
                embed.addField("Error:", `\`\`\`${stderr}\`\`\``)
                embed.setFooter("You have an STD? Wack")
                embed.setTimestamp()
                Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
                return;
            }
            let embed = new MessageEmbed()
            embed.setTitle("Success")
            embed.setColor("BLUE")
            embed.addField("Output:", `\`\`\`${stdout}\`\`\``)
            embed.setFooter("Congrats!")
            embed.setTimestamp()
            Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        });
    }
}