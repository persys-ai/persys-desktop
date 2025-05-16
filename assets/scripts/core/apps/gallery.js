class GalleryInterface extends I {
    static gallery(image) {
        let gallery=E.div(body,'','gallery')
        let actions=E.div(gallery,'','galleryGridActions');
        let grid=E.div(gallery,'','galleryGrid');
        let focus=E.div(gallery,'','galleryFocus');

        let search=E.input(actions,'search','','galleryGridActionsSearch','Search gallery');

        A.r('POST','/files/list-objects',{type:['.png','.jpg','.jpeg']},(error,data)=>{
            if(!error) {
                if(data && data.length>0) {
                    data.forEach((dataItem)=>{
                        let imgUrl=apiUrl+'/files/stream/?publicToken='+publicToken+'&fileName='+encodeURIComponent(dataItem.name)+'&fullPath='+encodeURIComponent(dataItem.path);
                        let tile=E.div(grid,'galleryGridTile','');
                        let img=E.img(tile,'galleryGridTileThumb','',imgUrl);
                        let name=E.div(tile,'galleryGridTileName','');
                        name.innerHTML=T.s(dataItem.name,15);
                        tile.onclick=()=>{
                            focusImage({name:dataItem.name,url:imgUrl,path:dataItem.path});
                        };
                    });
                    search.onkeydown=()=>{
                        I.searchBox(grid,'galleryGridTile',search.value);
                    };
                }
            }
            else I.error(error);
        });

        function focusImage(image) {
            if(!E.get('galleryFocusBox')) {
                let focusedBox=E.div(focus,'','galleryFocusBox');
                E.img(focusedBox,'','galleryFocusImage','');

                let focusActions=E.div(focus,'','galleryFocusActions');
                E.div(focusActions,'','galleryFocusName');
            }
            E.get('galleryFocusImage').src=image.url;
            E.get('galleryFocusName').innerHTML=image.name;
            //
            E.get('galleryFocusImage').style.maxWidth=window.innerWidth-300+'px';
            E.get('galleryFocusImage').style.maxHeight=window.innerHeight-100+'px';
            //
            //E.get('galleryFocusBox').style.height=window.innerHeight-100+'px';
            window.onresize=()=>{
                E.get('galleryFocusImage').style.maxWidth=window.innerWidth-300+'px';
                E.get('galleryFocusImage').style.maxHeight=window.innerHeight-100+'px';
                //E.get('galleryFocusBox').style.bottom=window.innerHeight-100+'px';
            };
        };
        if(image.name) focusImage(image);
    };
}