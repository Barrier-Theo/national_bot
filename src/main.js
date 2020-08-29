const tokenFile = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const table_scraper = require("table-scraper");
const utf8 = require('utf8');
const iconv = require('iconv');

const URL_CLASSEMENT =  "http://www.foot-national.com/partage.php?type=2&id=1 ";


client.once( "ready ", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on( "message", msg => {
    if (msg.content ===  "nat") {
        table_scraper.get(URL_CLASSEMENT).then(
               function (datas) {
                   let datasFormat = ([].concat(...datas));
                   datasFormat.shift();
                   const embed = new Discord.MessageEmbed();
                   embed.setColor('#0765b0')
                   datasFormat.forEach(function(object, index, array){
                       embed.addField(object[0], object[1] + " " + object[2] + " pts")
                   });
                   msg.channel.send(embed);
               }
        );
    }
});

client.login(tokenFile.token);
