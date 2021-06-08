const { Message, MessageEmbed } = require("discord.js-self")
const Functions = require("../../utils/Functions.js")
const AutoGitUpdate = require('auto-git-update');
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}`;
const config = {
	repository: 'https://github.com/ThatCodingGuy8/Infinity-Selfbot-v2',
	tempLocation: desktopDir,
	ignoreFiles: ["settings.json", "embed-colors.json", "filters/gay.json", "filters/hentai.json", "filters/memes.json", "whitelist.json"],
	branch: "main",
	exitOnComplete: true
}
const updater = new AutoGitUpdate(config);
module.exports = {
    name: 'forceupdate',
    description: 'Forces an update from github',
    usage: 'forceupdate',
    aliases: ["fu", "force-update"],
    /**
     * @param {msg} msg
     */
    async execute(msg, args) {
        if (Functions.IsAllowed(msg.author.id) === true) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle('Error')
                .setDescription(`Sorry, but you don't have permission to use this!`)
                .setFooter("Skill Issue Lol!")
                .setTimestamp()
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        }
        await Functions.SilentModeSend(new MessageEmbed().setTitle("Forcing Update").setFooter("Ill be back soon!").setTimestamp(), msg.channel.id, msg, "Normal")
        await updater.forceUpdate()
    }
}