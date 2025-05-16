let playerShuffle=false;
let playerRepeat=false;
class PlayerInterface extends I {
    static player(media) {
        let player=E.div(body,'','page_Player');

        let rag=E.div(player,'','playerRagButton');
        rag.innerHTML=ragIcon;
        rag.onclick=()=>{
            if(playlistData && playlistData.length>0) {
                //
                /*
                let songs=[];
                for(let i=0;i<playlistData.length;i++) {
                    songs.push(playlistData[i].name);
                }
                const ragArray=songs.map((song,i)=>{
                    let s=i*10;
                    let e=Math.min(s+10,songs.length);
                    return "This is my music, a list of songs I listen to. "+songs.slice(s,e).join('; ');
                });
                 */
                //
                let ragArray=[];
                for(let i=0;i<playlistData.length;i++) {
                    ragArray.push('This is a song I listen to: '+playlistData[i].name);
                }
                I.rag(rag,'App_Player','',ragArray);
            }
            else I.error('Upload audio files first.');
        };

        let music=E.div(player,'','nowPlaying');
        let audio=E.audio(music,'','nowPlayingFile','','');
        audio.style.display='none';
        //
        let info=E.div(music,'','nowPlayingInfo');
        let infoText=E.div(info,'','nowPlayingInfoText');
        E.div(infoText,'','nowPlayingInfoTextTitle').innerHTML='Now Playing';
        //E.div(infoText,'','nowPlayingInfoTextArtist').innerHTML='Artist';
        //
        let controls=E.div(music,'','nowPlayingControls');
        let controlsTable=E.table(controls,'','','center','100%');
        let controlsRow=E.tableR(controlsTable);
        let shuffle=E.div(E.tableC(controlsRow,'20%'),'nowPlayingControl nowPlayingControlMin','nowPlayingControlShuffle');
        shuffle.innerHTML='<i class="fa-solid fa-shuffle"></i>';
        let prev=E.div(E.tableC(controlsRow,'20%'),'nowPlayingControl nowPlayingControlMain','nowPlayingControlPrev');
        prev.innerHTML='<i class="fa-solid fa-backward-step"></i>';
        let play=E.div(E.tableC(controlsRow,'20%'),'nowPlayingControl nowPlayingControlPlay','nowPlayingControlPlay');
        play.innerHTML='<i class="fa-solid fa-play"></i>';
        let next=E.div(E.tableC(controlsRow,'20%'),'nowPlayingControl nowPlayingControlMain','nowPlayingControlNext');
        next.innerHTML='<i class="fa-solid fa-forward-step"></i>';
        let repeat=E.div(E.tableC(controlsRow,'20%'),'nowPlayingControl nowPlayingControlMin','nowPlayingControlRepeat');
        repeat.innerHTML='<i class="fa-solid fa-repeat"></i>';
        //
        let progress=E.div(music,'','nowPlayingProgress');
        E.slider(progress,'','nowPlayingProgressRange');
        E.div(progress,'nowPlayingProgressTicks','nowPlayingProgressTickStart').innerHTML='0:00';
        E.div(progress,'nowPlayingProgressTicks','nowPlayingProgressTickStop').innerHTML='0:00';
        //
        //
        let playlist=E.div(player,'','musicPlaylist');
        let search=E.input(E.div(playlist,'full center',''),'search','','musicPlaylistSearch','Search');
        let playlistTable=E.table(playlist,'','musicPlaylistTable','center','90%');
        let playlistData=[];
        A.r('POST','/files/list-objects',{type:['.mp3']},(error,data)=>{
            if(!error) {
                if(data && data.length>0) {
                    data.forEach((dataItem)=>{
                        let tr=E.tableR(playlistTable);
                        let icon=E.div(E.tableC(tr,'15px'),'musicPlaylistItem','');
                        icon.innerHTML='<i class="fa-solid fa-music"></i>';
                        let name=E.div(E.tableC(tr,''),'musicPlaylistItem','');
                        name.innerHTML=T.s(dataItem.name,25);
                        tr.addEventListener("dblclick", (e) => {
                            e.preventDefault();
                            nowPlaying({name:dataItem.name,mime:dataItem.mime,url:apiUrl+'/files/stream/?publicToken='+publicToken+'&fileName='+encodeURIComponent(dataItem.name)+'&fullPath='+encodeURIComponent(dataItem.path)})
                            audio.play();
                            for(let i=0;i<playlistTable.rows.length;i++) {
                                playlistTable.rows[i].style.background='transparent';
                            }
                            tr.style.background='#434343';
                        });
                        playlistData.push({name:dataItem.name,mime:dataItem.mime,url:apiUrl+'/files/stream/?publicToken='+publicToken+'&fileName='+encodeURIComponent(dataItem.name)+'&fullPath='+encodeURIComponent(dataItem.path)});
                    });
                    search.onkeydown=()=>{
                        I.searchTable(playlistTable,search.value);
                    };
                }
            }
            else I.error(error);
        });

        //

        function nowPlaying(file) {
            let audio=E.get('nowPlayingFile');
            audio.src=file.url;
            audio.type=file.mime;
            E.get('nowPlayingInfoTextTitle').innerHTML=T.s(file.name,25);
            E.get('nowPlayingControlPlay').onclick=()=>{
                if(audio.paused) {
                    audio.play();
                    E.get('nowPlayingControlPlay').innerHTML='<i class="fa-solid fa-pause"></i>';
                    setTimeout(()=>{
                        E.get('nowPlayingProgressTickStop').innerHTML=H.audioTime(audio.duration);
                        E.get('nowPlayingProgressRange').min=0;
                        E.get('nowPlayingProgressRange').max=audio.duration;
                    },2000);
                }
                else {
                    audio.pause();
                    E.get('nowPlayingControlPlay').innerHTML='<i class="fa-solid fa-play"></i>';
                }
            };
            E.get('nowPlayingControlPlay').click();
            audio.addEventListener("ended",()=>{
                audio.currentTime=0;
                if(playlistData.findIndex(x=>x.name===file.name)===playlistData.length-1) {
                    audio.pause();
                    E.get('nowPlayingControlPlay').innerHTML='<i class="fa-solid fa-play"></i>';
                }
                else {
                    if(playerRepeat) nowPlaying(playlistData[playlistData.findIndex(x=>x.name===file.name)]);
                    else if(playerShuffle) nowPlaying(playlistData[Math.floor(Math.random()*playlistData.length-1)]);
                    else nowPlaying(playlistData[playlistData.findIndex(x=>x.name===file.name)+1]);
                }
            });
            audio.addEventListener("timeupdate",()=>{
                E.get('nowPlayingProgressTickStart').innerHTML=H.audioTime(audio.currentTime);
                E.get('nowPlayingProgressRange').value=audio.currentTime;
            });
            audio.addEventListener("pause",()=>{
                E.get('nowPlayingControlPlay').innerHTML='<i class="fa-solid fa-play"></i>';
            });
            audio.addEventListener("play",()=>{
                E.get('nowPlayingControlPlay').innerHTML='<i class="fa-solid fa-pause"></i>';
            });
            E.get('nowPlayingProgressRange').onchange=()=>{
                audio.onseeked=()=>{
                    audio.currentTime=E.get('nowPlayingProgressRange').value;
                };
            };
            //
            E.get('nowPlayingControlShuffle').onclick=()=>{
                switch(playerShuffle) {
                    case false:
                        E.get('nowPlayingControlShuffle').style.background='#86B5B5';
                        E.get('nowPlayingControlShuffle').style.color='#222222';
                        playerShuffle=true;
                        break;
                    case true:
                        E.get('nowPlayingControlShuffle').style.background='transparent';
                        E.get('nowPlayingControlShuffle').style.color='#FFF';
                        playerShuffle=false;
                        break;
                }
            };
            E.get('nowPlayingControlRepeat').onclick=()=>{
                switch(playerRepeat) {
                    case false:
                        E.get('nowPlayingControlRepeat').style.background='#86B5B5';
                        E.get('nowPlayingControlRepeat').style.color='#222222';
                        playerRepeat=true;
                        break;
                    case true:
                        E.get('nowPlayingControlRepeat').style.background='transparent';
                        E.get('nowPlayingControlRepeat').style.color='#FFF';
                        playerRepeat=false;
                        break;
                }
            };
            //
            E.get('nowPlayingControlNext').onclick=()=>{
                if(playerShuffle) nowPlaying(playlistData[Math.floor(Math.random()*playlistData.length-1)]);
                else {
                    if(playlistData.findIndex(x=>x.name===file.name)===playlistData.length-1) nowPlaying(playlistData[0]);
                    else nowPlaying(playlistData[playlistData.findIndex(x=>x.name===file.name)+1]);
                }
            };
            E.get('nowPlayingControlPrev').onclick=()=>{
                if(audio.currentTime>3) nowPlaying(playlistData[playlistData.findIndex(x=>x.name===file.name)]);
                else {
                    if(playerShuffle) nowPlaying(playlistData[Math.floor(Math.random()*playlistData.length-1)]);
                    else {
                        if(playlistData.findIndex(x=>x.name===file.name)===0) nowPlaying(playlistData[playlistData.length-1]);
                        else nowPlaying(playlistData[playlistData.findIndex(x=>x.name===file.name)-1]);
                    }
                }
            }
        }
        if(media) {
            nowPlaying({name:media.file.name,mime:media.file.mime,url:media.url})
        }
    };
}