const fs = require('fs');
const { DownloadFile } = require("./FileSystem.js")
const Discord = require("discord.js-self")
const Settings = require("../settings.json");
const { settings } = require("cluster");
async function SendToWebhook(content, channelid, msg) {
  let channel = await msg.client.channels.cache.get(channelid)
  const webhooks = await channel.fetchWebhooks();
  const webhook = webhooks.first();

  await webhook.send(content);
}
const People = require("sudoers.json")

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
module.exports = class Functions {
  static sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
  }

  static mock(str) {
    let result;
    for (let i = 0; i < str.length; i++) {
      if (i % 2 === 0) result += str.charAt(i).toUpperCase()
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

  static IsAllowed(id) {
    if (People.Sudos.includes(id)) {
      return false
    } else {
      return true
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
      `Image Received | ${msg.guild.name || msg.channel.name}`
    );
    let amount;
    let kb = Math.round(attachment.size * 0.000977)
    if (kb >= 1024)  {
      amount = (kb * 0.0009765625).toFixed(3).toString() + "mb"
    } else {
      amount = kb + "kb"
    }
    embed.setThumbnail(msg.author.displayAvatarURL());
    embed.setDescription(messageheader);
    embed.setImage(link);
    embed.addField("**Sent by:**", msg.author.toString() + "/" + msg.author.tag);
    embed.addField("**In Channel:**", msg.channel.toString() + "/" + msg.channel.id);
    embed.addField("**Channel Plaintext Name:**", msg.channel.name)
    embed.addField("**Resolution:**", attachment.width + "x" + attachment.height);
    embed.addField("**Size:**", amount)
    embed.addField("**Original Message:**", `[Click Here](${msg.url})`);
    embed.addField("**Download:**", `[Click Here](${link})`);
    embed.setFooter(`Author: ${msg.author.id} | Message ID: ${msg.id}`);
    embed.setTimestamp();
    return embed;
  }
  static MakeVideoEmbed(link, attachment, messageheader, msg) {
    console.log("[+] New Video Logged")
    let embed = new Discord.MessageEmbed();
    embed.setColor("BLUE");
    embed.setTitle(
      `Video Received | ${msg.guild.name || msg.channel.name}`
    );
    embed.setThumbnail(msg.author.displayAvatarURL);
    embed.setDescription(messageheader);
    embed.addField("**Sent by:**", msg.author.toString() + "/" + msg.author.tag);
    embed.addField("**In Channel:**", msg.channel.toString() + "/" + msg.channel.id);
    embed.addField("**Channel Plaintext Name:**", msg.channel.name)
    embed.addField("**Original Message:**", `[Click Here](${msg.url})`);
    embed.addField("**Download:**", `[Click Here](${link})`);
    embed.addField("**Video**", "See Below")
    embed.setFooter(`Author: ${msg.author.id} | Message ID: ${msg.id}`);
    embed.setTimestamp();
    return embed;
  }

  static async SilentModeSend(content, channelid, msg, type, snetAttachment) {
    if (Settings.silentmode == true) {
      if (!msg.channel.guild) {
        return await SendToChannelFromClient(content, channelid, msg)
      }
      let channel = await msg.client.channels.cache.get(channelid)
      if (channel == undefined) {
        return console.log("Couldn't find destination channel on client")
      }
      let guildmember = await channel.guild.members.cache.get(msg.client.user.id)
      if (guildmember.hasPermission("MANAGE_WEBHOOKS")) {
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
    } else {
      await SendToChannelFromClient(content, channelid, msg)
    }
  }

  static getMember(message, user = "", guild = undefined) {
    try {
      let hmm = (message, user, guild) => {
        if (message) {
          let name = false;
          if (!isNaN(user)) {
            if (
              user === BigInt(user).toString() &&
              message.guild.members.cache.get(user)
            )
              user = user;
            else name = true;
          } else name = true;
          if (name) {
            if (
              message.guild.members.cache.find((m) =>
                (user.slice(0, 2) === "<@" || user.slice(0, 3) === "<@!") &&
                  user.slice(-1) === ">" ?
                  user.slice(2).slice(0, -1) === m.id ||
                  user.slice(3).slice(0, -1) === m.id :
                  false
              )
            )
              return message.guild.members.cache.find((m) =>
                (user.slice(0, 2) === "<@" || user.slice(0, 3) === "<@!") &&
                  user.slice(-1) === ">" ?
                  user.slice(2).slice(0, -1) === m.id ||
                  user.slice(3).slice(0, -1) === m.id :
                  false
              );
            if (
              message.guild.members.cache.find(
                (m) => m.user.tag.toLowerCase() === user.toLowerCase()
              )
            )
              return message.guild.members.cache.find(
                (m) => m.user.tag.toLowerCase() === user.toLowerCase()
              );
            return message.guild.members.cache.find(
              (m) =>
                (m.nickname ?
                  m.nickname.toLowerCase() === user.toLowerCase() ?
                    m.nickname.toLowerCase() :
                    m.user.username.toLowerCase() :
                  m.user.username.toLowerCase()) === user.toLowerCase()
            );
          } else {
            return message.guild.members.cache.get(user);
          }
        } else {
          let name = false;
          if (!isNaN(user)) {
            if (
              user === BigInt(user).toString() &&
              message.guild.members.cache.get(user)
            )
              user = user;
            else name = true;
          } else name = true;
          if (name) {
            if (
              message.guild.members.cache.find((m) =>
                (user.slice(0, 1) === "<@" || user.slice(0, 2) === "<@!") &&
                  user.slice(-1) === ">" ?
                  user.slice(2).slice(0, -1) === m.id ||
                  user.slice(3).slice(0, -1) === m.id :
                  false
              )
            )
              return guild.members.cache.find((m) =>
                (user.slice(0, 2) === "<@" || user.slice(0, 3) === "<@!") &&
                  user.slice(-1) === ">" ?
                  user.slice(2).slice(0, -1) === m.id ||
                  user.slice(3).slice(0, -1) === m.id :
                  false
              );
            if (
              message.guild.members.cache.find(
                (m) => m.user.tag.toLowerCase() === user.toLowerCase()
              )
            )
              return message.guild.members.cache.find(
                (m) => m.user.tag.toLowerCase() === user.toLowerCase()
              );
            return message.guild.members.cache.find(
              (m) =>
                (m.nickname ?
                  m.nickname.toLowerCase() === user.toLowerCase() ?
                    m.nickname.toLowerCase() :
                    m.user.username.toLowerCase() :
                  m.user.username.toLowerCase()) === user.toLowerCase()
            );
          } else {
            return message.guild.members.cache.get(user);
          }
        }
      };
      let u = hmm(message, user, guild);
      /*if ((message ? message.author.id === '379239652634394634' : true) || message.client.user.id !== u.id)*/
      return u;
      //else return undefined;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

}