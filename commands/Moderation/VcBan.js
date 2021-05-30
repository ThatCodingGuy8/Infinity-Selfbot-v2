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
        if (msg.author.id !== msg.client.user.id) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle('Error')
                .setDescription(`Sorry, but only the account im connected to can run this!`)
                .setFooter("Skill Issue")
                .setTimestamp()
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        }
  const memebers = msg.channel.guild.members.cache
      const mention = msg.mentions.members.first() || msg.channel.guild.members.cache.find(m=> m.id ==arg[0]) ||   await members.find(m=> m.displayName.toLowerCase().startsWith(arg.toLowerCase()))
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
