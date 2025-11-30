const express = require('express');
const { Client, Intents, MessageEmbed, Collection } = require('discord.js');
const app = express();

app.get("/", (req, res) => {
  res.send('<html><head><title>Web view</title></head><body style="margin: 0; padding: 0;"><h1>Fiddy</h1></body></html>');
});

app.listen(3000, () => {
  console.log("bot is running!");
});

const client = new Client({ 
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "DIRECT_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "GUILD_PRESENCES",
    "GUILD_MEMBERS"
  ],
  allowedMentions: { parse: ['users'] }
});

const fs = require('fs');
const prefix = "-";
client.commands = new Collection();
const commandFiles = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const commandName = file.split(".")[0];
  const command = require(`./Commands/${commandName}`);
  client.commands.set(commandName, command);
}

client.on("messageCreate", message => {
  console.log("message!", message.content);

  if(message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift();
    const command = client.commands.get(commandName);
    if(!command) return;
    command.run(client, message, args);
  }

  // you can make your own this are just examples
  if (message.content === "hi") {
    console.log("said-hi");
    message.channel.send("hi");
  }
  if (message.content.includes("!help")) {
    console.log("said-!help");
    message.channel.send("nope");
  }
  if (message.content.startsWith("?bot")) {
    console.log("?bot");
    let embed = new MessageEmbed()
      .setTitle("Who am i?")
      .setDescription("ima bot")
      .setFooter("alr")
      .setColor("DARK_GOLD");

    message.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.token);  //paste your token in 
