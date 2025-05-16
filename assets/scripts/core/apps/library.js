let librarySidebar=1;
class LibraryInterface extends I{
    static library(file) {
        let library=E.div(body,'','page_Library');
        let list=E.div(library,'','libraryList');
        let reader=E.div(library,'','libraryReader');

        let ragPage=E.select(library,'','libraryRagPageSelect',[]);
        let rag=E.div(library,'','librarySidebarRagButton');
        rag.innerHTML=ragIcon;
        rag.onclick=(e)=>{
            // saved for later, rag for selected text instead of entire page, needs to add auto copy to clipboard since its on a foreign pdf object
            /*
            async function read() {
                let d=await navigator.clipboard.readText();
                let documents=d.split('. ');
                if(documents && documents.length>0) {
                    let ragArray=[];
                    for(let i=0;i<documents.length;i++) {
                        ragArray.push(documents[i]);
                    }
                    I.rag(rag,activeFileName,'',ragArray);
                }
                else I.error('Select more text.');
            }
            read();
             */
            rag.innerHTML='';
            E.img(rag,'ragLoader','','loading2.gif');
            A.r('POST','/library/extract',{name:activeFile.name,path:activeFile.path,page:ragPage.value},(error,data)=>{
                rag.innerHTML=ragIcon;
                if(!error) {
                    if(data) {
                        // used previously, chunking by period
                        //let documents=data.split('. ');
                        // chunking by text count
                        let documents=data.match(/.{1,500}/g);
                        if(documents && documents.length>0) {
                            let ragArray=[];
                            for(let i=0;i<documents.length;i++) {
                                if(documents[i]) ragArray.push(documents[i]);
                            }
                            I.rag(rag,activeFile.name+'_page_'+ragPage.value,'',ragArray);
                        }
                        else I.error('More context needed.');
                    }
                }
                else I.error(error);
            });
        };

        let toggle=E.button(body,'','librarySidebarToggle','<i class="fa-light fa-sidebar"></i>');
        toggle.onclick=()=>{
            switch(librarySidebar) {
                case 1:
                    persys.closeSidebar();
                    list.style.display='none';
                    reader.style.left='0';
                    toggle.style.left='100px';
                    librarySidebar=0;
                    break;
                case 0:
                    persys.openSidebar();
                    list.style.display='block';
                    reader.style.left='250px';
                    toggle.style.left='200px';
                    librarySidebar=1;
                    break;
            }
        };

        let activeFile;
        let listActions=E.div(list,'','libraryListActions');
        let search=E.input(listActions,'search','','libraryListSearch','Search library');
        let listTable=E.table(list,'','libraryListTable','center','90%');
        A.r('POST','/files/list-objects',{type:['.pdf']},(error,data)=>{
            if(!error) {
                if(data && data.length>0) {
                    data.forEach((dataItem)=>{
                        let tr=E.tableR(listTable);
                        let name=E.div(E.tableC(tr,''),'libraryListItem','');
                        name.innerHTML=dataItem.name;
                        tr.onclick=()=>{
                            activeFile=dataItem;
                            A.r('POST','/library/pages',activeFile,(error,data)=>{
                                if(!error) {
                                    ragPage.innerHTML='';
                                    for(let j=1;j<=parseInt(data);j++) {
                                        E.option(ragPage,j,'Page: '+j);
                                    }
                                }
                                else I.error(error);
                            })
                            for(let i=0;i<listTable.rows.length;i++) {
                                listTable.rows[i].style.background='transparent';
                            }
                            tr.style.background='#434343';
                            showReader({name:dataItem.name,mime:dataItem.mime,url:apiUrl+'/files/stream/?publicToken='+publicToken+'&fileName='+encodeURIComponent(dataItem.name)+'&fullPath='+encodeURIComponent(dataItem.path)});
                        };
                    });
                    search.onkeydown=()=>{
                        I.searchTable(listTable,search.value);
                    };
                }
            }
            else I.error(error);
        });

        function showReader(file) {
            reader.innerHTML='';
            let pdf=E.object(reader,'','readerReaderFile',file.url);
            //reader.innerHTML='<iframe src="'+file.url+'" width="100%" height="100%" class="readerReaderFile"></iframe>';
        }

        if(file.name) {
            showReader(file);
        }
    };

    static libraryOptions(e,fileName,selectedText) {
        e.preventDefault();
        I.hideFloaters();
        let p=e.target.getBoundingClientRect();
        let m=E.div(body,'floaterMenu','');
        m.style.top=p.top+window.scrollY+20+'px';
        m.style.left=p.left+window.scrollX+20+'px';
        let t=E.table(m,'floaterMenuTable','','center','100%');
        //
        let chatTr=E.tableR(t);
        let chat=E.div(E.tableC(chatTr,''),'floaterMenuItem','');
        chat.innerHTML='Ask...';
        chat.onclick=()=>{
            let documents=selectedText.split('. ');
            if(documents && documents.length>0) {
                let ragArray=[];
                for(let i=0;i<documents.length;i++) {
                    ragArray.push(documents[i]);
                }
                I.rag(chat,fileName,'',ragArray);
            }
            else I.error('Select more text.');
        }
    };
}