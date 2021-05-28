const Settings = require("../settings.json")
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
} = require("./Functions")

module.exports = class Functions {

    static SendReply(content) {
        if (Settings.silentmode == true) {
            
        } else {

        }
    }

}