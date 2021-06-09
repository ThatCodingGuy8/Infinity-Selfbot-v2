/**
 * Infinity Selfbot
 * * Made By: Branden, Weis, Rapid
 * TODO: Dynamic Machine Learning, Multi-Token Support
 */

const Discord = require('discord.js-self');
const vc = require("./voiceChatBans.json")
const {
    readdirSync,
    lstatSync,
} = require("fs");
const fs = require("fs")
const settings = require("./settings.json");
const client = new Discord.Client()
const {
    randomTime,
    LogOutput,
    asyncForEach,
    MakeImageEmbed,
    MakeVideoEmbed,
    SilentModeSend,
    DebugLog
} = require("./utils/Functions") // ! PREDICT DOESNT SUPPORT GIFS!
const filesystem = require("./utils/FileSystem")
const AutoGitUpdate = require('auto-git-update');
const owo = require("owofy");


/**
 * * Auto Update Section
 * ! Contact Branden before modifying
 */
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}`;
const config = {
    repository: 'https://github.com/ThatCodingGuy8/Infinity-Selfbot-v2',
    tempLocation: desktopDir,
    ignoreFiles: ["settings.json", "embed-colors.json", "filters/gay.json", "filters/hentai.json", "filters/memes.json", "whitelist.json", "sudoers.json"],
    branch: "main",
    exitOnComplete: true
}
const updater = new AutoGitUpdate(config);

/**
 * * Filter Section
 */
let MasterWhitelistTable = []; // Cool table
const rawfiles = readdirSync('filters')
rawfiles.forEach(file => {
    let object = require('./filters/' + file)
    MasterWhitelistTable.push(object);
})

const cmdsDir = readdirSync('commands')
const eventsDir = readdirSync('events')

client.delMsg = new Map()
client.editMsgBefore = new Map()
client.editMsgAfter = new Map()
client.commands = {}

for (let i = 0; i < eventsDir.length; i++) {
    client.on(eventsDir[i].split('.')[0], (...params) => {
        if (Array.isArray(params) && params.length > 0)
            require(`./events/${eventsDir[i]}`)(...params)
        else
            require(`./events/${eventsDir[i]}`)(client)
    })
}

client.fldrToggle = true
for (let i = 0; i < cmdsDir.length; i++) {
    let cmd_or_dir = cmdsDir[i]

    if (!client.fldrToggle)
        client.commands[cmd_or_dir.split('.')[0]] = require(`./commands/${cmd_or_dir}`)
    else if (lstatSync(`commands/${cmd_or_dir}`).isDirectory()) {
        client.commands[cmd_or_dir] = {}

        let categoryDir = readdirSync(`commands/${cmd_or_dir}`)
        for (let i2 = 0; i2 < categoryDir.length; i2++) {
            let cmdFile = categoryDir[i2]
            if (lstatSync(`commands/${cmd_or_dir}/${cmdFile}`).isFile()) {
                client.commands[cmd_or_dir][cmdFile.split('.')[0]] = require(`./commands/${cmd_or_dir}/${cmdFile}`)
            }
        }
    }
}

/**
 * * Image Logging and Message Event Others
 * ! PLEASE DONT TOUCH IMAGE LOGGING WITHOUT BRANDENS APPROVAL!
 */

const logguild = settings.loggingguild
client.on("message", async msg => {
    // * Image Logging
    if (settings.logimages === false) {
        return;
    }
    if (msg.author.id === client.user.id) {
        return;
    }
    if (msg.guild && msg.guild.id === logguild) {
        return;
    }
    let coolmessage = "No Message Content";
    const attachments = msg.attachments.array();

    let numofattach = 0;
    //Attachment Checking
    if (attachments.length !== 0) {
        if (msg.content !== "") {
            coolmessage = msg.content;
        }
        const ProcessAttachments = async () => {
            await asyncForEach(attachments, async (attachment) => {
                // Actual Attachment Stream
                numofattach++;
                const nameArray = attachment.name.split(".");
                const attEx = nameArray[nameArray.length - 1];
                const snetAttachment = attachment.proxyURL; //new Discord.MessageAttachment(attachment.proxyURL);
                const d = new Date();
                date = d.getHours() + "-" + d.getMinutes() + " " + d.toDateString();
                let PathString = msg.channel.name + "_" + msg.author.id + "_" + msg.id + "___" + date + "." + attEx;
                let CleanPathString = PathString.replace(/[|&;$%@"花\\\/<>*?!^()+,]/g, "");

                async function EvaluateExtension(channelid, category, download) {
                    if (download === true) {
                        if (await fs.existsSync("./download/" + category + "/")) {
                            if (await fs.existsSync("./download/" + category + "/Images") === false) {
                                await fs.mkdirSync("./download/" + category + "/Images")
                            }
                            if (await fs.existsSync("./download/" + category + "/Videos") === false) {
                                await fs.mkdirSync("./download/" + category + "/Videos")
                            }
                            if (attEx === "webm" || attEx === "mp4" || attEx === "mov" || attEx === "gif") {
                                await filesystem.DownloadFile(snetAttachment, "./download/" + category + "/Videos/" + CleanPathString)
                            } else if (attEx === "png" || attEx === "jpeg" || attEx === "jpg" || attEx === "bmp") {
                                await filesystem.DownloadFile(snetAttachment, "./download/" + category + "/Images/" + CleanPathString)
                            }
                        } else {
                            await fs.mkdirSync("./download/" + category + "/")
                            await fs.mkdirSync("./download/" + category + "/Images")
                            await fs.mkdirSync("./download/" + category + "/Videos")
                            if (attEx === "webm" || attEx === "mp4" || attEx === "mov" || attEx === "gif") {
                                await filesystem.DownloadFile(snetAttachment, "./download/" + category + "/Videos/" + CleanPathString)
                            } else if (attEx === "png" || attEx === "jpeg" || attEx === "jpg" || attEx === "bmp") {
                                await filesystem.DownloadFile(snetAttachment, "./download/" + category + "/Images/" + CleanPathString)
                            }
                        }
                    }
                    if (attEx === "webm" || attEx === "mp4" || attEx === "mov") {
                        let EmbedToSend = await MakeVideoEmbed(snetAttachment, attachment, coolmessage, msg)
                        try {
                            await SilentModeSend(EmbedToSend, channelid, msg, "Video", snetAttachment)
                        } catch (error) {
                            DebugLog("error", `Silent Mode - ${error}`);
                        }
                    } else if (attEx === "png" || attEx === "jpeg" || attEx === "jpg" || attEx === "bmp" || attEx === "gif") {
                        let EmbedToSend = await MakeImageEmbed(snetAttachment, attachment, coolmessage, msg)
                        try {
                            await SilentModeSend(EmbedToSend, channelid, msg, "Normal")
                        } catch (error) {
                            DebugLog("error", `Silent Mode - ${error}`);
                        }
                    }
                }

                async function FilterAttachment() {
                    DebugLog("info", "Incoming Attachment From " + msg.channel.name + " In Guild " + msg.guild.name)
                    if (msg.author.bot) {
                        return
                    }
                    MasterWhitelistTable.forEach(filter => {
                        let channelid = filter["destinationchannel"];
                        if (channelid !== "Put ID Here" && isNaN(channelid) === false) {
                            Object.keys(filter).forEach(key => {
                                if (isNaN(key) && key !== "destinationchannel" && key !== "filtername" && key !== "downloadimages") {
                                    if (msg.channel.name.includes(key) && filter[key] === true) {
                                        EvaluateExtension(channelid, filter["filtername"], filter["downloadimages"])
                                    }
                                } else if (isNaN(key) === false) {
                                    if (msg.channel.id === key && filter[key] === true) {
                                        EvaluateExtension(channelid, filter["filtername"], filter["downloadimages"])
                                    }
                                }
                            })
                        }
                    })
                }

                //Further Filtering, Prepare for Clusters
                if (msg.guild) {
                    await FilterAttachment()
                }
            });
        };
        await ProcessAttachments();
    }
})
client.on("message", async msg => {
    try {
        if (settings.owo === true) {
            await msg.channel.messages.fetch({
                limit: 1
            })
                .then(async messages => {
                    messages.forEach(async m => {
                        if (m.author.id === msg.client.user.id) {
                            await m.edit(owo(m.content))
                        }
                    });
                })
        }
        if (!settings.afk === false) {
            if (msg.channel.type === "dm") {
                if (msg.author.id !== client.user.id) {
                    msg.channel.send(settings.afk)
                }
            }
        }
        if (settings.anigame === true) {
            if (msg.author.id === '571027211407196161') {
                for (let embed of msg.embeds) {
                    if (embed.footer.text.startsWith('Type')) {
                        let num = embed.footer.text.split(' ')
                        let res = num[2]
                        setTimeout(async function () {
                            msg.channel.send(`${num[1]} ${res}`)
                        }, randomTime(1000, 2000))
                    }
                }
            }
        }
        if (settings.slotbot === true) {
            if (msg.author.id === '346353957029019648') {
                if (msg.content.startsWith('Someone just dropped their wallet in this channel!')) {
                    setTimeout(async function () {
                        let num = msg.content.split(" ")
                        let prefix = num[14]
                        msg.channel.send(`${prefix[1]}grab`)
                    }, randomTime(1000, 2000))
                }
            }
        }
    } catch (error) {

    }
})
client.on("voiceStateUpdate", (oldMember, NewMember) => {
    if (!NewMember.channel || NewMember.channel && !NewMember.channel.guild.me.hasPermission("MOVE_MEMBERS", "MUTE_MEMBERS")) return;
    if (NewMember.channel && vc.IDS.find(a => a.UserID === NewMember.member.id) && vc.IDS.find(a => a.UserID === NewMember.member.id).UserID && vc.IDS.find(g => g.guild) && NewMember.channel && NewMember.channel.guild.id === vc.IDS.find(g => g.guild).guild) {
        NewMember.kick()
    }
})
client.on("message", async msg => {
    if (settings.Giveawaysniper === false) return;
    if (!msg.member) return;
    if (msg.member.id == 396464677032427530 || msg.member.id == 294882584201003009) {
        if (msg.embeds[0] && msg.embeds[0].description && msg.embeds[0].description.toLowerCase().startsWith("react")) {
            setTimeout(() => {
                msg.react("🎉")
            }, (settings.GiveawaySniperDelay * 1000));
        }
    }
})

async function Start() {
    await DebugLog("info", "Checking for updates...")
    await updater.autoUpdate();
    await DebugLog("info", "Logging in...")
    await client.login(settings.token)
}

Start()