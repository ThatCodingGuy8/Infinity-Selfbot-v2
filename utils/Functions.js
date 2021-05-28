const fs               = require('fs');
const { DownloadFile } = require("./FileSystem.js")
const Discord          = require("discord.js-self")
const Settings = require("../settings.json");
const { settings } = require("cluster");
     async function SendToWebhook(content, channelid, msg) {
      let channel = await msg.client.channels.cache.get(channelid)
      const webhooks = await channel.fetchWebhooks();
      const webhook = webhooks.first();

      await webhook.send(content);
    }
    async function SendVideoToWebhook(content, channelid, msg, snetAttachment) {
      let channel = await msg.client.channels.cache.get(channelid)
      const webhooks = await channel.fetchWebhooks();
      const webhook = webhooks.first();

      await webhook.send({
        embeds: [
            content
        ]
      });
      await webhook.send(snetAttachment)
    }
    async function SendToChannelFromClient(content, channelid, msg, snetAttachment) {
      let channel = await msg.client.channels.cache.get(channelid)
      await channel.send(content)
    }
    async function SendVideoToChannelFromClient(content, channelid, msg, snetAttachment) {
      let channel = await msg.client.channels.cache.get(channelid)
      await channel.send({
        embeds: [
            content
        ]
      })
      await channel.send(snetAttachment)
    }
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
    static async SilentModeSend(content, channelid, msg, type, snetAttachment) {
      if (Settings.silentmode == true) {
        let channel = await msg.client.channels.cache.get(channelid)
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();

        if (type == "Normal") {
          if (webhook) {
            await SendToWebhook(content, channelid, msg)
          } else {
            await SendToChannelFromClient(content, channelid, msg)
          }
        } else if (type == "Video") {
          if (webhook) {
            await SendVideoToWebhook(content, channelid, msg, snetAttachment)
          } else {
            await SendVideoToChannelFromClient(content, channelid, msg, snetAttachment)
          }
        }
      } else {
        await SendToChannelFromClient(content, channelid, msg)
      }
    }
}
