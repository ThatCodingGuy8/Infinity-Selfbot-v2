/**
 * Infinity Selfbot
 * * Made By: Branden, Weis, Rapid
 * TODO: Image Logging, Dynamic Machine Learning, Silent Mode, Multi-Token Support
 */

const Discord = require('discord.js-selfbot');
const vc = require("./voiceChatBans.json")
const {
	readdirSync,
	lstatSync,
	fstat
} = require("fs");
const fs = require('fs');
const settings = require("./settings.json");
const client = new Discord.Client()
const {
	randomTime,
	predict,
	LogOutput,
	asyncForEach,
	MakeImageEmbed,
	MakeVideoEmbed,
	SendToWebhook,
	SendVideoToWebhook,
	SendToChannelFromClient,
	SendVideoToChannelFromClient,
	MakeMachineLearningImageEmbed
} = require("./utils/Functions") // ! PREDICT DOESNT SUPPORT GIFS!
const axios = require('axios');
const tf = require("@tensorflow/tfjs-node"); // * Tensorflow with Node Optimizations
const tfweb = require("@tensorflow/tfjs"); // * Regular Tensorflow API
const path = require('path');
const AutoGitUpdate = require('auto-git-update');
const MathMod = require('mathjs');
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
	ignoreFiles: ["settings.json", "embed-colors.json", "filters/gay.json", "filters/hentai.json", "filters/memes.json", "whitelist.json", "voiceChatBans.json"],
	branch: "main",
	exitOnComplete: true
}
const updater = new AutoGitUpdate(config);

/**
 * * Filter Section
 */
let HentaiWhitelist = []
let MemeWhitelist = []
let GayWhitelist = []

const hentaifilter = require("./filters/hentai.json")
const memefilter = require("./filters/memes.json");
const gayfilter = require("./filters/gay.json")
const {
	dir
} = require('console');
const {
	Log
} = require('@tensorflow/tfjs');

Object.keys(hentaifilter).forEach(key => {
	if (hentaifilter[key] == true) {
		HentaiWhitelist.push(key)
	}
})
LogOutput("[CONFIG]", "Loaded Hentai Keywords")

Object.keys(memefilter).forEach(key => {
	if (memefilter[key] == true) {
		MemeWhitelist.push(key)
	}
})
LogOutput("[CONFIG]", "Loaded Meme Keywords")

Object.keys(gayfilter).forEach(key => {
	if (gayfilter[key] == true) {
		GayWhitelist.push(key)
	}
})
LogOutput("[CONFIG]", "Loaded Gay Keywords")

/**
 * * Machine Learning Segment
 * ! DO NOT TOUCH!
 */
let hentaimodel = undefined, mememodel = undefined, generalimagemodel = undefined, nsfwmodel = undefined;
async function InstantiateModels() {
	if (fs.existsSync("./model/")) {
		let Dirs = await fs.readdirSync("./model")
		Dirs.forEach(async directory => {
			if (fs.existsSync("./model/" + directory + "/model.json")) {
				if (directory == "Hentai") {
					const handler = tf.io.fileSystem("./model/" + directory + "/model.json");
					hentaimodel = await tfweb.loadLayersModel(handler);
					LogOutput("[MACHINE LEARNING]", "TensorFlow.js Hentai Model Loaded!")
				} else if (directory == "Memes") {
					const handler = tf.io.fileSystem("./model/" + directory + "/model.json");
					mememodel = await tfweb.loadLayersModel(handler);
					LogOutput("[MACHINE LEARNING]", "TensorFlow.js Memes Model Loaded!")
				} else if (directory == "NSFW") {
					const handler = tf.io.fileSystem("./model/" + directory + "/model.json");
					nsfwmodel = await tfweb.loadLayersModel(handler);
					LogOutput("[MACHINE LEARNING]", "TensorFlow.js NSFW Model Loaded!")
				} else if (directory == "GeneralImages") {
					const handler = tf.io.fileSystem("./model/" + directory + "/model.json");
					generalimagemodel = await tfweb.loadLayersModel(handler);
					LogOutput("[MACHINE LEARNING]", "TensorFlow.js Multipurpose-Image-Model Loaded!")
				}
			}
		})
	} else {
		console.log("Models Folder Is Gone, Rebuilding For Next Restart...")
		fs.mkdirSync("./model")
		fs.mkdirSync("./model/Hentai")
		fs.mkdirSync("./model/Memes")
		fs.mkdirSync("./model/NSFW")
		fs.mkdirSync("./model/GeneralImages")
	}
}
InstantiateModels();

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
let silent = settings.silentmode
client.on("message", async msg => {
	// * Image Logging
	if (settings.logimages == false) { 
		return;
	}
	if (msg.author.id === client.user.id) {
		return;
	}
	if (msg.guild && msg.guild.id == logguild) {
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

				//Filter
				let normal = false;
				let custom = false;
				let meme = false;
				let nsfw = false;
				let hentai = false;
				let peace = false;
				let video = false;

				let MemeKeyWords = MemeWhitelist
				let HentaiKeywords = HentaiWhitelist
				let PeaceKeywords = GayWhitelist

				async function FilterAttachment(modeltocheck, channeltosend, predictname) {
					if (attEx == "webm" || attEx == "mp4" || attEx == "mov" || attEx == "gif") {
						let EmbedToSend = await MakeVideoEmbed(snetAttachment, attachment, coolmessage, msg)
						if (silent == true) {
							try {
								await SendVideoToWebhook(EmbedToSend, channeltosend, msg, snetAttachment)
							} catch (error) {
								console.error("Error trying to send in Silent Mode: ", error);
							}
						} else {
							try {
								await SendVideoToChannelFromClient(EmbedToSend, channeltosend, msg, snetAttachment)
							} catch (error) {
								console.error("Error trying to send in Normal Mode: ", error);
							}
						}
					} else if (attEx == "png" || attEx == "jpeg" || attEx == "jpg" || attEx == "bmp") {
						if (modeltocheck !== undefined) {
							//LogOutput("[IMAGE LOGGING]", "Logging Image With Machine Learning")
							let prediction = await predict(snetAttachment, modeltocheck)
							if (prediction[0] == "Matching Image") {
								let EmbedToSend = await MakeMachineLearningImageEmbed(snetAttachment, attachment, coolmessage, msg, prediction[1])
								if (silent == true) {
									try {
										await SendToWebhook(EmbedToSend, channeltosend, msg, snetAttachment)
									} catch (error) {
										console.error("Error trying to send in Silent Mode: ", error);
									}
								} else {
									try {
										await SendToChannelFromClient(EmbedToSend, channeltosend, msg, snetAttachment)
									} catch (error) {
										console.error("Error trying to send in Normal Mode: ", error);
									}
								}
							}
						} else {
							//LogOutput("[IMAGE LOGGING]", "Logging Image Without Machine Learning")
							let EmbedToSend = MakeImageEmbed(snetAttachment, attachment, coolmessage, msg)
							if (silent == true) {
								try {
									await SendToWebhook(EmbedToSend, channeltosend, msg, snetAttachment)
								} catch (error) {
									console.error("Error trying to send in Silent Mode: ", error);
								}
							} else {
								try {
									await SendToChannelFromClient(EmbedToSend, channeltosend, msg, snetAttachment)
								} catch (error) {
									console.error("Error trying to send in Normal Mode: ", error);
								}
							}
						}
					}
				}
				//Further Filtering, Prepare for Clusterfuck
				if (msg.guild) {
					if (custom == false) {
						MemeKeyWords.some(function (item) {
							if (msg.channel.name.includes(item) || msg.channel.id == item) {
								meme = true;
								FilterAttachment(mememodel, settings.memechannel, "Meme")
								return true;
							}
						});
						if (meme === false && custom === false) {
							HentaiKeywords.some(function (item) {
								if (msg.channel.name.includes(item) || msg.channel.id == item) {
									hentai = true;
									FilterAttachment(hentaimodel, settings.hentaichannel, "Hentai")
									return true;
								}
							});
							if (hentai === false && meme === false) {
								PeaceKeywords.some(function (item) {
									if (msg.channel.name.includes(item) || msg.channel.id == item) {
										peace = true;
										FilterAttachment(undefined, settings.gaychannel, "Gay")
										return true;
									}
								});
								if (peace == false && hentai === false && meme === false) {
									if (msg.channel.nsfw) {
										nsfw = true;
										FilterAttachment(nsfwmodel, settings.nsfwimageschannel, "NSFW")
									} else {
										FilterAttachment(generalimagemodel, settings.imageschannel, "Image")
									}
								}
							}
						}
					}
				}
				try {
					/*
							  Downloading Segment
			  
							  This can cause issues if people post bad things so be cautious
							  if (msg.author.bot == false) { // Download if not a bot
								  if (normal) {
									  download(snetAttachment, "D:\\DiscordLogs\\Normal\\" + CleanPathString, () => {
										  console.log('✅ Logged Image To Normal Folder!')
									  })
								  }else if (hentai) {
									  if (video) {
										  download(snetAttachment, "D:\\DiscordLogs\\AnimeNSFWVideo\\" + CleanPathString, () => {
											  console.log('✅ Logged Image To Anime NSFW Video Folder!')
										  })
									  } else {
										  download(snetAttachment, "D:\\DiscordLogs\\AnimeNSFW\\" + CleanPathString, () => {
											  console.log('✅ Logged Image To Anime NSFW Folder!')
										  })
									  }
								  }else if (meme) {
									  download(snetAttachment, "D:\\DiscordLogs\\Memes\\" + CleanPathString, () => {
										  console.log('✅ Logged Image To Memes Folder!')
									  })
								  }else if (nsfw) {
									  if (video) {
										  download(snetAttachment, "D:\\DiscordLogs\\NSFWVideo\\" + CleanPathString, () => {
											  console.log('✅ Logged Image To NSFW Videos Folder!')
										  })
									  } else {
										  download(snetAttachment, "D:\\DiscordLogs\\NSFW\\" + CleanPathString, () => {
											  console.log('✅ Logged Image To NSFW Folder!')
										  })
									  }
								  }
							  }
							  video = false;
							  */
				} catch (error) {
					console.error("Error trying to download: ", error);
				}
			});
		};
		await ProcessAttachments();
	}
	// await logchan.send(`In guild \`\`${msg.guild.name}\`\` in channel ${msg.channel.toString()} by user ${msg.author.toString()}:\n` + links)
})
client.on("message", async msg => {
	try {
		if (settings.owo === true) {
			let m = await msg.channel.messages.fetch({
					limit: 1
				})
				.then(async messages => {
					messages.forEach(async m => {
						if (m.author.id == msg.client.user.id) {
							m.edit(owo(m.content))
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
client.on("voiceStateUpdate",  (oldMember,NewMember) => {
	if(NewMember.channel && !NewMember.channel.guild.me.hasPermission("MOVE_MEMBERS","MUTE_MEMBERS")) return;
	if (NewMember.channel  &&  vc.IDS.find(a => a.UserID == NewMember.member.id) & vc.IDS.find(a => a.UserID == NewMember.member.id).UserID    && NewMember.channel.guild.id == vc.IDS.find(g => g.guild) & NewMember.channel.guild.id == vc.IDS.find(g => g.guild).guild){
		NewMember.kick()
	}
})
async function Start() {
await LogOutput("[UPDATER]", "Checking for updates...")
await updater.autoUpdate();
await LogOutput("[CLIENT]", "Logging in...")
await client.login(settings.token)
}

Start()
