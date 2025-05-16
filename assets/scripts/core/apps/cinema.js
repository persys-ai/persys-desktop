class CinemaInterface extends I {
    static cinema(video) {
        let cinema=E.div(body,'','cinema')
        let grid=E.div(cinema,'','cinemaGrid');
        let focus=E.div(cinema,'','cinemaFocus');

        let actions=E.div(grid,'','cinemaGridActions');
        let search=E.input(actions,'search','','cinemaGridActionsSearch','Search cinema');

        let tiles=E.div(grid,'','cinemaGridTiles');
        A.r('POST','/files/list-objects',{type:['.mp4','.mov','.avi']},(error,data)=>{
            if(!error) {
                if(data && data.length>0) {
                    data.forEach((dataItem)=>{
                        let videoUrl=apiUrl+'/files/stream/?publicToken='+publicToken+'&fileName='+encodeURIComponent(dataItem.name)+'&fullPath='+encodeURIComponent(dataItem.path);
                        let videoMime=data.mime;
                        let tile=E.div(tiles,'cinemaGridTile','');
                        let video=E.video(tile,'cinemaGridTileThumb','',videoUrl,videoMime);
                        video.controls=false;
                        let name=E.div(tile,'cinemaGridTileName','');
                        name.innerHTML=T.s(dataItem.name,13);
                        tile.onclick=()=>{
                            focusVideo({name:dataItem.name,url:videoUrl,mime:videoMime,path:dataItem.path});
                        };
                    });
                    search.onkeydown=()=>{
                        I.searchBox(tiles,'cinemaGridTile',search.value);
                    };
                }
            }
            else I.error(error);
        });

        function focusVideo(video) {
            if(!E.get('cinemaFocusBox')) {
                let focusedBox=E.div(focus,'','cinemaFocusBox');
                E.video(focusedBox,'','cinemaFocusVideo','','');

                let focusActions=E.div(focus,'','cinemaFocusActions');
                E.div(focusActions,'','cinemaFocusName');
            }
            E.get('cinemaFocusVideo').src=video.url;
            E.get('cinemaFocusVideo').mime=video.mime;
            E.get('cinemaFocusName').innerHTML=video.name;
            //
            E.get('cinemaFocusVideo').style.maxWidth=window.innerWidth-300+'px';
            E.get('cinemaFocusVideo').style.maxHeight=window.innerHeight-100+'px';
            //
            //E.get('cinemaFocusBox').style.height=window.innerHeight-100+'px';
            window.onresize=()=>{
                E.get('cinemaFocusVideo').style.maxWidth=window.innerWidth-300+'px';
                E.get('cinemaFocusVideo').style.maxHeight=window.innerHeight-100+'px';
                //E.get('cinemaFocusBox').style.bottom=window.innerHeight-100+'px';
            };
        };
        if(video.name) focusVideo(video);
    };
}