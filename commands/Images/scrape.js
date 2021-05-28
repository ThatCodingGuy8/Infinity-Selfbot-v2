const fs      = require("fs");
const { DownloadFile } = require("../../utils/FileSystem.js")
const { MessageEmbed } = require("discord.js-self")
const Functions = require("./../../utils/Functions.js")
const {
	randomTime,
	LogOutput,
	asyncForEach,
	MakeImageEmbed,
	MakeVideoEmbed,
	SendToWebhook,
	SendVideoToWebhook,
	SendToChannelFromClient,
	SendVideoToChannelFromClient
} = require("../../utils/Functions") // ! PREDICT DOESNT SUPPORT GIFS!
/**
 * * Downloads images from the specified channel
 * ! Probably very buggy, doesnt download all images
 * TODO: Fix all the damn bugs with downloading
 */


module.exports = {
    name: 'scrape',
    description: 'Scrapes images from a specified channel',
    usage: 'scrape <ChannelID> <Amount of Msg> <Amount of Attachments> <Path>',
    async execute(msg, args) {
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
                    continue;
                } else {
                    out.push(...messages.array())
                    last_id = await messages.array()[messages.array().length - 1].id
                }
              }
            }
            return out
          }
        try {
            if (fs.existsSync(args[3])) {
              console.log("Directory exists, not making new one")
            } else {
              console.log("Directory does not exist, making it...")
              await fs.mkdirSync(args[3])
            }
        } catch(e) {
            console.log("An error occurred.")
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
                                /[|&;$%@"花\\\/<>*?!^()+,]/g,
                                ""
                            );
                            //Bootleg downloading function kek
                            try {
                                if (imagecount <= parseInt(args[2])) {
                                    await DownloadFile(snetAttachment, args[3] + CleanPathString)
                                    if (fs.existsSync(args[3] + CleanPathString)) {
                                      imagecount++
                                    } else {
                                      await console.log("Image Failed To Log :(")
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
            await Embed.setTitle("Finished Scraping")
            await Embed.addField("**Total Images:**", imagecount)
            await Embed.setColor("BLUE")
            await Functions.SilentModeSend(Embed, msg.channel.id, msg, "Normal")
        })
    }
}