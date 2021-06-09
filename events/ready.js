const figlet = require("figlet");
const Functions = require("../utils/Functions")
const colors = require("colors")

module.exports = async (client) => {

    let mesg = "Infinity Selfbot"

    figlet(mesg, async (err, ascii) => {
        if (err) {
            return;
        }
        console.log(colors.blue.bold(ascii))
        await Functions.DebugLog("info", `Client logged into account ${client.user.tag}`)
    })
}