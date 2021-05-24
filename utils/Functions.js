const tf               = require("@tensorflow/tfjs-node");  // * Tensorflow with Node Optimizations
const tfweb            = require("@tensorflow/tfjs");       // * Regular Tensorflow API
const fs               = require('fs');
const { DownloadFile } = require("./FileSystem.js")
const Discord          = require("discord.js-selfbot")
const Settings = require("../settings.json")
module.exports   = class Functions {
    static sleep(delay) {
        return new Promise(r => setTimeout(r, delay));
    }

    static mock(str) {
        let result;
        for (let i = 0; i < str.length; i++) {
            if (i % 2 == 0) result += str.charAt(i).toUpperCase()
            else result += str.charAt(i);
        }
        return result.slice(9)
    }

    static randomTime(one, two) {
        return Math.floor(Math.random(one) * two)
    }
    static LogOutput(title, text) {
      console.log(title + ": " + text)
    }
    static async predict(img, model) {
          let target_classes = {
            0: "Matching Image",
            1: "Non Matching Image",
          };
        let snetAttachment = img;
        let unique = Math.random().toFixed(6) + Settings.customextension

        await DownloadFile(img, "./checkspace/" + unique)
        try {
            const imageBuffer = await fs.readFileSync("./checkspace/" + unique);
            const tfimage     = await tf.node
              .decodeImage(imageBuffer, 3)
              .resizeNearestNeighbor([224, 224])
              .expandDims()
              .reverse(-1); // RGB -> BGR
            const predictions = await model.predict(tfimage).data();
            setTimeout(function () {
              fs.unlinkSync("./checkspace/" + unique);
            }, 1000);
            let top5 = Array.from(predictions)
              .map(function (p, i) {
                return {
                  probability: p,
                  className: target_classes[i], // Name Reference from Table
                };
              })
              .sort(function (a, b) {
                return b.probability - a.probability;
              })
              .slice(0, 2);
            return [top5[0].className, top5[0].probability.toFixed(6)]
        } catch (err) {
            console.log("Machine Learning: " + err)
        }
      }
    static async asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }
    static MakeImageEmbed(link, attachment, messageheader, msg) {
      console.log("[+] New Image Logged")
      let embed = new Discord.MessageEmbed()
        embed.setColor("BLUE");
        embed.setTitle(
            `Image Recieved | ${msg.guild.name || msg.channel.name}`
        );
        embed.setThumbnail(msg.author.displayAvatarURL);
        embed.setDescription(messageheader);
        embed.setImage(link);
        embed.addField("**Sent by:**", msg.author);
        embed.addField("**Size:**", attachment.width + "x" + attachment.height);
        embed.addField("**Original Message:**", `[Click Here](${msg.url})`);
        embed.addField("**Download:**", `[Click Here](${link})`);
        embed.addField("**In Channel:**", msg.channel.toString());
        embed.setFooter(`Author: ${msg.author.id} | Message ID: ${msg.id}`);
        embed.setTimestamp();
      return embed;
    }
    static MakeMachineLearningImageEmbed(link, attachment, messageheader, msg, prediction) {
      console.log("[+] New Image Logged")
      let embed = new Discord.MessageEmbed()
        embed.setColor("BLUE");
        embed.setTitle(
            `Image Recieved | ${msg.guild.name || msg.channel.name}`
        );
        embed.setThumbnail(msg.author.displayAvatarURL);
        embed.setDescription(messageheader);
        embed.setImage(link);
        embed.addField("**Sent by:**", msg.author);
        embed.addField("**Size:**", attachment.width + "x" + attachment.height);
        embed.addField("**Original Message:**", `[Click Here](${msg.url})`);
        embed.addField("**Download:**", `[Click Here](${link})`);
        embed.addField("**Machine Learning Score:**", prediction);
        embed.addField("**In Channel:**", msg.channel.toString());
        embed.setFooter(`Author: ${msg.author.id} | Message ID: ${msg.id}`);
        embed.setTimestamp();
      return embed;
    }
    static MakeVideoEmbed(link, attachment, messageheader, msg) {
        console.log("[+] New Video Logged")
      let embed = new Discord.MessageEmbed();
        embed.setColor("BLUE");
        embed.setTitle(
            `Video Recieved | ${msg.guild.name || msg.channel.name}`
        );
        embed.setThumbnail(msg.author.displayAvatarURL);
        embed.setDescription(messageheader);
        embed.addField("**Sent by:**", msg.author);
        embed.addField("**Original Message:**", `[Click Here](${msg.url})`);
        embed.addField("**Download:**", `[Click Here](${link})`);
        embed.addField("**In Channel:**", msg.channel.toString());
      embed.addField("**Video**", "See Below")
        embed.setFooter(`Author: ${msg.author.id} | Message ID: ${msg.id}`);
        embed.setTimestamp();
      return embed;
    }
    static async SendToWebhook(content, channelid, msg, snetAttachment) {
      let channel = await msg.client.channels.cache.get(channelid)
      const webhooks = await channel.fetchWebhooks();
      const webhook = webhooks.first();

      await webhook.send(content);
    }
    static async SendVideoToWebhook(content, channelid, msg, snetAttachment) {
      let channel = await msg.client.channels.cache.get(channelid)
      const webhooks = await channel.fetchWebhooks();
      const webhook = webhooks.first();

      await webhook.send(content);
      await webhook.send(snetAttachment)
    }
    static async SendToChannelFromClient(content, channelid, msg, snetAttachment) {
      let channel = await msg.client.channels.cache.get(channelid)
      await channel.send(content)
    }
    static async SendVideoToChannelFromClient(content, channelid, msg, snetAttachment) {
      let channel = await msg.client.channels.cache.get(channelid)
      await channel.send(content)
      await channel.send(snetAttachment)
    }
}
