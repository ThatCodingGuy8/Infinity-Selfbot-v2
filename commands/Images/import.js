const request = require("axios");
const fs      = require("fs");
const Discord = require("discord.js-self")
const { MessageEmbed } = require("discord.js-self")
const Functions = require("./../../utils/Functions.js")
const {
	randomTime,
	LogOutput,
	asyncForEach,
	MakeImageEmbed,
	MakeVideoEmbed,
  SilentModeSend
} = require("../../utils/Functions") // ! PREDICT DOESNT SUPPORT GIFS!
/**
 * * Imports images to a specified channel
 * ! Same issues as scrape.js
 * TODO: Fix sending duplication
 */


module.exports = {
    name: 'import',
    description: 'Scrapes images from a specified channel and imports them into another channel. Destination channel has to have a webhook and you require perms to manage it for safety reasons.',
    usage: 'import <ChannelID> <Amount of Msg> <Amount of Attachments> <ChannelOutputID>',
    async execute(msg, args) {
        if (Functions.IsAllowed(msg.author.id) === false) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle('Error')
                .setDescription(`Sorry, but you don't have permission to use this!`)
                .setFooter("Skill Issue Lol!")
                .setTimestamp()
            return Functions.SilentModeSend(embed, msg.channel.id, msg, "Normal")
        }
        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
              await callback(array[index], index, array);
            }
          }
          async function getMessages(channel, limit) {
            let out = []
            if (limit <= 100) {
              let messages = await channel.messages.fetch({ limit: limit })
              out.push(...messages.array())
            } else {
              let rounds = (limit / 100) + (limit % 100 ? 1 : 0)
              let last_id = ""
              for (let x = 0; x < rounds; x++) {
                const options = {
                  limit: 100
                }
                if (last_id.length > 0) {
                  options.before = last_id
                }
                const messages = await channel.messages.fetch(options)
                if (messages.array().length == 0) {

                } else {
                    out.push(...messages.array())
                    last_id = await messages.array()[messages.array().length - 1].id
                }
              }
            }
            return out
          }
        let ChanName = args[0] || "0"
        let Channel = await msg.client.channels.cache.get(ChanName)
        let Messages = await getMessages(Channel, parseInt(args[1]))
        console.log(Messages.length)
        let AttachedMessages = [];
        let imagecount = 0;

        const ProcessMessages = async (callback) => {
            await asyncForEach(Messages, async (message) => {
                const attachments = await message.attachments.array();
                await asyncForEach(attachments, async (attachment) => {
                    if (attachments.length !== 0) {
                        // Attachments
                        await asyncForEach(attachments, async (attachment) => {
                            const nameArray = attachment.name.split(".");
                            const attEx = nameArray[nameArray.length - 1];
                            const snetAttachment = attachment.proxyURL; //new Discord.MessageAttachment(attachment.proxyURL);
                            const d = new Date();
                            date = d.getHours() + "-" + d.getMinutes() + " " + d.toDateString();
                            let PathString =
                            message.channel.name +
                            "_" +
                            message.author.id +
                            "_" +
                            message.id +
                            "___" +
                            date +
                            "." +
                            attEx;
                            let CleanPathString = PathString.replace(
                                /[|&;$%@"花\\\/<>*?!^()+,]/g, // * Scrubs filename to avoid illegal chars
                                ""
                            );
                            //Bootleg import function kek
                            try {
                                if (imagecount <= parseInt(args[2])) {
                                    if (attEx == "png" || attEx == "jpeg" || attEx == "jpg" || attEx == "bmp") {
                                        let msg = message
                                        let aver;
                                        let EmbedToSend = await MakeImageEmbed(snetAttachment, attachment, "Imported", msg)
                                        await Functions.SilentModeSend(EmbedToSend, args[3], msg, "Normal")
                                        await imagecount++
                                    }
                                }
                            } catch (err) {
                                console.log(err)
                            }
                        });
                    }
                });
            });
            await callback()
        };
        let fin = await ProcessMessages(async () => {
            let Embed = await new MessageEmbed()
            await Embed.setTitle("Finished Importing")
            await Embed.addField("**Total Images:**", imagecount)
            await Embed.setColor("BLUE")
            await Functions.SilentModeSend(Embed, msg.channel.id, msg, "Normal")
        })
    }
}