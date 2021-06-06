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
            let embed = new MessageEmbed()
            embed.addField("Input:", `\`\`\`${Command}\`\`\``)
            if (error) {
                embed.setTitle("Execution Error")
                embed.setColor("RED")
                embed.addField("Error:", `\`\`\`${error.message}\`\`\``)
                embed.setFooter("Lol ur bad")
                embed.setTimestamp()
                Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
                return;
            }
            if (stderr) {
                embed.addField("STD Error:", `\`\`\`${stderr}\`\`\``)
            }
            let Output;
            if (stdout.length === 0) {
                Output = "None"
            } else {
                Output = stdout
            }
            embed.setTitle("Success")
            embed.setColor("BLUE")
            embed.addField("Output:", `\`\`\`${Output}\`\`\``)
            embed.setFooter("Congrats!")
            embed.setTimestamp()
            Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        });
    }
}