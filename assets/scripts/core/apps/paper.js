let paperSidebar=1;
let paperContent={
    metadata:{
        embedded:false
    },
    body:[]
};
let lastPaperSave='';

class PaperInterface extends I {
    static paper(file) {
        let paper=E.div(body,'','page_Paper');
        let list=E.div(paper,'','paperList');
        let composer=E.div(paper,'','paperComposer');

        let toggle=E.button(body,'','paperSidebarToggle','<i class="fa-light fa-sidebar"></i>');
        toggle.onclick=()=>{
            switch(paperSidebar) {
                case 1:
                    persys.closeSidebar();
                    list.style.display='none';
                    composer.style.left='0';
                    toggle.style.left='100px';
                    paperSidebar=0;
                    break;
                case 0:
                    persys.openSidebar();
                    list.style.display='block';
                    composer.style.left='250px';
                    toggle.style.left='200px';
                    paperSidebar=1;
                    break;
            }
        };

        let rag=E.div(paper,'','paperRagButton');
        rag.innerHTML=ragIcon;
        rag.onclick=()=>{
            if(paperContent.body && paperContent.body.length>0) {
                let ragArray=[];
                for(let i=0;i<paperContent.body.length;i++) {
                    if(['title','heading','subheading','paragraph','quote'].indexOf(paperContent.body[i].type)>-1) {
                        if(paperContent.body[i].type==='title') ragArray.push('Title: '+paperContent.body[i].content);
                        else if(paperContent.body[i].type==='heading') ragArray.push('Section: '+paperContent.body[i].content);
                        else if(paperContent.body[i].type==='subheading') ragArray.push('Sub-Section: '+paperContent.body[i].content);
                        else if(paperContent.body[i].type==='paragraph') ragArray.push('Paragraph: '+paperContent.body[i].content);
                        else if(paperContent.body[i].type==='quote') ragArray.push('Quote: '+paperContent.body[i].content);
                    }
                }
                I.rag(rag,fileName.value,'',ragArray);
            }
            else I.error('I need more information.');
        };

        let listActions=E.div(list,'','paperListActions');
        let search=E.input(listActions,'search','','paperListSearch','Search papers');
        //
        let listTable=E.table(list,'','paperListTable','center','90%');
        A.r('POST','/files/list-objects',{type:['.paper']},(error,data)=>{
            if(!error) {
                if(data && data.length>0) {
                    data.forEach((dataItem)=>{
                        let tr=E.tableR(listTable);
                        let p=E.div(E.tableC(tr,''),'paperListItem','');
                        p.innerHTML='<i class="fa-light fa-file-invoice"></i> '+T.s(dataItem.name,15);
                        p.onclick=()=>{
                            for(let i=0;i<listTable.rows.length;i++) {
                                listTable.rows[i].style.background='transparent';
                            }
                            tr.style.background='#434343';
                            show(dataItem);
                        };
                    });
                    search.onkeydown=()=>{
                        I.searchTable(listTable,search.value);
                    };
                }
            }
            else I.error(error);
        });

        let actionBox=E.div(composer,'flex','composerActionBox');
        let right=E.div(actionBox,'float-right flex','');
        let fileName=E.input(right,'text','','composerFileName','File name');
        let save=E.button(right,'composerActionButton composerActionButtonPrimary','','Save');
        //
        let editBox=E.div(composer,'','composerEditBox');
        let addTitle=E.button(editBox,'composerEditButton','','<i class="fa-solid fa-text"></i>');
        let addHeading=E.button(editBox,'composerEditButton','','<i class="fa-solid fa-h1"></i>');
        let addSubheading=E.button(editBox,'composerEditButton','','<i class="fa-solid fa-h2"></i>');
        let addParagraph=E.button(editBox,'composerEditButton','','<i class="fa-solid fa-paragraph"></i>');
        let addQuote=E.button(editBox,'composerEditButton','','<i class="fa-solid fa-quotes"></i>');
        let addImage=E.button(editBox,'composerEditButton','','<i class="fa-solid fa-image"></i>');
        let addVideo=E.button(editBox,'composerEditButton','','<i class="fa-solid fa-film"></i>');
        let addAudio=E.button(editBox,'composerEditButton','','<i class="fa-solid fa-waveform-lines"></i>');
        let addCode=E.button(editBox,'composerEditButton','','<i class="fa-solid fa-code"></i>');
        let addFormula=E.button(editBox,'composerEditButton','','<i class="fa-solid fa-sigma"></i>');
        //
        //
        let contentBox=E.div(composer,'','composerContentBox');
        //
        save.onclick=()=>{
            PaperInterface.save(fileName,(error,data)=>{
                if(!error) I.success('Paper saved.');
                else I.error(error);
            });
        };
        setInterval(()=>{
            if(fileName.value && md5(JSON.stringify(paperContent))!==md5(lastPaperSave)) {
                save.innerHTML='saving...';
                setTimeout(()=>{
                    PaperInterface.save(fileName,(error,data)=>{
                        save.innerHTML='Save';
                    });
                },2000);
            }
        },2000);
        //
        if(file.name) {
            show(file);
        }
        else {
            PaperInterface.title(contentBox,{id:'cell_'+Math.random(),type:'title',content:'Untitled Paper'});
            fileName.value='Untitled.paper';
        }
        //
        function show(file) {
            contentBox.innerHTML='';
            paperContent.body=[];
            fileName.value=file.name;
            A.r('POST','/paper/get',file,(error,data)=>{
                if(!error) {
                    PaperInterface.render(data,contentBox);
                }
                else I.error(error);
            });
        }
        //
        addTitle.onclick=()=>{
            PaperInterface.title(contentBox,{id:'cell_'+Math.random(),type:'title',content:'Title'});
        };
        addHeading.onclick=()=>{
            PaperInterface.heading(contentBox,{id:'cell_'+Math.random(),type:'heading',content:'Heading'});
        };
        addSubheading.onclick=()=>{
            PaperInterface.subheading(contentBox,{id:'cell_'+Math.random(),type:'subheading',content:'Sub-Heading'});
        };
        addParagraph.onclick=()=>{
            PaperInterface.paragraph(contentBox,{id:'cell_'+Math.random(),type:'paragraph',content:'Paragraph'});
        };
        addQuote.onclick=()=>{
            PaperInterface.quote(contentBox,{id:'cell_'+Math.random(),type:'quote',content:'Quote'});
        };
        addImage.onclick=()=>{
            let f=E.file(contentBox,'','');
            f.accept='image/*';
            f.click();
            f.onchange=()=>{
                let form=new FormData();
                form.append('fileName',f.files[0].name);
                form.append('file',f.files[0]);
                A2.r('POST','/paper/upload-asset',form,(error,data)=>{
                    if(!error) {
                        PaperInterface.image(contentBox,{id:'cell_'+Math.random(),type:'image',content:{fileName:data.fileName,fileMime:data.fileMime}});
                        contentBox.removeChild(f);
                    }
                    else I.error(error);
                });
            };
        };
        addAudio.onclick=()=>{
            let f=E.file(contentBox,'','');
            f.accept='audio/*';
            f.click();
            f.onchange=()=>{
                let form=new FormData();
                form.append('fileName',f.files[0].name);
                form.append('file',f.files[0]);
                A2.r('POST','/paper/upload-asset',form,(error,data)=>{
                    if(!error) {
                        PaperInterface.audio(contentBox,{id:'cell_'+Math.random(),type:'audio',content:{fileName:data.fileName,fileMime:data.fileMime}});
                        contentBox.removeChild(f);
                    }
                    else I.error(error);
                });
            };
        };
        addVideo.onclick=()=>{
            let f=E.file(contentBox,'','');
            f.accept='video/*';
            f.click();
            f.onchange=()=>{
                let form=new FormData();
                form.append('fileName',f.files[0].name);
                form.append('file',f.files[0]);
                A2.r('POST','/paper/upload-asset',form,(error,data)=>{
                    if(!error) {
                        PaperInterface.video(contentBox,{id:'cell_'+Math.random(),type:'video',content:{fileName:data.fileName,fileMime:data.fileMime}});
                        contentBox.removeChild(f);
                    }
                    else I.error(error);
                });
            };
        };
        addCode.onclick=()=>{
            PaperInterface.code(contentBox,{id:'cell_'+Math.random(),type:'code',content:btoa(encodeURIComponent('//'))});
        };
        addFormula.onclick=(e)=>{
            PaperFormulaCells.insert(e,(formulaContent)=>{
                PaperInterface.formula(contentBox,{id:'cell_'+Math.random(),type:'formula',content:formulaContent});
            });
        };
    };
    //
    static save(fileField,callback) {
        if(md5(JSON.stringify(paperContent))!==md5(lastPaperSave)) {
            let savePayload={
                name:fileField.value,
                content:paperContent
            };
            A.r('POST','/paper/update',savePayload,(error,data)=>{
                if(!error) {
                    lastPaperSave=JSON.stringify(paperContent);
                    callback(error,data);
                }
                else I.error(error);
            });
        }
        callback('','');
    };
    static render(data,parent) {
        data.body.forEach((cellData)=>{
            if(cellData.type==='title') PaperInterface.title(parent,cellData);
            else if(cellData.type==='heading') PaperInterface.heading(parent,cellData);
            else if(cellData.type==='subheading') PaperInterface.subheading(parent,cellData);
            else if(cellData.type==='paragraph') PaperInterface.paragraph(parent,cellData);
            else if(cellData.type==='quote') PaperInterface.quote(parent,cellData);
            else if(cellData.type==='image') PaperInterface.image(parent,cellData);
            else if(cellData.type==='video') PaperInterface.video(parent,cellData);
            else if(cellData.type==='audio') PaperInterface.audio(parent,cellData);
            else if(cellData.type==='code') PaperInterface.code(parent,cellData);
            else if(cellData.type==='formula') PaperInterface.formula(parent,cellData);
        });
    };
    static refresh() {
        let cells=E.fetch2(body,'className','paperCell');
        let freezePaperBodyContent=paperContent.body;
        paperContent.body=[];
        for(let i=0;i<cells.length;i++) {
            let cellObject=freezePaperBodyContent[freezePaperBodyContent.findIndex(x=>x.id===cells[i].id)];
            paperContent.body.push(cellObject);
        }
    };
    //
    static focusCell(parent,currentCell) {
        let allCells=E.fetch2(parent,'className','paperCell');
        for(let i=0;i<allCells.length;i++) {
            if(allCells[i]) allCells[i].style.borderLeft='2px solid transparent';
        }
        currentCell.style.borderLeft='2px solid '+activeColor;
        //
        let allOptionBoxes=E.fetch2(parent,'className','paperCellBoxOptions');
        for(let i=0;i<allOptionBoxes.length;i++) {
            if(allOptionBoxes[i]) allOptionBoxes[i].style.display='none';
        }
        E.get('cellOptions_'+currentCell.id).style.display='block';

        //
        focusedCellId=currentCell.id;
        //
        //E.get(currentCell.id).scrollIntoView();
    };
    static cellOptions(parent,cell) {
        let box=E.div(cell,'paperCellBoxOptions','cellOptions_'+cell.id);
        let table=E.table(box,'','','right','');
        let tr=E.tableR(table);
        //
        let up=E.button(E.tableC(tr,''),'paperCellOptionButton','optionUp_'+cell.id,'<i class="fa-solid fa-up"></i>');
        up.title='Move Up';
        up.onclick=(e)=>{
            if(focusedCellId) {
                parent.insertBefore(E.get(focusedCellId),parent.children[Array.prototype.indexOf.call(parent.children, E.get(focusedCellId))-1]);
                PaperInterface.refresh();
            }
        };
        //
        let down=E.button(E.tableC(tr,''),'paperCellOptionButton','optionDown_'+cell.id,'<i class="fa-solid fa-down"></i>');
        down.title='Move Down';
        down.onclick=(e)=>{
            if(focusedCellId) {
                parent.insertBefore(E.get(focusedCellId),parent.children[Array.prototype.indexOf.call(parent.children,E.get(focusedCellId))+2]);
                PaperInterface.refresh();
            }
        };
        //
        let remove=E.button(E.tableC(tr,''),'paperCellOptionButton paperCellOptionButtonRemove','optionRemove_'+cell.id,'<i class="fa-solid fa-trash-can"></i>');
        remove.title='Remove';
        remove.onclick=(e)=>{
            I.confirmFloater(e,(c)=>{
                if(c) {
                    if(['image','video','audio'].indexOf(paperContent.body[paperContent.body.findIndex(x=>x.id===focusedCellId)].type)>-1) {
                        A.r('POST','/paper/delete-asset',{fileName:paperContent.body[paperContent.body.findIndex(x=>x.id===focusedCellId)].content.fileName},(error,data)=>{
                            if(!error) {
                                paperContent.body.splice(paperContent.body.findIndex(x=>x.id===focusedCellId),1);
                                if(E.get(cell.id)) parent.removeChild(E.get(cell.id));
                            }
                            else I.error(error);
                        })
                    }
                    else {
                        paperContent.body.splice(paperContent.body.findIndex(x=>x.id===focusedCellId),1);
                        if(E.get(cell.id)) parent.removeChild(E.get(cell.id));
                    }
                }
            });
        };
    };
    //
    static title(parent,cellData) {
        let cell=E.div(parent,'paperCell',cellData.id);
        if(paperContent.body.findIndex(x=>x.id===cellData.id)===-1) paperContent.body.push(cellData);
        let text=E.div(cell,'paperCellBoxTitle','');
        text.contentEditable=true;
        text.onkeyup=()=>{
            paperContent.body[paperContent.body.findIndex(x=>x.id===cell.id)].content=text.innerHTML;
        };
        text.innerHTML=cellData.content;
        text.addEventListener("paste", (e)=> {
            e.preventDefault();
            let copiedText = (e.originalEvent || e).clipboardData.getData('text/plain');
            document.execCommand("insertHTML", false, copiedText);
        });
        text.addEventListener("keydown", (e)=> {
            if(e.keyCode===13) {
                e.preventDefault();
                document.execCommand('insertHTML',false,'');
            }
        });
        text.onfocus=()=>{
            PaperInterface.focusCell(parent,cell);
        };
        //
        PaperInterface.cellOptions(parent,cell);
        PaperInterface.focusCell(parent,cell);
    };
    static heading(parent,cellData) {
        let cell=E.div(parent,'paperCell',cellData.id);
        if(paperContent.body.findIndex(x=>x.id===cellData.id)===-1) paperContent.body.push(cellData);
        let text=E.div(cell,'paperCellBoxHeading','');
        text.contentEditable=true;
        text.onkeyup=()=>{
            paperContent.body[paperContent.body.findIndex(x=>x.id===cell.id)].content=text.innerHTML;
        };
        text.innerHTML=cellData.content;
        text.addEventListener("paste", (e)=> {
            e.preventDefault();
            let copiedText = (e.originalEvent || e).clipboardData.getData('text/plain');
            document.execCommand("insertHTML", false, copiedText);
        });
        text.addEventListener("keydown", (e)=> {
            if(e.keyCode===13) {
                e.preventDefault();
                document.execCommand('insertHTML',false,'');
            }
        });
        text.onfocus=()=>{
            PaperInterface.focusCell(parent,cell);
        };
        //
        PaperInterface.cellOptions(parent,cell);
        PaperInterface.focusCell(parent,cell);
    };
    static subheading(parent,cellData) {
        let cell=E.div(parent,'paperCell',cellData.id);
        if(paperContent.body.findIndex(x=>x.id===cellData.id)===-1) paperContent.body.push(cellData);
        let text=E.div(cell,'paperCellBoxSubheading','');
        text.contentEditable=true;
        text.onkeyup=()=>{
            paperContent.body[paperContent.body.findIndex(x=>x.id===cell.id)].content=text.innerHTML;
        };
        text.innerHTML=cellData.content;
        text.addEventListener("paste", (e)=> {
            e.preventDefault();
            let copiedText = (e.originalEvent || e).clipboardData.getData('text/plain');
            document.execCommand("insertHTML", false, copiedText);
        });
        text.addEventListener("keydown", (e)=> {
            if(e.keyCode===13) {
                e.preventDefault();
                document.execCommand('insertHTML',false,'');
            }
        });
        text.onfocus=()=>{
            PaperInterface.focusCell(parent,cell);
        };
        //
        PaperInterface.cellOptions(parent,cell);
        PaperInterface.focusCell(parent,cell);
    };
    static paragraph(parent,cellData) {
        //
        let cell=E.div(parent,'paperCell',cellData.id);
        if(paperContent.body.findIndex(x=>x.id===cellData.id)===-1) paperContent.body.push(cellData);
        //
        //if(focusedCellId) {
        //parent.insertBefore(E.get(focusedCellId),parent.children[Array.prototype.indexOf.call(parent.children,E.get(focusedCellId))+2]);
        //PaperInterface.refresh();
        //}
        //
        let text=E.div(cell,'paperCellBoxParagraph','');
        text.contentEditable=true;
        text.onkeyup=()=>{
            paperContent.body[paperContent.body.findIndex(x=>x.id===cell.id)].content=text.innerHTML;
        };
        text.innerHTML=cellData.content;
        //
        text.addEventListener("paste", (e)=> {
            e.preventDefault();
            let copiedText = (e.originalEvent || e).clipboardData.getData('text/plain');
            document.execCommand("insertHTML", false, copiedText);
        });
        text.addEventListener("keydown", (e)=> {
            if(e.keyCode===13) {
                e.preventDefault();
                document.execCommand('insertHTML',false,'<br><br>');
            }
        });
        text.addEventListener('contextmenu', (e)=> {
            e.preventDefault();
            let sel=window.getSelection();
            let range=sel.getRangeAt(0);
            let selText=sel.toString();
            PaperTextCells.options(e,(swapType,hyperlink)=>{
                if(swapType==='copy') {
                    navigator.clipboard.writeText(selText);
                    I.success('Text copied to clipboard');
                }
                else {
                    range.deleteContents();
                    let el;
                    if(swapType==='hyperlink') el=document.createElement('a');
                    else el=document.createElement('span');
                    el.innerHTML=selText;
                    if(swapType==='heading') {el.style.fontSize='30px';el.style.marginTop='20px';el.style.fontWeight='bold';}
                    else if(swapType==='subheading') {el.style.fontSize='20px';el.style.fontWeight='bold';}
                    else if(swapType==='paragraph') {el.style.fontSize='18px';el.style.marginTop='0';el.style.fontWeight='normal';}
                    else if(swapType==='bold') el.style.fontWeight='bold';
                    else if(swapType==='underline') el.style.textDecoration='underline';
                    else if(swapType==='italic') el.style.fontStyle='italic';
                    else if(swapType==='strikethrough') el.style.textDecoration='line-through';
                    else if(swapType==='hyperlink') {el.style.color='#2C6AA6';el.href=hyperlink;el.target='_blank';}
                    else if(swapType==='paste') {
                        navigator.clipboard.readText().then((clipText) =>(el.innerHTML=clipText));
                    }
                    range.insertNode(el);
                }
                paperContent.body[paperContent.body.findIndex(x=>x.id===cell.id)].content=text.innerHTML;
            });
        });
        //
        text.onfocus=()=>{
            PaperInterface.focusCell(parent,cell);
        };
        PaperInterface.cellOptions(parent,cell);
        PaperInterface.focusCell(parent,cell);
    };
    static quote(parent,cellData) {
        let cell=E.div(parent,'paperCell',cellData.id);
        if(paperContent.body.findIndex(x=>x.id===cellData.id)===-1) paperContent.body.push(cellData);
        let text=E.div(cell,'paperCellBoxQuote','');
        text.contentEditable=true;
        text.onkeyup=()=>{
            paperContent.body[paperContent.body.findIndex(x=>x.id===cell.id)].content=text.innerHTML;
        };
        text.innerHTML=cellData.content;
        text.addEventListener("paste", (e)=> {
            e.preventDefault();
            let copiedText = (e.originalEvent || e).clipboardData.getData('text/plain');
            document.execCommand("insertHTML", false, copiedText);
        });
        text.addEventListener("keydown", (e)=> {
            if(e.keyCode===13) {
                e.preventDefault();
                document.execCommand('insertHTML',false,'<br>');
            }
        });
        text.onfocus=()=>{
            PaperInterface.focusCell(parent,cell);
        };
        PaperInterface.cellOptions(parent,cell);
        PaperInterface.focusCell(parent,cell);
    };
    static image(parent,cellData) {
        let cell=E.div(parent,'paperCell',cellData.id);
        if(paperContent.body.findIndex(x=>x.id===cellData.id)===-1) paperContent.body.push(cellData);
        let img=E.img(cell,'paperCellBoxImage','',apiUrl+'/paper/get-asset/?publicToken='+publicToken+'&fileName='+cellData.content.fileName);
        cell.onclick=()=>{
            PaperInterface.focusCell(parent,cell);
        };
        PaperInterface.cellOptions(parent,cell);
        PaperInterface.focusCell(parent,cell);
    };
    static video(parent,cellData) {
        let cell=E.div(parent,'paperCell',cellData.id);
        if(paperContent.body.findIndex(x=>x.id===cellData.id)===-1) paperContent.body.push(cellData);
        let video=E.video(cell,'paperCellBoxVideo','',apiUrl+'/paper/get-asset/?publicToken='+publicToken+'&fileName='+cellData.content.fileName,cellData.content.fileMime);
        setTimeout(()=>{
            video.src=apiUrl+'/paper/get-asset/?publicToken='+publicToken+'&fileName='+cellData.content.fileName;
            video.mime=cellData.content.fileMime;
            video.controls=true;
            video.width=600;
            video.height=250;
        },800);
        cell.onclick=()=>{
            PaperInterface.focusCell(parent,cell);
        };
        PaperInterface.cellOptions(parent,cell);
        PaperInterface.focusCell(parent,cell);
    };
    static audio(parent,cellData) {
        let cell=E.div(parent,'paperCell',cellData.id);
        if(paperContent.body.findIndex(x=>x.id===cellData.id)===-1) paperContent.body.push(cellData);
        let audio=E.audio(cell,'paperCellBoxAudio','',apiUrl+'/paper/get-asset/?publicToken='+publicToken+'&fileName='+cellData.content.fileName,cellData.content.fileMime);
        setTimeout(()=>{
            audio.src=apiUrl+'/paper/get-asset/?publicToken='+publicToken+'&fileName='+cellData.content.fileName;
            audio.mime=cellData.content.fileMime;
        },500);
        cell.onclick=()=>{
            PaperInterface.focusCell(parent,cell);
        };
        PaperInterface.cellOptions(parent,cell);
        PaperInterface.focusCell(parent,cell);
    };
    static code(parent,cellData) {
        let cell=E.div(parent,'paperCell',cellData.id);
        if(paperContent.body.findIndex(x=>x.id===cellData.id)===-1) paperContent.body.push(cellData);
        let editCell=E.div(cell,'paperCellBoxCode',cell.id+'_code');
        let editor=ace.edit(editCell.id);
        editor.setTheme('ace/theme/twilight');
        editor.session.setMode("ace/mode/text");
        editor.setOptions({
            maxLines:20,
            fontSize:"13px",
            readOnly:false,
            highlightActiveLine:false,
            highlightGutterLine:true
        });
        editor.renderer.setShowGutter(true);
        editor.setValue(decodeURIComponent(atob(cellData.content)));
        editor.clearSelection();
        editCell.onkeyup=()=>{
            paperContent.body[paperContent.body.findIndex(x=>x.id===cell.id)].content=btoa(encodeURIComponent(editor.getValue()))
        };
        //
        editCell.onclick=()=>{
            PaperInterface.focusCell(parent,cell);
        };
        PaperInterface.cellOptions(parent,cell);
        PaperInterface.focusCell(parent,cell);
    };
    static formula(parent,cellData) {
        let cell=E.div(parent,'paperCell',cellData.id);
        if(paperContent.body.findIndex(x=>x.id===cellData.id)===-1) paperContent.body.push(cellData);
        let text=E.div(cell,'paperCellBoxFormula','');
        katex.render(cellData.content,text, {
            throwOnError: false
        });
        //
        text.onclick=()=>{
            PaperInterface.focusCell(parent,cell);
        };
        PaperInterface.cellOptions(parent,cell);
        PaperInterface.focusCell(parent,cell);
    };
}

class PaperTextCells {
    static options(e,callback) {
        I.hideFloaters();
        let p=e.target.getBoundingClientRect();
        let m=E.div(body,'floaterMenu','');
        m.style.padding='0px';
        m.style.top=p.top+50+'px';
        m.style.left=p.left+window.scrollX+10+'px';
        m.style.width='fit-content';
        let t=E.table(m,'','','center','100%');
        //
        let tr=E.tableR(t);
        let f='14%';
        //
        let bold=E.div(E.tableC(tr,f),'paperContextMenuItem center','');
        bold.innerHTML='<i class="fa-solid fa-bold"></i>';
        bold.onclick=()=>{
            callback('bold','');
            I.hideFloaters();
        };
        //
        let underline=E.div(E.tableC(tr,f),'paperContextMenuItem center','');
        underline.innerHTML='<i class="fa-solid fa-underline"></i>';
        underline.onclick=()=>{
            callback('underline','');
            I.hideFloaters();
        };
        let italic=E.div(E.tableC(tr,f),'paperContextMenuItem center','');
        italic.innerHTML='<i class="fa-solid fa-italic"></i>';
        italic.onclick=()=>{
            callback('italic','');
            I.hideFloaters();
        };
        let strike=E.div(E.tableC(tr,f),'paperContextMenuItem center','');
        strike.innerHTML='<i class="fa-solid fa-strikethrough"></i>';
        strike.onclick=()=>{
            callback('strikethrough','');
            I.hideFloaters();
        };
        //
        let link=E.div(E.tableC(tr,f),'paperContextMenuItem center','');
        link.innerHTML='<i class="fa-solid fa-link"></i>';
        link.onclick=()=>{
            PaperTextCells.hyperlink(e,(hyperlink)=>{
                callback('hyperlink',hyperlink);
                I.hideFloaters();
            });
        };
        //
        let copy=E.div(E.tableC(tr,f),'paperContextMenuItem center','');
        copy.innerHTML='<i class="fa-solid fa-copy"></i>';
        copy.onclick=()=>{
            callback('copy');
            I.hideFloaters();
        };
        //
        let paste=E.div(E.tableC(tr,f),'paperContextMenuItem center','');
        paste.innerHTML='<i class="fa-solid fa-clipboard"></i>';
        paste.onclick=()=>{
            e.preventDefault();
            callback('paste');
            I.hideFloaters();
        };
    };
    static hyperlink(e,callback) {
        I.hideFloaters();
        let p=e.target.getBoundingClientRect();
        let m=E.div(body,'floaterMenu','');
        m.style.top=p.top+15+'px';
        m.style.left=p.left+window.scrollX-150+'px';
        let t=E.table(m,'','','center','100%');
        //
        let hyperlink=E.input(E.tableC(E.tableR(t),'100%'),'url','floaterInputField','','https://example.com');
        let button=E.button(E.tableC(E.tableR(t),'100%'),'floaterInputButton','','Save');
        button.onclick=()=>{
            I.hideFloaters();
            callback(hyperlink.value);
        };
        hyperlink.onkeydown=(e)=>{if(e.keyCode===13) {I.popup('close');callback(hyperlink.value)}};
    };
}
class PaperFormulaCells {
    static insert(e,callback) {
        I.hideFloaters();
        let p=e.target.getBoundingClientRect();
        let m=E.div(body,'floaterMenu','');
        m.style.top=p.top+15+'px';
        m.style.left=p.left+window.scrollX-120+'px';
        let t=E.table(m,'','','center','100%');
        //
        let formula=E.textarea(E.tableC(E.tableR(t),'100%'),'floaterInputField','','Formula');
        let buttonInsert=E.button(E.tableC(E.tableR(t),'100%'),'floaterInputButton','','Insert');
        E.div(E.tableC(E.tableR(t),'100%'),'floaterMenuDivider','');
        E.div(E.tableC(E.tableR(t),'100%'),'floaterMenuItemStaticSmall pointer','').innerHTML="Click <a href='https://katex.org/docs/supported.html' target='_blank' style='color:inherit;'>here</a> for the list of supported functions.";
        buttonInsert.onclick=()=>{
            I.hideFloaters();
            callback(formula.value);
        };
    };
}
