const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const request = require('request');

bot.login(process.env.token);

bot.on("ready", async () => {
    console.log(`${bot.user.username} has logged on.`)

    const guild = bot.guilds.get('310446682900791297');
    const totalUsers = bot.channels.get('563975579032879105');
    const totalDiscordUsers = bot.channels.get('564009370850164737');

    setInterval(function() {
        // console.log('Getting stats update..')
        var userCount = 0;

        const discordUsers = guild.memberCount;
        totalDiscordUsers.setName("Total members: " + discordUsers)
            // .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
            .catch(console.error);

        let url = 'http://mcapi.us/server/status?ip=' + process.env.serverip + '&port=' + process.env.serverport;
        if (!process.env.serverport) {
            url = 'http://mcapi.us/server/status?ip=' + process.env.serverip;
        }

        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.reply('Error getting Minecraft server status...');
            }
            body = JSON.parse(body);
            console.log(body);
            if(body.online) {
                if(body.players) {
                    userCount = body.players.now;
                    totalUsers.setName("Total players: " + userCount)
                        .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
                        .catch(console.error);
                }
            } else {
                totalUsers.setName("OFFLINE")
                    .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
                    .catch(console.error);
            }
        });
    }, 30000);
});
