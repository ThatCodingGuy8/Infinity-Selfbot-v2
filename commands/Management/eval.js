const { MessageEmbed } = require("discord.js-self");
const settings = require("../../settings.json")
const Functions = require("../../utils/Functions.js")

module.exports = {
    name: 'eval',
    description: 'Evaluates the given code',
    usage: 'eval <Code>',
    aliases: ['run'],
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
        let t1 = Date.now()
        const embed = new MessageEmbed()
            .setColor(settings.embedcolor)
            .setTitle('Evaluating...')
            .setDescription(`**Please wait...**`)
            .setFooter("Its happening!")
            .setTimestamp()
        const msge = await msg.channel.send(embed);
        try {
            const code = args.join(' ').replace(/```/g, '')
            let data = "";
            let type = "";
            if (code.includes("await")) {
                data = await new Promise((resolve, rej) => resolve(eval(`async function DoThings() { ${code} } DoThings()`)));
                type = "Async"
            } else {
                data = await new Promise((resolve, rej) => resolve(eval(code)));
                type = "Sync"
            }
            const embed = new MessageEmbed()
                .setColor('BLUE')
                .setTitle(`**Evaluated given task**`)
                .addField("Input:", '```js\n' + `${code}` + '```')
                .addField(`Output:`, '```js\n' + `${require("util").inspect(data, { depth: 0})}` + '```')
                .addField("Execution Type:", type)
                .setFooter(`Completed in: ${Math.ceil(Date.now() - t1)}ms`)
                .setTimestamp()
            await msge.edit(embed)
        } catch (e) {
            const embed = new MessageEmbed()
                .setColor('RED')
                .setTitle(`**An issue was encountered**`)
                .addField(`Output:`, '```js\n' + `${e}` + '```')
                .setFooter(`Completed in: ${Math.ceil(Date.now() - t1)}ms`)
                .setTimestamp()
            return await msge.edit(embed);

        }
    }
}