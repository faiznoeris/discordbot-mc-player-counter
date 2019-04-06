const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const request = require('request');

bot.login('NTYzOTc3NTM3MjM1OTc2MjA0.XKhLYw.3twTim8S5qvCFT6zTYceTLH7sco');

// Log stats-bot in to the server and set status
bot.on("ready", async () => {
console.log(`${bot.user.username} has logged on.`)
// bot.user.setActivity('Half Life 3', { type: 'PLAYING' })
//   .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
//   .catch(console.error);

// Get our server
const guild = bot.guilds.get('310446682900791297');

// Get our stats channels
const totalUsers = bot.channels.get('563975579032879105');
// const onlineUsers = bot.channels.get('563975579032879105');
// const codeMonkeys = bot.channels.get('563975579032879105');

// Check every 30 seconds for changes
setInterval(function() {
  console.log('Getting stats update..')

  //Get actual counts
  // var userCount = guild.memberCount;
  // var onlineCount = guild.members.filter(m => m.presence.status === 'online').size
  // var coderCount = guild.roles.get('388102002695077888').members.size;

  // Log counts for debugging
  // console.log("Total Users: " + userCount);
  // console.log("Online Users: " + onlineCount);
  // console.log("Coders: " + coderCount);

  // var mcCommand = '/minecraft'; // Command for triggering
  var mcIP = '139.99.70.135'; // Your MC server IP
  var mcPort = 	25574; // Your MC server port
  var userCount = 0;

  var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
       request(url, function(err, response, body) {
           if(err) {
               console.log(err);
               return message.reply('Error getting Minecraft server status...');
           }
           body = JSON.parse(body);
           // var status = '*Minecraft server is currently offline*';
           if(body.online) {
               // status = '**Minecraft** server is **online**  -  ';
               if(body.players.now) {
                   userCount = body.players.now;

                   totalUsers.setName("Total Players: " + userCount)
                   .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
                   .catch(console.error);
                   // status += '**' + body.players.now + '** people are playing!';
               } else {
                   // status += '*Nobody is playing!*';
               }
           }
           // message.reply(status);
       });

  // Set channel names
  // totalUsers.setName("Total Users: " + userCount)
  // .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  // .catch(console.error);

  // onlineUsers.setName("Online Users: " + onlineCount)
  // .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  // .catch(console.error);
  //
  // codeMonkeys.setName("Coders: " + coderCount)
  // .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  // .catch(console.error);
  // }, 30000)

});

// bot.on('message', async message => {
//   if(message.author.bot) return;
//
//   let prefix = config.prefix;
//   let messageBody = message.content.split(" ");
//   let command = messageBody[0];
//
//
//   if(command == `${prefix}code`){
//     let repo = new Discord.RichEmbed()
//     .setDescription("Stats Bot Repository")
//     .setColor("#00FF00")
//     .addField("Github", "https://github.com/CodeSpent/discord-stats");
//
//
//     return message.channel.send(repo);
//   }
// });
