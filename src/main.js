const tokenFile = require('../config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const rp = require('request-promise');
const cheerio = require('cheerio');
const table_scraper = require('table-scraper');

const URL = 'http://www.foot-national.com/partage.php?type=2&id=1';


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'nat') {
        table_scraper.get(URL).then(
               function (datas) {
                   let classement = '```';
                   let datasFormat = ([].concat(...datas)).shift();

                   datasFormat.forEach(function(object, index, array){
                        classement  += object['0'] + '\t' + object['1'] + '\t ' + object['2'] + '\t' + object['3'] + '\t' + object['4'] + '\t' + object['5'] + '\n';
                   });
                   classement += '```';
                   msg.channel.send(classement);
               }
        );
    }
});

client.login(tokenFile.token);
