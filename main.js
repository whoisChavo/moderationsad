const Discord = require("discord.js")
const client = new Discord.Client();
const ayar = require("./settings.js")
const fs = require("fs");
require('./util/Loader.js')(client);

const moment = require('moment');
require('moment-duration-format')

const mongoose = require('mongoose');
mongoose.connect(ayar.bot.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./Commands/', (err, files) => {
    if (err) console.error(err);
    console.log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./Commands/${f}`);
        client.commands.set(props.config.name, props);
        props.config.aliases.forEach(alias => {
            client.aliases.set(alias, props.config.name);
        });
    });
})

client.login(ayar.bot.botToken)

let limit = require('./models/limit.js');
setInterval(async() => {
    moment.locale('tr')
    var nowDate = moment().format("HH:mm:ss")
    if (nowDate === "00:00:00") {
        limit.deleteOne({ guildID: ayar.guild.guildID }).catch(e => {})
    }
}, 500)

client.on('message', message =>{
  const sa = message.content.toLowerCase()
  
  if(sa === 'sa' || sa === 'sea' || sa === 'selam aleyküm' || sa === 'Selam Aleyküm') {
  message.channel.send(`Aleyküm Selam Hoş Geldin <@${message.author.id}>`)
  }
  })

client.on('userUpdate', async (oldUser, newUser) => {
    if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
    let Guild = client.guilds.cache.get("847847001348898827")
    let Üye = Guild.members.cache.get(oldUser.id);
    if(["⟡", "brj"].some(p => Üye.user.username.includes(p)) && !Üye.roles.cache.has("896493419415887939") && !Üye.roles.cache.has("928260948882501684")){
      
      if(Üye.roles.cache.has("896493419415887936")){
      Üye.roles.add("896493419415887939").catch();
      client.channels.cache.get("906845906614255626").send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${oldUser} adlı kullanıcı tagımızı aldığı için <@&896493419415887939> rolünü verdim.`))
      }
      if(Üye.roles.cache.has("896493419415887937")){
        Üye.roles.add("928260948882501684").catch();
        client.channels.cache.get("906845906614255626").send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${oldUser} adlı kullanıcı tagımızı aldığı için <@&928260948882501684> rolünü verdim.`))
    }
  }});
  
  client.on('userUpdate', async (oldUser, newUser) => {
    if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
    let Guild = client.guilds.cache.get("847847001348898827")
    let Üye = Guild.members.cache.get(oldUser.id);
  
  
    if(!["⟡", "brj"].some(p => Üye.user.username.includes(p))&& Üye.roles.cache.has("896493419415887939") && !Üye.roles.cache.has("928260948882501684")){
      if(Üye.roles.cache.has("896493419415887936")){
      Üye.roles.remove("896493419415887939").catch();
     client.channels.cache.get("906845906614255626").send(new Discord.MessageEmbed().setColor("RED").setDescription(`${oldUser} adlı kullanıcı tagımızı çıkardığı için <@&896493419415887939> rolünü aldım.`))
    }
      if(Üye.roles.cache.has("896493419415887937")){
      Üye.roles.remove("906845906614255626").send(new Discord.MessageEmbed().setColor("RED").setDescription(`${oldUser} adlı kullanıcı tagımızı çıkardığı için <@&928260948882501684> rolünü aldım.`))
    }
  
    }});
  
const tagData = require('./models/yasaklıtag.js');
client.on('userUpdate', async(old, nev) => {
    let guild = await (client.guilds.cache.get(ayar.guild.guildID))
    let uye = guild.members.cache.get(old.id)
    let data = await tagData.find({ guildID: uye.guild.id }, async(err, data) => {
        if (!data || !data.length) return;
        if (data) {
            let taglar = data.map(s => s.Tag)
            if (taglar.some(tag => nev.tag.toLowerCase().includes(tag))) {
                await uye.roles.set([ayar.roles.yasaklıTag])
                await uye.setNickname('Yasaklı | Tag')
                await guild.channels.cache.get(ayar.channels.yasaklıtagLog).send(new Discord.MessageEmbed().setDescription(`${uye} Adlı kullanıcı sunucumuzun yasaklı tagında bulunduğu için yasaklı tag rolünü verdim`))
            } else if (uye.roles.cache.has(ayar.roles.yasaklıTag)) {
                await uye.roles.set(ayar.roles.unregisterRoles)
                await uye.setNickname('• Kayıtısız')
                await guild.channels.cache.get(ayar.channels.yasaklıtagLog).send(new Discord.MessageEmbed().setDescription(`${uye} Adlı kullanıcı sunucumuzun yasaklı tagını kaldırdıgı için yasaklı tag rolünü aldım`))

            }
        }
    })
})


