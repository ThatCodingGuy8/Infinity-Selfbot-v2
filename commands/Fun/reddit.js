const { msg, msgEmbed } = require('discord.js-self');
const settings = require("./../../settings.json");
const Discord = require("discord.js-self")
const axios = require('axios')
const Functions = require("./../../utils/Functions.js")

module.exports = {
    name: 'reddit',
    description: 'Fetches a subreddit and returns a random post',
    usage: 'reddit <subreddit>',
    aliases: ['r'],
    async execute(msg, args) {
        if (!args) return Functions.SilentModeSend("Give me the subreddit name!", msg.channel.id, msg, "Normal");
        const url = `https://www.reddit.com/r/${args.join("")}/hot/.json?limit=100`;
        axios.get(url).then(function(response) {
                if (response.status == 403) return Functions.SilentModeSend("Subreddit is private!", msg.channel.id, msg, "Normal");
                if (response.status == 404) return Functions.SilentModeSend("Subreddit not found!", msg.channel.id, msg, "Normal");

                var response = response.data;
                if (!response.data.children.length) return Functions.SilentModeSend("Subreddit has no posts!", msg.channel.id, msg, "Normal");
                var index = response.data.children[Math.floor(Math.random() * (response.data.children.length - 1) + random(0, 1))].data
                if (index.over_18 && !msg.channel.nsfw) return Functions.SilentModeSend("Results are Over 18! make sure to search NSFW subreddits on NSFW channels!", msg.channel.id, msg, "Normal")

                var title = index.title
                var link = 'https://reddit.com' + index.permalink
                var text = index.selftext
                var subRedditName = index.subreddit_name_prefixed

                if (index.post_hint !== 'image') {
                    var text = index.selftext
                    const textembed = new Discord.MessageEmbed()
                        .setTitle("A random post from " + subRedditName)
                        .setColor("RANDOM")
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setFooter("EWWWW A REDDITOR")
                        .setURL(`https://reddit.com/${subRedditName}`)

                    return Functions.SilentModeSend(textembed, msg.channel.id, msg, "Normal");
                }

                var image = index.preview.images[0].source.url.replace('&amp;', '&')
                const imageembed = new Discord.MessageEmbed()
                    .setTitle("A random post from " + subRedditName)
                    .setImage(image)
                    .setColor("RANDOM")
                    .setDescription(`[${title}](${link})\n\n${text}`)
                    .setFooter("EWWWW A REDDITOR")
                    .setURL(`https://reddit.com/${subRedditName}`)
                Functions.SilentModeSend(imageembed, msg.channel.id, msg, "Normal")
            })
            .catch(function(error) {
                if (error.toString().includes(403)) {
                    return Functions.SilentModeSend("Subreddit is private!", msg.channel.id, msg, "Normal");
                } else if (error.toString().includes(404)) {
                    return Functions.SilentModeSend("Subreddit not found!", msg.channel.id, msg, "Normal");
                } else {
                    return Functions.SilentModeSend("An Error Occured: `" + error + "`", msg.channel.id, msg, "Normal")
                }
            })
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}