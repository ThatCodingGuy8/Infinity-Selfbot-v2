const { Message, MessageEmbed } = require("discord.js-selfbot")
const vc = require("./../../voiceChatBans.json")
const { writeFileSync } = require("fs")
const ms = require("ms")
module.exports = {
    name: 'vcunban',
    description: 'unBan user from entering voice chat',
    usage: ['Unvcban', "unvb"],
    /**
     * @param {msg} msg
     */
    async execute(msg, args) {
 
        mention = msg.mentions.members.first() || msg.channel.guild.members.cache.find(m=> m.id ==args[0])
        if (mention) {
            if (vc.IDS.find(u => u.UserID == mention.id)) {
i = vc.IDS.indexOf(vc.IDS.find(u => u.UserID == mention.id))

vc.IDS.splice(i,1)
                msg.channel.send(new MessageEmbed().setDescription(`${mention} has been  Unbanned`))
            }
            else {
                msg.channel.send(new MessageEmbed().setDescription(`${mention} is not Banned from Voice-Chats!`))
            }
        }

        writeFileSync("voiceChatBans.json", JSON.stringify(vc))

    }
}
