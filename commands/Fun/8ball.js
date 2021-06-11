const { MessageEmbed } = require('discord.js-self');
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: '8ball',
    description: 'Returns an 8ball response to your question',
    usage: '8ball <Question>',
    aliases: ['8b'],
    /**
     * @param {Message} msg
     * @param args
     */
    async execute(msg, args) {

        let input = args.join(" ")

        if (!input) return Functions.SilentModeSend(new MessageEmbed().setColor(`RED`).setDescription(`**You must provide a question**`).setTimestamp(), msg.channel.id, msg, "Normal")

        const responses = [
            'It Is Certain',
            'It Is Decidedly So',
            'Without A Doubt',
            'Yes — Definitely',
            'You May Rely On It',
            'As I See It, Yes',
            'Most Likely',
            'Outlook Good',
            'Yes',
            'Signs Point To Yes',
            'Reply Hazy, Try Again',
            'Ask Again Later',
            'Better Not Tell You Now',
            'Cannot Predict Now',
            'Concentrate And Ask Again',
            'Don’t Count On It',
            'My Reply Is No',
            'My Sources Say No',
            'Outlook Not So Good',
            'Very Doubtful',
            'I Hate You'
        ]

        let answer = responses[Math.floor(responses.length * Math.random())]

        let embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setTitle(`${input}?`)
            .addField(`8Ball's Response:`, answer)
            .setFooter("You have become the fortune teller")
            .setTimestamp()
        await Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")

    }
}
