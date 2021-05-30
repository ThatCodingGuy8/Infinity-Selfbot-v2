const { Message, MessageEmbed } = require("discord.js-self")
const vc = require("./../../voiceChatBans.json")
const { writeFileSync } = require("fs")
const ms = require("ms")
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'vcunban',
    description: 'unBan user from entering voice chat',
    usage: ['Unvcban', "unvb"],
    /**
     * @param {msg} msg
     */
    async execute(msg, args) {
  const memebers = msg.channel.guild.members.cache
      const mention = msg.mentions.members.first() || msg.channel.guild.members.cache.find(m=> m.id ==arg[0]) ||   await members.find(m=> m.displayName.toLowerCase().startsWith(arg.toLowerCase()))
        if (mention) {
            if (vc.IDS.find(u => u.UserID == mention.id)) {
i = vc.IDS.indexOf(vc.IDS.find(u => u.UserID == mention.id))

vc.IDS.splice(i,1)
                Functions.SilentModeSend(new MessageEmbed().setDescription(`${mention} has been  Unbanned`), msg.channel.id, msg, "Normal")
            }
            else {
                Functions.SilentModeSend(new MessageEmbed().setDescription(`${mention} is not Banned from Voice-Chats!`), msg.channel.id, msg, "Normal")
            }
        }

        writeFileSync("voiceChatBans.json", JSON.stringify(vc))

    }
}
