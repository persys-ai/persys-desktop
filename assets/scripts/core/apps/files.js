let postContent={
    title:'',
    body:[]
};
let lastBlogPostSave='';
let focusedCellId='';

class FilesInterface extends I {
    static files() {
        I.containers();
        let id='files';
        if(!E.get(id)) {
            let gridBox=E.div(body,'container','files');
            let gridBoxActions=E.div(gridBox,'','gridBoxActions');
            E.div(E.div(gridBoxActions,'float-left',''),'sectionTitle','').innerHTML='Files';
            let right=E.div(gridBoxActions,'float-right flex','');
            let search=E.input(right,'search','','searchField','Search files');
            let newFolderButton=E.button(right,'actionButton','newFolder','<i class="fa-solid fa-folder-plus"></i>');
            let uploadButton=E.button(right,'actionButton','uploadFile','<i class="fa-solid fa-upload"></i>');
            let composeFile=E.button(right,'actionButton','composeFile','<i class="fa-solid fa-file-plus"></i>');
            let filesBox=E.div(gridBox,'','gridFilesBox');
            let pathIndicator=E.div(filesBox,'','pathIndicator');
            let filesGrid=E.div(filesBox,'','filesGrid');
            //
            newFolderButton.onclick=(e)=>{
                FilesInterface.newFolder(e,()=>{
                    showFiles(currentPath);
                });
            };
            uploadButton.onclick=()=>{
                let f=E.file(gridBox,'','');
                f.multiple=true;
                f.click();
                f.onchange=()=>{
                    for(let i=0;i<f.files.length;i++) {
                        upload(f.files[i]);
                    }
                };
            };
            composeFile.onclick=(e)=>{
                persys.plaintext({path:currentPath});
            };

            function showFiles(path='/') {
                pathIndicator.innerHTML='';
                let base=E.span(pathIndicator,'pathIndicatorFolder','');
                base.innerHTML='<i class="fa-light fa-house"></i>';
                base.onclick=()=>{
                    currentPath='';
                    showFiles('/');
                };
                E.span(pathIndicator,'','').innerHTML=' / ';
                if(currentPath.split('/').length>1) {
                    for(let i=1;i<currentPath.split('/').length;i++) {
                        let pathFolder=E.span(pathIndicator,'pathIndicatorFolder','');
                        pathFolder.innerHTML=currentPath.split('/')[i];
                        pathFolder.onclick=()=>{
                            let buildPath='';
                            for(let j=1;j<=i;j++) {
                                buildPath=buildPath+'/'+currentPath.split('/')[j];
                            }
                            currentPath=buildPath;
                            showFiles(buildPath);
                        };
                        E.span(pathIndicator,'','').innerHTML=' / ';
                    }
                }
                filesGrid.innerHTML='';
                A.r('POST','/files/get', {path:path},(error,data)=>{
                    if(!error) {
                        if(data && data.length>0) {
                            data.forEach(file => {
                                let f=E.div(filesGrid,'gridItem','');
                                f.setAttribute('unselectable','on');
                                if(file.isDirectory) E.div(f,'gridItemFolderIcon','').innerHTML='<i class="fa-duotone fa-solid fa-folder-open"></i>';
                                else {
                                    if(['mov','mp4','avi'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) E.div(f,'gridItemFileIcon','').innerHTML='<i class="fa-duotone fa-solid fa-film"></i>';
                                    else if(['png','jpeg','jpg','gif'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) {
                                        //E.div(f,'gridItemFileIcon','').innerHTML='<i class="fa-duotone fa-solid fa-image"></i>';
                                        E.img(f,'gridItemThumb','',apiUrl+'/files/stream/?publicToken='+publicToken+'&fileName='+encodeURIComponent(file.name)+'&path='+encodeURIComponent(currentPath));
                                    }
                                    else if(['mp3','wav'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) E.div(f,'gridItemFileIcon','').innerHTML='<i class="fa-duotone fa-solid fa-list-music"></i>';
                                    else if(['m4a'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) E.div(f,'gridItemFileIcon','').innerHTML='<i class="fa-duotone fa-solid fa-waveform-lines"></i>';
                                    else if(['pdf'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) E.div(f,'gridItemFileIcon','').innerHTML='<i class="fa-duotone fa-solid fa-file-pdf"></i>';
                                    else if(['doc','docx'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) E.div(f,'gridItemFileIcon','').innerHTML='<i class="fa-duotone fa-solid fa-file-doc"></i>';
                                    else if(['xls','xlsx'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) E.div(f,'gridItemFileIcon','').innerHTML='<i class="fa-duotone fa-solid fa-file-xls"></i>';
                                    else if(['ppt'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) E.div(f,'gridItemFileIcon','').innerHTML='<i class="fa-duotone fa-solid fa-file-ppt"></i>';
                                    else if(['paper'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) E.div(f,'gridItemFileIcon','').innerHTML='<i class="fa-duotone fa-solid fa-file-invoice"></i>';
                                    else E.div(f,'gridItemFileIcon','').innerHTML='<i class="fa-duotone fa-solid fa-file"></i>';
                                }
                                //
                                //E.img(f,'gridItemThumb','',filesDir+'/'+file);
                                E.div(f,'gridItemName','').innerHTML=T.s(file.name,20);
                                f.onclick=()=>{
                                    deactivateGridItems(f);
                                };
                                f.addEventListener("dblclick", (e) => {
                                    e.preventDefault();
                                    if(file.isDirectory) {
                                        currentPath=currentPath+'/'+file.name;
                                        showFiles(currentPath)
                                    }
                                    else {
                                        if(['md','txt','csv','json'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) persys.plaintext({file:file,path:currentPath});
                                        else if(['mp3','wav'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) persys.player({url:apiUrl+'/files/stream/?publicToken='+publicToken+'&fileName='+encodeURIComponent(file.name)+'&path='+encodeURIComponent(currentPath),file:file});
                                        else if(['png','jpg','jpeg','gif'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) persys.gallery({name:file.name,path:currentPath,url:apiUrl+'/files/stream/?publicToken='+publicToken+'&fileName='+encodeURIComponent(file.name)+'&path='+encodeURIComponent(currentPath)});
                                        else if(['mp4','mov','avi'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) persys.cinema({name:file.name,mime:file.mime,path:currentPath,url:apiUrl+'/files/stream/?publicToken='+publicToken+'&fileName='+encodeURIComponent(file.name)+'&path='+encodeURIComponent(currentPath)});
                                        else if(['paper'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) persys.paper({name:file.name,mime:file.mime,path:currentPath,url:apiUrl+'/files/stream/?publicToken='+publicToken+'&fileName='+encodeURIComponent(file.name)+'&path='+encodeURIComponent(currentPath)});
                                        else if(['pdf'].indexOf(file.name.split('.')[file.name.split('.').length-1].toLowerCase())>-1) persys.library({name:file.name,mime:file.mime,path:currentPath,url:apiUrl+'/files/stream/?publicToken='+publicToken+'&fileName='+encodeURIComponent(file.name)+'&path='+encodeURIComponent(currentPath)});
                                    }
                                });
                                f.addEventListener('contextmenu', (e)=> {
                                    deactivateGridItems(f);
                                    FilesInterface.fileOptions(e,file,(newData,action)=>{
                                        if(action==='renamed' || action==='deleted') showFiles(currentPath);
                                    });
                                });
                            });
                            E.get('searchField').onkeyup=()=>{
                                I.search(gridBox,E.get('searchField').value);
                            };
                        }
                    }
                    else alert(error);
                });
                function deactivateGridItems(f) {
                    let items=E.fetch('className','gridItem');
                    if(items && items.length>0) {
                        for(let i=0;i<items.length;i++) {
                            items[i].className='gridItem';
                        }
                    }
                    if(f) f.className='gridItem gridItemActive';
                }
            };
            showFiles(currentPath);
            function upload(f) {
                let form=new FormData();
                form.append('fileName',f.name);
                form.append('path',currentPath);
                form.append('file',f);
                A2.r('POST','/files/upload',form,(error,data)=>{
                    if(!error) {
                        showFiles(currentPath);
                    }
                    else I.error(error);
                });
            };
            //
            let defStyle=gridBox.style.border
            document.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                gridBox.style.border='1px solid #86B5B5';
            });

            document.addEventListener('drop', (event) => {
                event.preventDefault();
                event.stopPropagation();
                gridBox.style.border=defStyle;

                for(const f of event.dataTransfer.files) {
                    upload(f);
                }
            });
        }
        E.get(id).style.display='block';

    };

    static newFolder(e,callback) {
        I.hideFloaters();
        let p=e.target.getBoundingClientRect();
        let m=E.div(body,'floaterMenu','');
        m.style.top=p.top+window.scrollY+20+'px';
        m.style.left=p.left+window.scrollX-120+'px';
        let t=E.table(m,'','','center','100%');
        let fileName=E.input(E.tableC(E.tableR(t),''),'text','floaterInputField','','Folder name');
        let button=E.button(E.tableC(E.tableR(t),''),'floaterInputButton','','Create');
        button.onclick=()=>{
            A.r('POST','/files/new-folder',{folderName:fileName.value,path:currentPath},(error,data)=>{
                if(!error) {
                    I.hideFloaters();
                    callback(data);
                }
                else I.error(error);
            });
        };
    };
    static fileOptions(e,file,callback) {
        e.preventDefault();
        I.hideFloaters();
        let p=e.target.getBoundingClientRect();
        let m=E.div(body,'floaterMenu','');
        m.style.top=p.top+window.scrollY+20+'px';
        m.style.left=p.left+window.scrollX+20+'px';
        let t=E.table(m,'floaterMenuTable','','center','100%');

        let downloadTr=E.tableR(t);
        let download=E.div(E.tableC(downloadTr,''),'floaterMenuItem','');
        download.innerHTML='Download';
        download.onclick=()=>{
            window.open(apiUrl+'/files/download/?publicToken='+publicToken+'&fileName='+encodeURIComponent(file.name)+'&path='+encodeURIComponent(currentPath),'_blank');
        };
        //
        let renameTr=E.tableR(t);
        let rename=E.div(E.tableC(renameTr,''),'floaterMenuItem','');
        rename.innerHTML='Rename';
        rename.onclick=()=>{
            I.hideFloaters();
            let p=e.target.getBoundingClientRect();
            let m=E.div(body,'floaterMenu','');
            m.style.top=p.top+window.scrollY+20+'px';
            m.style.left=p.left+window.scrollX+20+'px';
            let t=E.table(m,'','','center','100%');
            let fileName=E.input(E.tableC(E.tableR(t),''),'text','floaterInputField','','Name');
            fileName.value=file.name;
            let button=E.button(E.tableC(E.tableR(t),''),'floaterInputButton','','Rename');
            button.onclick=()=>{
                send();
            };
            fileName.onkeydown=(e)=>{
                if(e.keyCode===13) send();
            };
            function send() {
                A.r('POST','/files/rename',{file:file,path:currentPath,newName:fileName.value},(error,data)=>{
                    if(!error) {
                        I.hideFloaters();
                        callback(data,'renamed');
                    }
                    else I.error(error);
                });
            };
        }
        //
        let removeTr=E.tableR(t);
        let remove=E.div(E.tableC(removeTr,''),'floaterMenuItem','');
        remove.innerHTML='Delete';
        remove.onclick=(e)=>{
            I.confirmFloater(e,(c)=>{
                if(c) {
                    A.r('POST','/files/delete',{file:file,path:currentPath},(error,data)=>{
                        if(!error) {
                            I.hideFloaters();
                            callback({},'deleted');
                        }
                        else I.error(error);
                    });
                }
            });
        };
    };

    //
}