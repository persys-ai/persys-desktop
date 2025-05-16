const { app, BrowserWindow, ipcMain,Menu,session ,dialog} = require('electron');
const path = require('node:path');
const { updateElectronApp, UpdateSourceType }=require('update-electron-app');
//

let titleBarVisibility='hidden';
let transparency=true;
if(process.platform !== 'darwin') {
  titleBarVisibility='visible';
  transparency=false;
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if(require('electron-squirrel-startup')) app.quit();

//
const getPos=()=>{
  let current_win=BrowserWindow.getFocusedWindow();
  if(current_win) return current_win.getPosition();
  else return [0,0];
};
//

let homeWindowId=false;
const homeWindow=()=> {
  if(!homeWindowId) {
    const mainWindow=new BrowserWindow({
      width: 1100,
      height: 700,
      titleBarStyle: titleBarVisibility,
      trafficLightPosition:{x:10,y:10},
      webPreferences: {
        preload: path.join(__dirname,'preload.js'),
        nodeIntegration:true,
        contextIsolation:true
      },
      icon:path.join(__dirname,'icon.png')
    });
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    homeWindowId=mainWindow.id;
    mainWindow.on('closed',()=>{homeWindowId=false;});
  }
  BrowserWindow.fromId(homeWindowId).focus();
};

let loginWindowId=false;
const login=()=>{
  if(!loginWindowId) {
    const win = new BrowserWindow({
      width: 350,
      height: 425,
      titleBarStyle:titleBarVisibility,
      trafficLightPosition:{x:10,y:10},
      webPreferences: {
        preload:path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: true
      },
      transparent:transparency,
      resizable:false,
      icon:path.join(__dirname, 'icon.png')
    });
    win.loadFile(path.join(__dirname, 'login.html'));
    loginWindowId=win.id;
    win.on('closed',()=>{loginWindowId=false;});
  }
  BrowserWindow.fromId(loginWindowId).focus();
};

// main
ipcMain.on('launch-program', (event, arg) => {
  BrowserWindow.getAllWindows()[0].close();
  homeWindow();
});

// apps
let chatWindow=false;
let musicWindow=false;
let paperWindow=false;
let galleryWindow=false;
let cinemaWindow=false;
let filesWindow=false;
let libraryWindow=false;
let todoWindow=false;
let cardclipWindow=false;
let monitorWindow=false;
let plaintextWindow=false;
//
ipcMain.on('open-paper', (event, arg) =>{
  let pos=getPos();
  const viewer = new BrowserWindow({
    width: 900,
    height: 770,
    titleBarStyle:titleBarVisibility,
    trafficLightPosition:{x:10,y:10},
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    },
    transparent:transparency,
    icon:path.join(__dirname, 'icon.js'),
    x:pos[0]-42,
    y:pos[1]-42,
  });
  viewer.webContents.send('paper-content',arg);
  viewer.loadFile(path.join(__dirname, 'paper.html'));
  paperWindow=viewer.id;
  viewer.on('closed',()=>{paperWindow=false;});
});
ipcMain.on('open-player', (event, arg) => {
  if(!musicWindow) {
    let pos=getPos();
    const viewer = new BrowserWindow({
      width: 320,
      height: 550,
      titleBarStyle:titleBarVisibility,
      trafficLightPosition:{x:10,y:10},
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: true
      },
      transparent: transparency,
      resizable:false,
      icon:path.join(__dirname, 'icon.js'),
      x:pos[0]-42,
      y:pos[1]-42,
    });
    viewer.webContents.send('player-media',arg);
    viewer.loadFile(path.join(__dirname, 'player.html'));
    musicWindow=viewer.id;
    viewer.on('closed',()=>{musicWindow=false;});
  }
  BrowserWindow.fromId(musicWindow).focus();
});
ipcMain.on('open-gallery', (event, arg) => {
  if(!galleryWindow) {
    let pos=getPos();
    const viewer = new BrowserWindow({
      width: 800,
      height: 500,
      titleBarStyle:titleBarVisibility,
      trafficLightPosition:{x:10,y:10},
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: true
      },
      transparent: transparency,
      icon:path.join(__dirname, 'icon.js'),
      x:pos[0]-42,
      y:pos[1]-42,
    });
    viewer.webContents.send('gallery-content',arg);
    viewer.loadFile(path.join(__dirname, 'gallery.html'));
    galleryWindow=viewer.id;
    viewer.on('closed',()=>{galleryWindow=false;});
  }
  BrowserWindow.fromId(galleryWindow).focus();
});
ipcMain.on('open-cinema', (event, arg) => {
  if(!cinemaWindow) {
    let pos=getPos();
    const viewer = new BrowserWindow({
      width: 800,
      height: 500,
      titleBarStyle:titleBarVisibility,
      trafficLightPosition:{x:10,y:10},
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: true
      },
      transparent: transparency,
      icon:path.join(__dirname, 'icon.js'),
      x:pos[0]-42,
      y:pos[1]-42,
    });
    viewer.webContents.send('cinema-content',arg);
    viewer.loadFile(path.join(__dirname, 'cinema.html'));
    cinemaWindow=viewer.id;
    viewer.on('closed',()=>{cinemaWindow=false;});
  }
  BrowserWindow.fromId(cinemaWindow).focus();
});
ipcMain.on('open-chat', (event, arg) => {
  if(!chatWindow) {
    let pos=getPos();
    const viewer = new BrowserWindow({
      width: 900,
      height: 600,
      titleBarStyle:titleBarVisibility,
      trafficLightPosition:{x:10,y:10},
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: true
      },
      transparent: transparency,
      icon:path.join(__dirname, 'icon.js'),
      x:pos[0]-42,
      y:pos[1]-42,
    });
    viewer.webContents.send('chat-content',arg);
    viewer.loadFile(path.join(__dirname, 'chat.html'));
    chatWindow=viewer.id;
    viewer.on('closed',()=>{chatWindow=false;});
  }
  else BrowserWindow.fromId(chatWindow).focus();
});
ipcMain.on('open-files', (event, arg) => {
  if(!filesWindow) {
    let pos=getPos();
    const viewer = new BrowserWindow({
      width: 800,
      height: 500,
      titleBarStyle:titleBarVisibility,
      trafficLightPosition:{x:10,y:10},
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: true
      },
      transparent: transparency,
      icon:path.join(__dirname, 'icon.js'),
      x:pos[0]-42,
      y:pos[1]-42,
    });
    //viewer.webContents.send('files-content',arg);
    viewer.loadFile(path.join(__dirname, 'files.html'));
    filesWindow=viewer.id;
    viewer.on('closed',()=>{filesWindow=false;});
  }
  else BrowserWindow.fromId(filesWindow).focus();
});
ipcMain.on('open-library', (event, arg) =>{
  let pos=getPos();
  const viewer = new BrowserWindow({
    width: 900,
    height: 770,
    titleBarStyle:titleBarVisibility,
    trafficLightPosition:{x:10,y:10},
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    },
    transparent:transparency,
    icon:path.join(__dirname, 'icon.js'),
    x:pos[0]-42,
    y:pos[1]-42,
  });
  viewer.webContents.send('library-content',arg);
  viewer.loadFile(path.join(__dirname, 'library.html'));
  libraryWindow=viewer.id;
  viewer.on('closed',()=>{libraryWindow=false;});
});
ipcMain.on('open-todo', (event, arg) => {
  if(!todoWindow) {
    let pos=getPos();
    const viewer = new BrowserWindow({
      width: 800,
      height: 500,
      titleBarStyle:titleBarVisibility,
      trafficLightPosition:{x:10,y:10},
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: true
      },
      transparent: transparency,
      resizable:false,
      icon:path.join(__dirname, 'icon.js'),
      x:pos[0]+142,
      y:pos[1]+142,
    });
    viewer.webContents.send('todo-content',arg);
    viewer.loadFile(path.join(__dirname, 'todo.html'));
    todoWindow=viewer.id;
    viewer.on('closed',()=>{todoWindow=false;});
  }
  BrowserWindow.fromId(todoWindow).focus();
});
ipcMain.on('open-cardclip', (event, arg) => {
  if(!cardclipWindow) {
    let pos=getPos();
    const viewer = new BrowserWindow({
      width: 800,
      height: 400,
      titleBarStyle:titleBarVisibility,
      trafficLightPosition:{x:10,y:10},
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: true
      },
      transparent: transparency,
      resizable:false,
      icon:path.join(__dirname, 'icon.js'),
      x:pos[0]+142,
      y:pos[1]+142,
    });
    viewer.webContents.send('cardclip-content',arg);
    viewer.loadFile(path.join(__dirname, 'cardclip.html'));
    cardclipWindow=viewer.id;
    viewer.on('closed',()=>{cardclipWindow=false;});
  }
  BrowserWindow.fromId(cardclipWindow).focus();
});
ipcMain.on('open-options', (event, arg) => {
  let pos=getPos();
  const viewer = new BrowserWindow({
    width: 650,
    height: 425,
    titleBarStyle:titleBarVisibility,
    trafficLightPosition:{x:10,y:10},
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    },
    transparent: transparency,
    resizable:false,
    icon:path.join(__dirname, 'icon.js'),
    x:pos[0]+142,
    y:pos[1]+142,
  });
  viewer.webContents.send('options-content',arg);
  viewer.loadFile(path.join(__dirname, 'options.html'));
});
ipcMain.on('open-monitor', (event, arg) => {
  if(!monitorWindow) {
    let pos=getPos();
    const viewer = new BrowserWindow({
      width: 300,
      height: 600,
      titleBarStyle:titleBarVisibility,
      trafficLightPosition:{x:10,y:10},
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: true
      },
      transparent: transparency,
      resizable:false,
      icon:path.join(__dirname, 'icon.js'),
      x:pos[0]+250,
      y:pos[1]+250,
    });
    viewer.loadFile(path.join(__dirname, 'monitor.html'));
    monitorWindow=viewer.id;
    viewer.on('closed',()=>{monitorWindow=false;});
  }
  BrowserWindow.fromId(monitorWindow).focus();
});
ipcMain.on('open-rag', (event, arg) => {
  let pos=getPos();
  const viewer=new BrowserWindow({
    width: 500,
    height: 500,
    titleBarStyle:titleBarVisibility,
    trafficLightPosition:{x:10,y:10},
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    },
    transparent: transparency,
    resizable:false,
    icon:path.join(__dirname, 'icon.js'),
    x:pos[0]+250,
    y:pos[1]+250,
  });
  viewer.webContents.send('rag-content',arg);
  viewer.loadFile(path.join(__dirname, 'rag.html'));
});
ipcMain.on('open-plaintext', (event, arg) =>{
  let pos=getPos();
  const viewer = new BrowserWindow({
    width: 500,
    height: 650,
    titleBarStyle:titleBarVisibility,
    trafficLightPosition:{x:10,y:10},
    webPreferences: {
      preload: path.join(__dirname,'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    },
    transparent:transparency,
    icon:path.join(__dirname, 'icon.js'),
    x:pos[0]-42,
    y:pos[1]-42,
  });
  viewer.webContents.send('plaintext-content',arg);
  viewer.loadFile(path.join(__dirname, 'plaintext.html'));
  plaintextWindow=viewer.id;
  viewer.on('closed',()=>{plaintextWindow=false;});
});
//
ipcMain.on('set-closeSidebar', (event, arg) =>{
  BrowserWindow.getFocusedWindow().setSize(BrowserWindow.getFocusedWindow().getSize()[0]-250,BrowserWindow.getFocusedWindow().getSize()[1])
});
ipcMain.on('set-openSidebar', (event, arg) =>{
  BrowserWindow.getFocusedWindow().setSize(BrowserWindow.getFocusedWindow().getSize()[0]+250,BrowserWindow.getFocusedWindow().getSize()[1])
});
//
ipcMain.on('set-cookie',(event,arg)=>{
  session.defaultSession.cookies.set({url:'http://'+arg.host,name:arg.name,value:arg.value})
      .then(() => {
      },(error) => {
        console.error('e: '+error)
      })
});
ipcMain.on('get-cookies',(event,arg)=>{
  session.defaultSession.cookies.get({})
      .then((cookies)=>{
        BrowserWindow.getFocusedWindow().webContents.send('cookie-content',cookies);
      })
      .catch((error) => {
        console.log('ee: '+error)
      });
});

let template = [{
  label: "Application",
  submenu: [
    { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
    { type: "separator" },
    { label: "Quit", accelerator: "Command+Q", click: ()=> {app.quit();}}
  ]}, {
  label: "Edit",
  submenu: [
    { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
    { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
    { type: "separator" },
    { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
    { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
    { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
    { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
  ]}
];
//Menu.setApplicationMenu(Menu.buildFromTemplate(template));

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  //homeWindow();
  login();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    session.defaultSession.cookies.get({})
        .then((cookies)=>{
          if(cookies.findIndex(x=>x.name==='publicToken')>-1 && cookies[cookies.findIndex(x=>x.name==='publicToken')].value) homeWindow();
          else login();
        })
        .catch((error) => {
          console.log('ee: '+error)
        })
  });
});
ipcMain.on('logout', (event, arg) => {
  session.defaultSession.cookies.get({})
      .then((cookies)=>{
        session.defaultSession.cookies.remove('http://'+cookies[0].domain,'publicToken').then(()=>{
          BrowserWindow.getAllWindows().forEach((win)=>{win.close();});
          login();
        });
      })
      .catch((error) => {
        console.log('ee: '+error)
      })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

updateElectronApp({
  updateSource: {
    type: UpdateSourceType.StaticStorage,
    baseUrl: `https://persys.s3.us-east-1.amazonaws.com/persys-client/updates/${process.platform}/${process.arch}`
  }
});