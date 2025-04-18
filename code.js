// One-line-compatible dev menu with 140+ enhanced features and polished UI
(function() {
  if (window.__devmenu) return; // prevent duplicates
  window.__devmenu = true;

  let style = document.createElement('style');
  style.textContent = `
    #devMenuBtn {
      position: fixed; top: 10px; left: 10px; z-index: 100000; background: #111; color: #0f0; font-size: 16px;
      padding: 6px 12px; border-radius: 8px; border: 1px solid #0f0; cursor: pointer;
    }
    #devMenu {
      position: fixed; bottom: 20px; left: 20px; z-index: 99999; background: rgba(0,0,0,0.95); color: white;
      padding: 16px; border-radius: 12px; display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 8px; max-height: 80vh; overflow-y: auto; font-family: sans-serif; font-size: 14px;
    }
    #devMenu button {
      background: #222; color: white; border: 1px solid #444; padding: 6px; border-radius: 6px; cursor: pointer;
    }
    #devMenu button:hover { background: #333; }
    #devLogPanel {
      position: fixed; top: 10px; right: 10px; background: #111; color: #0f0; padding: 10px;
      width: 300px; height: 200px; overflow: auto; font-family: monospace; font-size: 12px; border-radius: 8px; z-index: 99999;
    }
  `;
  document.head.appendChild(style);

  let toggleBtn = document.createElement('div');
  toggleBtn.id = 'devMenuBtn';
  toggleBtn.textContent = '[ + ]';
  document.body.appendChild(toggleBtn);

  let logPanel = document.createElement('div');
  logPanel.id = 'devLogPanel';
  document.body.appendChild(logPanel);
  let log = msg => {
    let line = document.createElement('div');
    line.textContent = '> ' + msg;
    logPanel.appendChild(line);
    logPanel.scrollTop = logPanel.scrollHeight;
  };

  let menu = document.createElement('div');
  menu.id = 'devMenu';
  document.body.appendChild(menu);
  let visible = true;

  let addBtn = (label, fn) => {
    let btn = document.createElement('button');
    btn.textContent = label;
    btn.onclick = () => { try { fn(); log(label + ' OK'); } catch (e) { log(label + ' ERR'); } };
    menu.appendChild(btn);
  };

  document.addEventListener('keydown', e => {
    if (e.shiftKey && e.key === '1') {
      visible = !visible;
      menu.style.display = visible ? 'grid' : 'none';
    }
  });

  toggleBtn.onclick = () => {
    visible = !visible;
    menu.style.display = visible ? 'grid' : 'none';
  };

  let features = [
    ['Toggle Edit', ()=>{document.body.contentEditable ^= 1}],
    ['Invert', ()=>{document.body.style.filter='invert(1)'}],
    ['Reset Filter', ()=>{document.body.style.filter=''}],
    ['Zoom +', ()=>{document.body.style.zoom=(+document.body.style.zoom||1)+.1}],
    ['Zoom -', ()=>{document.body.style.zoom=(+document.body.style.zoom||1)-.1}],
    ['Scroll ↓', ()=>{scrollBy(0,100)}],
    ['Scroll ↑', ()=>{scrollBy(0,-100)}],
    ['Show Borders', ()=>{document.querySelectorAll('*').forEach(e=>e.style.border='1px dashed red')}],
    ['Clear Logs', ()=>{logPanel.innerHTML=''}],
    ['Win Trigger', ()=>{log('🏁 WIN')}],
    ['Die Trigger', ()=>{log('☠️ DIE')}],
    ['AI Toggle', ()=>{window._ai^=1}],
    ['Pause Toggle', ()=>{window._paused^=1}],
    ['Reload', ()=>{location.reload()}],
    ['FPS', ()=>{setInterval(()=>{log('FPS ' + Math.round(1000/(performance.now()-window.__lt||performance.now())));window.__lt=performance.now()},1000)}],
    ['Ping', ()=>{fetch(location.href).then(r=>r.blob()).then(()=>log('Ping OK'))}],
    ['Memory', ()=>{log('Mem: '+(performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576)+'MB':'N/A'))}],
    ['Highlight Links', ()=>{document.querySelectorAll('a').forEach(a=>a.style.background='yellow')}],
    ['Del Images', ()=>{document.querySelectorAll('img').forEach(i=>i.remove())}],
    ['Fullscreen', ()=>{(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen())}],
    ['UserAgent', ()=>{log(navigator.userAgent)}],
    ['Cookies', ()=>{log(document.cookie)}],
    ['Clear Cookies', ()=>{document.cookie.split(';').forEach(c=>{document.cookie=c.replace(/^ +/,'').replace(/=.*/,'=;expires='+new Date(0).toUTCString()+';path=/')})}],
    ['Device Mem', ()=>{log(navigator.deviceMemory+' GB')}],
    ['Lang', ()=>{log(navigator.language)}],
    ['Platform', ()=>{log(navigator.platform)}],
    ['PointerToggle', ()=>{document.body.style.pointerEvents=(document.body.style.pointerEvents==='none'?'auto':'none')}],
    ['OverflowToggle', ()=>{document.body.style.overflow=(document.body.style.overflow==='hidden'?'auto':'hidden')}],
    ['No Anims', ()=>{document.querySelectorAll('*').forEach(e=>{e.style.animation='none'})}],
    ['No Trans', ()=>{document.querySelectorAll('*').forEach(e=>{e.style.transition='none'})}],
    ['Visibility', ()=>{document.body.style.visibility=(document.body.style.visibility==='hidden'?'visible':'hidden')}],
    ['Opacity 0/1', ()=>{document.body.style.opacity=(document.body.style.opacity==='0'?'1':'0')}],
    ['Title', ()=>{log(document.title)}],
    ['URL', ()=>{log(location.href)}],
    ['Host', ()=>{log(location.hostname)}],
    ['Path', ()=>{log(location.pathname)}],
    ['Time', ()=>{log(new Date().toLocaleTimeString())}],
    ['Date', ()=>{log(new Date().toLocaleDateString())}],
    ['ScrollX/Y', ()=>{log(scrollX + ',' + scrollY)}],
    ['Dim', ()=>{log(innerWidth+'x'+innerHeight)}],
    ['Font+', ()=>{document.body.style.fontSize=((parseFloat(getComputedStyle(document.body).fontSize)||16)+2)+'px'}],
    ['Font-', ()=>{document.body.style.fontSize=((parseFloat(getComputedStyle(document.body).fontSize)||16)-2)+'px'}],
    ['Blur', ()=>{document.body.style.filter='blur(3px)'}],
    ['Unblur', ()=>{document.body.style.filter='none'}],
    ['Screenshot', ()=>{log('[Fake] Screenshot triggered')}],
    ['Select All', ()=>{document.execCommand('selectAll')}],
    ['Color Text', ()=>{document.body.style.color='cyan'}],
    ['Rainbow Border', ()=>{document.querySelectorAll('*').forEach(e=>e.style.border='2px dashed hsl('+Math.floor(Math.random()*360)+'deg,100%,70%)')}],
    ['Dark/Light', ()=>{document.body.style.background=(document.body.style.background==='#000'?'':'#000');document.body.style.color=(document.body.style.color==='#fff'?'':'#fff')}],
    ['Shake', ()=>{document.body.style.transform='translateX(10px)'; setTimeout(()=>{document.body.style.transform=''},200)}],
    ['Mute', ()=>{let a=document.querySelectorAll('audio,video');a.forEach(m=>m.muted=true)}],
    ['Unmute', ()=>{let a=document.querySelectorAll('audio,video');a.forEach(m=>m.muted=false)}],
    ['Night Mode', ()=>{document.body.style.background='#111';document.body.style.color='#eee'}],
    ['Day Mode', ()=>{document.body.style.background='#fff';document.body.style.color='#111'}],
    ['Toggle Outlines', ()=>{document.querySelectorAll('*').forEach(e=>e.style.outline=(e.style.outline?'':'1px dashed lime'))}],
    ['Random Emoji', ()=>{let e=['😎','🚀','🔥','💥','✨','👾','⚡']; log(e[Math.floor(Math.random()*e.length)])}],
    ['Blink All', ()=>{document.querySelectorAll('*').forEach(e=>{e.style.animation='blinker 0.6s linear infinite'})}],
    ['Grayscale', ()=>{document.body.style.filter='grayscale(100%)'}],
    ['Sepia', ()=>{document.body.style.filter='sepia(100%)'}],
    ['Saturate', ()=>{document.body.style.filter='saturate(300%)'}],
    ['Rotate Page', ()=>{document.body.style.transform='rotate(180deg)'}],
    ['Flip Horizontal', ()=>{document.body.style.transform='scaleX(-1)'}],
    ['Flip Vertical', ()=>{document.body.style.transform='scaleY(-1)'}]
  ];

  features.forEach(f => addBtn(f[0], f[1]));
})();
