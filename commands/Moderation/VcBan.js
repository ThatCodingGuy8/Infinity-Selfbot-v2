const { Message, MessageEmbed } = require("discord.js-self")
const vc = require("../../voiceChatBans.json")
const { writeFileSync } = require("fs")
const ms = require("ms")
const Functions = require("./../../utils/Functions.js")
module.exports = {
    name: 'vcban',
    description: 'Ban user from entering voice chat',
    usage: ['vcban', "vc"],
    /**
     * @param {msg} msg
     */
    async execute(msg, args) {

        mention = msg.mentions.members.first() || msg.channel.guild.members.cache.find(m=> m.id ==args[0])
        if (mention) {
            if (vc.IDS.find(u => u.UserID == mention.id) && (vc.IDS.find(u => u.UserID == mention.id).UserID && vc.IDS.find(g => g.guild == msg.channel.guild.id) && vc.IDS.find(g => g.guild == msg.channel.guild.id).guild)) {

                Functions.SilentModeSend(new MessageEmbed().setDescription(`${mention} is already Banned From entering voice chat in this server`), msg.channel.id, msg, "Normal")
            }
            else {
                object = { guild: msg.guild.id, UserID: mention.id }
                vc.IDS.push(object)
                Functions.SilentModeSend(new MessageEmbed().setDescription(`${mention} Has been banned From entering voice chat in this server`), msg.channel.id, msg, "Normal")
            }
        }

        writeFileSync("voiceChatBans.json", JSON.stringify(vc))

    }
}
