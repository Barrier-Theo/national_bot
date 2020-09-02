const tokenFile = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const table_scraper = require("table-scraper");
const { exec } = require("child_process");

const URL_CLASSEMENT =  "https://www.foot-national.com/partage.php?type=2&id=1 ";

var convertapi = require('convertapi')(tokenFile.convertapi);

client.once( "ready ", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on( "message", msg => {
    if (msg.content ===  "nat") {
    exec("webkit2png https://www.foot-national.com/partage.php?type=2&id=1", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
    console.log(`stdout: ${stdout}`);
    });
        table_scraper.get(URL_CLASSEMENT).then(
               function (datas) {
                   let datasFormat = ([].concat(...datas));
                   datasFormat.shift();
                   const embed = new Discord.MessageEmbed();
                   embed.attachFiles(['../src/wwwfootnationalcompartagephptype2-full.png'])
                   embed.setImage('attachment://wwwfootnationalcompartagephptype2-full.png')
                   embed.setColor('#0765b0')
                   datasFormat.forEach(function(object, index, array){
                      // embed.addField(object[0], object[1] + " " + object[2] + " pts")
                   });
                   msg.channel.send(embed);
               }
        );
    }
});

client.login(tokenFile.token);
