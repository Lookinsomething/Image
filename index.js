const request = require('request');
const cheerio = require('cheerio');
const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = '!';
const token = "Nzc3NzY1ODU2NzgwMjIyNDg2.X7IM5g.Nm7Tx5cFF8hMSxN0Wnr54_49X_s";
var version = '1.3';

bot.on('ready', () => {
    console.log('Bot is online ' + version);
});


bot.on('message', message => {
 
    let args = message.content.substring(prefix.length).split(" ");
 
    switch (args[0]) {
        case 'image':
        image(message);
 
        break;
    }
 
});
 
function image(message){
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "anime",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
 
 
 
 
 
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });
 
 
 
 
 
 
}

bot.login(token)