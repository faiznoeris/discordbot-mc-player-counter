const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const request = require('request');

const botToken = process.env.token;
const serverIp = process.env.serverIp;
const serverPort = process.env.serverport;

bot.login(token);

bot.on('ready', async () => {
    console.log(`${bot.user.username} has logged on.`);

    const guild = bot.guilds.get('310446682900791297');
    const channelTotalPlayers = bot.channels.get('563975579032879105');
    const channelTotalMembers = bot.channels.get('564009370850164737');

    setInterval(function() {
        const members = guild.memberCount;
        const baseMcApiUrl = 'http://mcapi.us/server/status';
        let players = 0;
        let url = `${baseMcApiUrl}?ip=${serverIp}&port=${serverPort}`;

        if (!serverPort) {
            url = `${baseMcApiUrl}?ip=${serverIp}`;
        }

        channelTotalMembers.setName('Total members: ' + members)
            .catch(console.error);

        request(url, function(err, response, body) {
            const parsedBody = JSON.parse(body);

            if(err) {
                console.log(err);
            }

            if(parsedBody.online) {
                if(parsedBody.players) {
                    players = parsedBody.players.now;
                    channelTotalPlayers.setName('Total players: ' + players)
                        .catch(console.error);
                }
            } else {
                channelTotalPlayers.setName('OFFLINE')
                    .catch(console.error);
            }
        });
    }, 30000); //30sec
});
