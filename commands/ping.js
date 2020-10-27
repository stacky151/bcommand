const discord = require("discord.js")
const db = require("quick.db")
module.exports = {
  name: "ping",
  aliases: [],
  description: "Pong!",
  run: async (client, message, args) => {
    let bping = db.fetch(`ping_${message.guild.id}`) //Make sure in the key the command name or variable name from last file is correct and all in lowercase
    if(bping === true) return message.channel.send("This command is blacklisted in this server.")
    
    message.channel.send("Pong")
  }
}