const { MessageEmbed } = require('discord.js-self');
const request = require('request');
const settings = require("./../../settings.json");
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'shibe',
    description: 'Returns a cute looking shiba',
    usage: 'shibe',
    async execute(msg, args) {

        request.get(`http://shibe.online/api/shibes?count=${Math.floor(Math.random() * 100)}&urls=true`, (e, r, b) => {
            let json = JSON.parse(b)
            Functions.SilentModeSend(
                new MessageEmbed()
                    .setImage(json[Math.floor(Math.random() * Object.keys(json).length)])
                    .setColor(settings.embedcolor)
                    .setFooter('🐾 Woof')
                    .setTimestamp()
            , msg.channel.id, msg, "Normal")
        })
    }
}