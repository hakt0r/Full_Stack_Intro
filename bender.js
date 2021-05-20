const token = '...';

const Discord = require('discord.js');
const client = new Discord.Client();

const moment = require('moment');

const config = {
  admin: {
    'anx#6421':{}
    'Eko450#8002':{}
  },
  student:{
    "Micha#2764": {},
    "glenn#2012": {},
    "Nisha#5536": {},
    "AntonBui#2461": {},
    "Sami#2749": {},
    "Madhumitha#2409": {},
    "Djohar#0860": {},
    "Hispalis#5178": {},
  }
}

client.on('ready', async () => {

  console.log(`Logged in as ${client.user.tag}!`);

  let channel = client.channels.cache.find( c => c.type === 'voice' && c.name.match(/Class/));

  if ( ! channel ) return console.error("The channel does not exist!");

  try {
    
    await channel.join()

  } catch (e){ console.error(e) }

  const allStudents = Object.keys(config.student);

  client.users.cache.forEach( user => {
    const tag = `${user.username}#${user.discriminator}`;
    if ( config.student[tag] ){
      const rec = config.student[tag];
      rec.id = user.id;
      rec.name = user.username;
    }
  })

  const general = client.channels.cache.find(channel => channel.name.match(/general-dci/));

  setBreakTimer(general);
});

function setBreakTimer(general){
  const now = moment();
  const firstBreakTime = now.valueOf() - moment(`${now.format('YYYY-MM-DD')} 11:00`).valueOf();
  const lunchBreakTime = now.valueOf() - moment(`${now.format('YYYY-MM-DD')} 12:00`).valueOf();
  const lastBreakTime  = now.valueOf() - moment(`${now.format('YYYY-MM-DD')} 15:00`).valueOf();

  let nextBreak;
  if      ( firstBreakTime < 0 ) nextBreak = firstBreakTime;
  else if ( lunchBreakTime < 0 ) nextBreak = lunchBreakTime;
  else if (  lastBreakTime < 0 ) nextBreak = lastBreakTime;
  else nextBreak = false;

  if ( nextBreak ){
    setTimeout(
      ()=> {
        general.send("Break!!!");
        setBreakTimer(general);
      },
      -nextBreak
    );
  }
}

client.on('message', msg => {

  if ( ! msg.author ) return;
  
  console.log(msg.author.tag, msg.content);
  
  const [cmd,...args] = msg.content.split(' ');

  if ( config.admin[msg.author.tag] ){
    switch ( cmd ){
      case "list": return msg.author.send(JSON.stringify(config.student));
    }
  }

  if ( config.student[msg.author.tag] || config.admin[msg.author.tag] ){
    switch ( cmd ){

      case "say":
        return msg.author.send(args.join(' '));

      case "break":
        const now = moment();
        const firstBreakTime = now.valueOf() - moment(`${now.format('YYYY-MM-DD')} 11:00`).valueOf();
        const lunchBreakTime = now.valueOf() - moment(`${now.format('YYYY-MM-DD')} 12:00`).valueOf();
        const lastBreakTime  = now.valueOf() - moment(`${now.format('YYYY-MM-DD')} 15:00`).valueOf();
        let nextBreak;
        if      ( firstBreakTime < 0 ) nextBreak = moment(`${now.format('YYYY-MM-DD')} 11:00`);
        else if ( lunchBreakTime < 0 ) nextBreak = moment(`${now.format('YYYY-MM-DD')} 12:00`);
        else if (  lastBreakTime < 0 ) nextBreak = moment(`${now.format('YYYY-MM-DD')} 15:00`);
        else nextBreak = false;
        return msg.author.send(`Break is ${nextBreak.fromNow()}`);
    }
  }
});

client.on('voiceStateUpdate', (prv,msg) => {
  if ( ! msg.channel || ! msg.member ) return;
  console.log(msg.channel.name, msg.member.displayName);
  const rec = config.student[msg.member.user.tag];
  if ( ! rec ) return;
  if ( rec.isOnline && msg.channel.name.match(/(Class|Group)/) && ! rec.hasJoined ) {
    rec.hasJoined = true;
    client.emit('studentJoined',msg.member,msg.channel);
  }
});

client.on('presenceUpdate', async (oldMember, newMember) => {
  if ( newMember.user.bot) return;
  const rec = config.student[newMember.member.user.tag];
  if ( ! rec ) return;
  if ( newMember.status === 'online' ){
    rec.isOnline = true;
    rec.hasJoined = false;  
  } else {
    rec.isOnline = true;
    if ( rec.hasJoined ){
      client.emit('studentLeft',newMember.member); 
    }
    rec.hasJoined = false;
  }
});

client.on('studentJoined',(member,channel)=>{
  console.log(member.user.tag, 'is present');
});

client.on('studentLeft',(member,channel)=>{
  console.log(member.user.tag, 'has left');
});


client.login(token);
