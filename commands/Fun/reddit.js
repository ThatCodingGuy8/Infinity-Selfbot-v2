const { Message, MessageEmbed } = require('discord.js-selfbot');
const settings = require("./../../settings.json");
const https = require('https');
// const Axios = require
module.exports = {
    name: 'reddit',
    description: 'Fetches a subreddit and returns a random post',
    usage: 'reddit <subreddit>',
    aliases: ['r'],
    async execute(msg, args) {
        if (!args) return msg.channel.send("Give me the subreddit name!");
        const url = `https://www.reddit.com/r/${args.join("")}/hot/.json?limit=100`;
        https.get(url, (result) => {
            var body = ''
            result.on('data', (chunk) => {
                body += chunk
            })
            if (result.statusCode !== 200) return msg.channel.send("Subreddit not found!");
            result.on('end', () => {
                var response = JSON.parse(body)
                if (!response.data.children.length) return msg.channel.send("Subreddit has no posts!");
                var index = response.data.children[Math.floor(Math.random() * (response.data.children.length - 1) + require('util').random(0, 1))].data
                if (index.over_18 && !msg.channel.nsfw) return msg.channel.send("Results are Over 18! make sure to search NSFW subreddits on NSFW channels!")

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

                    return msg.channel.send(textembed);
                }

                var image = index.preview.images[0].source.url.replace('&amp;', '&')
                const imageembed = new Discord.MessageEmbed()
                    .setTitle("A random post from " + subRedditName)
                    .setImage(image)
                    .setColor("RANDOM")
                    .setDescription(`[${title}](${link})\n\n${text}`)
                    .setURL(`https://reddit.com/${subRedditName}`)
                msg.channel.send(imageembed)
            }).on('error', function(e) {
                console.log('Got an error: ', e)
            })
        })
    }
}