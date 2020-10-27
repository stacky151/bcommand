const discord = require("discord.js")
const db = require("quick.db")
module.exports = {
  name: "bcommand",
  aliases: ["blacklistcommand", "bcmd"],
  description: "Blacklist a certain command",
  run: async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You must be an Administrator to use this command")
    
    let commands = ["ping"] //Type all your commands here in an array for example ["ping" , "help", "play", "etc"]
    if(!args[0]) return message.channel.send("You forgot to specify one of my commands")

    if(!commands.includes(args[0])) return message.channel.send("You must specify a valid command this is not a valid command\n\nRun !help for my commands")
    
    let lower = args[0].toLowerCase() //Making it all lowerCase
    
    db.set(`${lower}_${message.guild.id}`, true)
    message.channel.send(`The command ${lower} has been blacklisted`)
    }
  }

  