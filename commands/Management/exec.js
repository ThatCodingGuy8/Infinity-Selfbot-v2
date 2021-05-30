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
        if (msg.author.id !== msg.client.user.id) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle('Error')
                .setDescription(`Sorry, but only the account im connected to can run this!`)
                .setFooter("Skill Issue")
                .setTimestamp()
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        }
        let Command = args.join(" ")
        exec(Command, { windowsHide: true }, (error, stdout, stderr) => {
            if (error) {
                let embed = new MessageEmbed()
                embed.setTitle("Execution Error")
                embed.setColor("RED")
                embed.addField("Input:", `\`\`\`${Command}\`\`\``)
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
                embed.addField("Input:", `\`\`\`${Command}\`\`\``)
                embed.addField("Error:", `\`\`\`${stderr}\`\`\``)
                embed.setFooter("You have an STD? Wack")
                embed.setTimestamp()
                Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
                return;
            }
            let Output;
            if (stdout.length === 0) {
                Output = "None"
            } else {
                Output = stdout
            }
            let embed = new MessageEmbed()
            embed.setTitle("Success")
            embed.setColor("BLUE")
            embed.addField("Input:", `\`\`\`${Command}\`\`\``)
            embed.addField("Output:", `\`\`\`${Output}\`\`\``)
            embed.setFooter("Congrats!")
            embed.setTimestamp()
            Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        });
    }
}