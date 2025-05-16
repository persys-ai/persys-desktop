let body=E.fetch('tagName','body')[0];
let currentPath='';

class HomeInterface extends I {
    static home() {
        I.containers();
        let id='home';
        if(!E.get(id)) {
            let home=E.div(body,'container',id);

            E.div(home,'','homeBox');
            HomeInterface.grid();
            //
            let settings=E.div(E.div(E.get('homeBox'),'','settingsSection'),'','settingsBox');
            E.button(settings,'settingsTrigger','settingsTrigger','<i class="fa-solid fa-gear"></i>').onclick=()=>{
                persys.options({app:'home',option:'settings'});
            };
            E.img(settings,'','deviceTrigger','device.png').onclick=()=>{
                persys.monitor();
            };
            E.button(settings,'settingsTrigger','logoutTrigger','<i class="fa-duotone fa-solid fa-person-to-door"></i>').onclick=(e)=>{
                I.confirmFloater(e,(c)=>{
                    if(c) {
                        A.r('POST','/sessions/logout',{},(error,data)=>{
                            if(!error) persys.logout();
                            else I.error(error);
                        });
                    }
                });
            };
            //
            HomeInterface.prompt();
            //
            E.get('mobileCover').style.backgroundImage="url('"+apiUrl+"/wallpapers/current/?publicToken="+publicToken+"')";
            E.get('mobileCover').style.backgroundSize='cover';
            E.get('mobileCover').style.backgroundRepeat='no-repeat';
        }
        E.get(id).style.display='block';
    };
    static grid() {
        if(!E.get('homeGrid')) {
            let homeGrid=E.div(E.get('homeBox'),'','homeGrid');
            let tiles=[
                {id:'files',name:'Files',icon:'<i class="fa-duotone fa-solid fa-folder-open"></i>'},
                {id:'chat',name:'Chat',icon:'<i class="fa-duotone fa-solid fa-comments"></i>'},
                {id:'gallery',name:'Gallery',icon:'<i class="fa-duotone fa-solid fa-image"></i>'},
                {id:'cinema',name:'Cinema',icon:'<i class="fa-duotone fa-solid fa-film"></i>'},
                {id:'paper',name:'Paper',icon:'<i class="fa-duotone fa-solid fa-file-invoice"></i>'},
                {id:'music',name:'Music',icon:'<i class="fa-duotone fa-solid fa-music"></i>'},
                {id:'library',name:'Library',icon:'<i class="fa-duotone fa-solid fa-books"></i>'},
                {id:'todo',name:'ToDo',icon:'<i class="fa-duotone fa-solid fa-list"></i>'},
                {id:'cardclip',name:'CardClip',icon:'<i class="fa-duotone fa-solid fa-address-card"></i>'},
            ];

            tiles.forEach((tile)=>{
                let tileBox=E.div(homeGrid,'homeGridTile','');
                E.div(tileBox,'homeGridTileIcon','').innerHTML=tile.icon;
                E.div(tileBox,'homeGridTileName','').innerHTML=tile.name;
                tileBox.onclick=()=>{
                    deactivateGridItems(tileBox);
                };
                tileBox.addEventListener("dblclick", (e) => {
                    e.preventDefault();
                    if(tile.id==='files') persys.files();
                    else if(tile.id==='chat') persys.chat({});
                    else if(tile.id==='music') persys.player();
                    else if(tile.id==='gallery') persys.gallery({});
                    else if(tile.id==='cinema') persys.cinema({});
                    else if(tile.id==='paper') persys.paper({});
                    else if(tile.id==='library') persys.library({});
                    else if(tile.id==='todo') persys.todo({});
                    else if(tile.id==='cardclip') persys.cardclip({});
                });
            });

            function deactivateGridItems(f) {
                let items=E.fetch('className','homeGridTile');
                if(items && items.length>0) {
                    for(let i=0;i<items.length;i++) {
                        items[i].className='homeGridTile';
                    }
                }
                if(f) f.className='homeGridTile homeGridTileActive';
            };
        }
    };
    static prompt() {
        if(!E.get('promptBox')) {
            let box=E.div(E.get('homeBox'),'','promptBox');
            let table=E.table(box,'','','center','100%');
            let tr=E.tableR(table);
            let field=E.input(E.tableC(tr,'90%'),'text','','promptField',"What's on your mind?");
            let button=E.button(E.tableC(tr,'10%'),'','promptButton','<i class="fa-solid fa-arrow-up"></i>');
            field.onkeydown=(e)=>{
                if(e.keyCode===13) send();
            };
            button.onclick=()=>{
                send();
            };
            function send() {
                persys.chat({input:field.value});
                field.value='';
            };
        }
    };
}

document.addEventListener('click',(e)=>{
    if(e.target.className.split(' ').indexOf('optionsSettingsThumbSmall')===-1 && e.target.className.split(' ').indexOf('paperContextMenuItem')===-1 && e.target.tagName.toLowerCase()!=='textarea' && e.target.tagName.toLowerCase()!=='button' && e.target.className.split('-').indexOf('fa')===-1 && e.target.className.split(' ').indexOf('chatSessionOptions')===-1 && e.target.className.split(' ').indexOf('floaterMenuButton')===-1 && e.target.tagName.toLowerCase()!=='button' && e.target.tagName.toLowerCase()!=='input' && e.target.className.split(' ').indexOf('menuItems')===-1 && e.target.className!=='gridItem' && e.target.className!=='gridItemFolderIcon' && e.target.className!=='gridItemFileIcon' && e.target.className!=='gridItemName' && e.target.className!=='actionButton' && e.target.className!=='switch' && e.target.className!=='slider' && e.target.className!=='floaterMenuItem') {
        I.hideFloaters();
    }
});