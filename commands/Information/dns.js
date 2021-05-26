const WebResolver = require('webresolver');
let resolver = new WebResolver("BHJ2C-SFJTU-6NAW6-Y0TXO");
const { MessageEmbed } = require("discord.js-self");

module.exports = {
    name: 'dns',
    description: 'Gets information about a given dns',
    usage: 'dns <WebsiteName>',
    async execute(msg, args) {

        let url = args[0];
        let embed = new MessageEmbed()
            .setTitle("DNS Records for: " + url)
            .setColor(14699596);
        resolver.dns(url).then(res => {

            var records = res.data.records;
            for (var i = 0; i < res.data.records.length; i++) {
                var obj = records[i];
                if (obj.ip) {
                    embed.addField(obj.ip, obj.server ? obj.server : "none", true);
                }
            }

            msg.channel.send({embed});
        });

    }
}
