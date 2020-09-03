const tokenFile = require("../config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const axios = require('axios');
const table_scraper = require("table-scraper");

const URL_CLASSEMENT =  "http://www.foot-national.com/partage.php?type=2&id=1 ";


client.once( "ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on( "message", msg => {
    if (msg.content ===  "nat") {
        /* table_scraper.get(URL_CLASSEMENT).then(
               function (datas) {
                   let datasFormat = ([].concat(...datas));
                   datasFormat.shift();
                   const embed = new Discord.MessageEmbed();
                   embed.setColor('#0765b0')
                   let str = "";
                   datasFormat.forEach(function(object, index, array){
                    str += object[1] + " " + object[2] + " <b>pts</b><br/>";
                   });
                   embed.addField("Classement", str);
                   //embed.type = "rich";
                   console.log(embed.type);
                   msg.channel.send(embed);
               }
        ); */

        axios.post('https://api.cloudconvert.com/v1/convert',  {
                "apikey": "tEX6m8bVsaqGTZfQqkPNpAMLlusGiLml0IsQjT84wDCKd1vkWROp0Y83vp2GZOim",
                "inputformat": "html",
                "outputformat": "png",
                "input": "raw",
                "file": "Bon<b>jour </b>coucou",
                "filename": "file.html",
                "wait": true,
                "download": false
        }).then(response => {
            response.data.pipe(fs.createWriteStream("tmp.png"));
        });
       // }).pipe(fs.createWriteStream('outputfile.png'));
/*
        const embed = new Discord.MessageEmbed();
        embed.attachFiles('outputfile.png');
        msg.channel.send(embed);*/
    }
});

client.login(tokenFile.token);
