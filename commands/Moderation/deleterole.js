const { Message, MessageEmbed } = require('discord.js-self');
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'RRole',
    description: 'Remove a role from members with a certain role',
    usage: 'Rrole',
    /**
     * @param {msg} msg
     * @param args
     */
    async execute(msg, args) {
        role = await msg.mentions.roles.first()
        role2 = await msg.mentions.roles.last()
        if(!msg.member.hasPermission("MANAGE_ROLES")) return;

        if (role.id === role2.id) {
            await Functions.SilentModeSend(new MessageEmbed().setDescription("Please Put 2 Different Roles!"), msg.channel.id, msg, "Normal")
        } else {
            Members = role.members.filter(m => m.roles.cache.has(role2.id) )
            Members.forEach(m => {
                m.roles.remove(role2.id)
            });
            if (Members.size<= 0) {
                await Functions.SilentModeSend(new MessageEmbed().setDescription("It Seems there is no member with that role!"), msg.channel.id, msg, "Normal")
            } else {
                await Functions.SilentModeSend(new MessageEmbed().setDescription(`${role} has been removed from members with   ${role}`), msg.channel.id, msg, "Normal")
            }
        }
    }
}
