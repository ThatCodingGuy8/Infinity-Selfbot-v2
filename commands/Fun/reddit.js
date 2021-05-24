const { Message, MessageEmbed } = require('discord.js-selfbot');
const settings = require("./../../settings.json");
const Discord = require("discord.js-selfbot")
const axios = require('axios')
module.exports = {
    name: 'reddit',
    description: 'Fetches a subreddit and returns a random post',
    usage: 'reddit <subreddit>',
    aliases: ['r'],
    async execute(msg, args) {
        if (!args) return message.channel.send("Give me the subreddit name!");
        const url = `https://www.reddit.com/r/${args.join("")}/hot/.json?limit=100`;
        axios.get(url).then(function(response) {
                if (response.status == 403) return message.channel.send("Subreddit is private!");
                if (response.status == 404) return message.channel.send("Subreedit not found!");

                var response = response.data;
                if (!response.data.children.length) return message.channel.send("Subreddit has no posts!");
                var index = response.data.children[Math.floor(Math.random() * (response.data.children.length - 1) + random(0, 1))].data
                if (index.over_18 && !message.channel.nsfw) return message.channel.send("Results are Over 18! make sure to search NSFW subreddits on NSFW channels!")

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
                        .setURL(`https://reddit.com/${subRedditName}`)

                    return message.channel.send(textembed);
                }

                var image = index.preview.images[0].source.url.replace('&amp;', '&')
                const imageembed = new Discord.MessageEmbed()
                    .setTitle("A random post from " + subRedditName)
                    .setImage(image)
                    .setColor("RANDOM")
                    .setDescription(`[${title}](${link})\n\n${text}`)
                    .setURL(`https://reddit.com/${subRedditName}`)
                message.channel.send(imageembed)
            })
            .catch(function(error) {
                if (error.toString().includes(403)) {
                    return message.channel.send("Subreddit is private!");
                } else if (error.toString().includes(404)) {
                    return message.channel.send("Subreddit not found!");
                } else {
                    return message.channel.send("An Error Occured: `" + error + "`")
                }
            })
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}