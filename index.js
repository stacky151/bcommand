const fs = require("fs");
const discord = require("discord.js");
const prefix = "!";
const client = new discord.Client();
const db = require("quick.db")

client.commands = new discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith("js"));

client.aliases = new discord.Collection();
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  command.aliases.forEach(alias => client.aliases.set(alias, command.name));
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log("Im online" + ` ${client.user.tag}`);
});

client.on("message", async message => {
  
  
  if(message.channel.id === "768892369289347082"){
    if(message.author.bot) return
    let count = db.fetch(`count1_${message.guild.id}`)
    if(count === null || count === 0) count = 1
    if(isNaN(message.content)) {
      db.delete(`count1_${message.guild.id}`)
      db.delete(`count_${message.guild.id}`)
      db.set(`count_${message.guild.id}`, 1)
      return message.channel.send("This is not a number and " + `${message.author} ruined the counting and you all are back to 1`)
    }
    if(message.content === count) {
      db.delete(`count_${message.guild.id}`)
      db.delete(`count1_${message.guild.id}`)
      db.set(`count_${message.guild.id}`, 1)
      return message.channel.send("You ruined it " + `${message.author} at ${count}`)
    }
    db.add(`count1_${message.guild.id}`, 1)
    db.set(`count_${message.guild.id}`, count)
    console.log(count)
  }
  
  if (message.author.bot) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));

  if (cmd === null) return;

  if (cmd) cmd.run(client, message, args);
  if (!cmd) return;
});


client.login(process.env.TOKEN);
