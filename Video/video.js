
const cp = require('child_process');
const fs = require('fs');

const [ ,, command, ...args ] = process.argv;

function get_audio_devices (){
  const cmd = 'pacmd list-sources';
  // get monitor index from command
}

let name;
switch ( command ){
  case 'record':
    [ name ] = args; 
    if ( ! name ) return console.error('please specify a name');

    const      DISPLAY = process.env.DISPLAY || '0';
    const MAIN_DISPLAY = 'eDP-1';

    const       xrandr = cp.execSync(`xrandr`).toString();
    const        pacmd = cp.execSync(`pacmd list-sources`).toString();

    if ( ! xrandr ) return console.error( 'xrandr not available' );
    if ( ! pacmd  ) return console.error( 'pacmd not available' );

    const { index:MIC } = pacmd.split('\n').reduce( ( {index,found,combined},line ) => {
      const isIndex    = line.match(/^.*index:.*([\d]+)$/);
      const isMatch    = line.match(/device.icon_name = "audio-input-microphone"/);
      const isCombined = line.match(/combined/g);
      if ( isCombined ) combined = true;
      if ( ! found    && isIndex ) { index = Number(isIndex[1]); combined = false; };
      if ( ! combined && isMatch ) found = true;
      return {index,found,combined};
    }, { index: -1 });

    const { index:MON } = pacmd.split('\n').reduce( ( {index,found,combined},line ) => {
      const isIndex    = line.match(/^.*index:.*([\d]+)$/);
      const isMatch    = line.match(/monitor/);
      const isCombined = line.match(/combined/g);
      if ( isCombined ) combined = true;
      if ( ! found    && isIndex ) { index = Number(isIndex[1]); combined = false; };
      if ( ! combined && isMatch ) found = true;
      return {index,found,combined};
    }, { index: -1 });


    const [, state, x, y, ox, oy ] = xrandr.match(
      `${MAIN_DISPLAY}.*(connected).*?([\\d]+)x([\\d]+)\\+([\\d]+)\\+([\\d]+)`
    );

    const MAIN_RESOLUTION = `${x}x${y}`;
    const MAIN_OFFSET     = `+${ox},${oy}`;

    console.log('recording', name);
    console.log( '   ', 'video', MAIN_DISPLAY, MAIN_RESOLUTION, MAIN_OFFSET )
    console.log( '   ', '  mic', MIC )
    console.log( '   ', '  mic', MON )
    
    cp.spawn(
      'ffmpeg',[
      '-y', '-video_size', MAIN_RESOLUTION, '-framerate', 25,
      '-f', 'x11grab', '-i', `${DISPLAY}.0${MAIN_OFFSET}`,
      '-f', 'pulse', '-ac', 2, '-i', 'default',
      '-f', 'pulse', '-ac', 2, '-i', 2,
      `Video/${name}.mp4`
    ], {stdio: 'inherit' });
    break;
  case 'split':
    const seconds = 1700;
    [ name ] = args; name = name.replace(/.mp4/,'');
    const [,h,m,s,ms] = cp.execSync(`ffmpeg -i ${name}.mp4 2>&1 | grep "Duration"`).toString().match(`Duration: ([0-9]+):([0-9]+):([0-9]+).([0-9]+)`)
    const totalSeconds = Number(h) * 60 * 60 + Number(m) * 60 + Number(s) + 1
    for ( i = 0; i < Math.ceil(totalSeconds / seconds); i++ ){
      cp.spawnSync('ffmpeg',['-i',`${name}.mp4`,'-ss', i * seconds,
      '-t',seconds,'-c','copy',`${name}.p${i.toString().padStart(2,'0')}.mp4`],{stdio:'inherit'})
    }
    break;
  case 'push':
    process.chdir('./Video');
    // cp.execSync('for i in $(ls *.mp4); do MP4Box -isma -inter 500 $i; done');
    const list = fs.readdirSync('.').filter( f => f.match('.mp4') );
    const html = `<html>
    ${list.map(
      file => `<li/><a href="${file}">${file}</a>`
    ).join('\n')}
    </html>`;
    fs.writeFileSync('fullStack.html',html);
    cp.spawn('rsync',['-avz','--partial','--progress','.','root@sz.hktr.de:/var/www/lfs/dci/fbw14/'],{stdio:'inherit'})
    
}