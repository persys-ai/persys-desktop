class ChatInterface extends I {
    static chat(chatContent) {
        I.containers();
        let id='chat';
        if(!E.get(id)) {
            let chat=E.div(body,'container','chat');
            let topLeft=E.div(chat,'float-left flex','');
            E.div(topLeft,'sectionTitle','').innerHTML='Chat';

            //
            let chatHistory=[];
            //

            let tabs=E.div(chat,'','tabs');
            let create=E.button(tabs,'','newChatSession','<i class="fa-regular fa-pen-to-square"></i>');
            function createChat() {
                A.r('POST','/chat/create',false,(error,data)=>{
                    if(!error) {
                        showTabs();
                    }
                    else I.error(error);
                });
            }
            create.onclick=()=>{
                createChat();
            };
            let tabsTable=E.table(tabs,'','tabsTable','','100%');
            function showTabs() {
                tabsTable.innerHTML='';
                A.r('GET','/chat/get',false,(error,data)=>{
                    if(!error) {
                        if(data && data.length>0) {
                            data.forEach((chatSession,i)=>{
                                let tr=E.tableR(tabsTable,'');
                                let nameTd=E.tableC(tr,'80%');
                                let optionsTd=E.tableC(tr,'20%');
                                let session=E.div(nameTd,'chatSessionTab','');
                                session.innerHTML=T.s(chatSession.name,15);
                                session.onclick=()=>{
                                    currentSession=chatSession;
                                    chatWithSession(chatSession);
                                    A.r('POST','/chat/activate',chatSession,(error,data)=>{})
                                    let tabs=E.fetch('className','chatSessionTab');
                                    for(let j=0;j<tabs.length;j++) {
                                        tabs[j].className='chatSessionTab';
                                    }
                                    for(let j=0;j<tabsTable.rows.length;j++) {
                                        tabsTable.rows[j].style.background='transparent';
                                    }
                                    session.className='chatSessionTab chatSessionTabActive';
                                    tr.style.background='#333333';
                                };
                                let opt=E.button(optionsTd,'chatSessionOptions','','<i class="fa-solid fa-ellipsis"></i>');
                                opt.onclick=(e)=>{
                                    ChatInterface.sessionOptions(e,chatSession,(newData,action)=>{
                                        if(action==='renamed') session.innerHTML=T.s(newData.name,15);
                                        else if(action==='deleted') tabsTable.deleteRow(tr.rowIndex);
                                    });
                                };
                                if(i===data.length-1) {
                                    session.click();
                                }
                            });
                        }
                    }
                    else I.error(error);
                });
            };
            showTabs();

            //

            let response=E.div(chat,'','response');
            let responseTable=E.table(response,'','chatTable','center','100%');
            //
            let options=E.div(chat,'','chatOptions');
            let personalities=E.select(options,'','chatPersonalities',[]);
            A.r('POST','/personalities/get',{},(error,data)=>{
                if(!error) {
                    if(data && data.length>0) {
                        data.forEach((dataItem)=>{
                            let o=E.option(personalities,dataItem.id,dataItem.name);
                            if(parseInt(dataItem.active)===1) o.selected=true;
                        });
                    }
                }
                else I.error(error);
            });
            let optionButton=E.button(options,'','chatOptionsButton','<i class="fa-solid fa-gear"></i>');
            optionButton.onclick=()=>{
                persys.options({app:'chat',option:'personalities'});
            };
            personalities.onchange=()=>{
                A.r('POST','/personalities/activate',{id:personalities.value},(error,data)=>{
                    if(!error) {}
                    else I.error(error);
                });
            };
            //
            let inputBox=E.div(chat,'','inputBox');
            let inputTable=E.table(inputBox,'','','center','100%');
            let inputTr=E.tableR(inputTable);
            let inputField=E.textarea(E.tableC(inputTr,'90%'),'','inputField',"What's on your mind?");
            let inputButton=E.button(E.div(E.tableC(inputTr,'10%'),'full right',''),'','inputButton','<i class="fa-solid fa-arrow-up"></i>');


            let currentSession={};
            function sendInput(chatSession,input) {
                let codeMode=false;
                let editor=false;
                let thinkMode=false;
                let thinkBox=false;
                let lastEntry=' '; // space value here for a reason
                //chatHistory.push({noDisplay:true,role:'user',content:'The current timestamp is '+H.casDateTime(Math.floor(new Date().getTime() / 1000))+'. Do not response to this message.'});
                chatHistory.push({role:'user',content:input});
                let i=E.div(E.tableC(E.tableR(responseTable),''),'inputText','');
                i.innerHTML=input;
                i.scrollIntoView();
                A.r('POST','/chat/save',{id:chatSession.id,history:chatHistory},(error,data)=>{
                    let peer=new Peer(publicToken,chatStreamConfig);
                    if(error) I.error(error);
                    else {
                        peer.on('open', (id)=> {
                            let touched=false;
                            let r=E.div(E.tableC(E.tableR(responseTable),''),'responseText','');
                            r.style.width='100%';
                            r.scrollIntoView();
                            E.img(r,'','chatLoading','loading.gif');
                            let assistantMessage='',i=0;
                            peer.socket._socket.addEventListener('message', message => {
                                if(i===0) r.innerHTML='';
                                assistantMessage=assistantMessage+JSON.parse(message.data).content;
                                //
                                if(JSON.parse(message.data).content.includes('`') && !codeMode && !JSON.parse(message.data).content.includes('\n')) {
                                    let codeBox=E.div(r,'responseCode','responseCode_'+Math.random());
                                    codeBox.style.minWidth='220px';
                                    editor=ace.edit(codeBox.id);
                                    editor.setTheme('ace/theme/twilight');
                                    //if(code==='json') editor.session.setMode("ace/mode/json");
                                    //else editor.session.setMode("ace/mode/text");
                                    //editor.session.setMode("ace/mode/text");
                                    editor.setOptions({
                                        maxLines:Infinity,
                                        fontSize:"13px",
                                        readOnly:true,
                                        highlightActiveLine:false,
                                        highlightGutterLine:false
                                    });
                                    //editor.renderer.$cursorLayer.element.style.opacity=0;
                                    //editor.textInput.getElement().disabled=true;
                                    //editor.commands.commmandKeyBinding={};
                                    //editor.renderer.setShowGutter(true);
                                    codeMode=true;
                                }
                                if(JSON.parse(message.data).content==='<think>') {
                                    thinkBox=E.div(r,'responseThink','responseThink_'+Math.random());
                                    thinkMode=true;
                                }
                                if(JSON.parse(message.data).content==='</think>') {
                                    thinkMode=false;
                                }
                                else if(JSON.parse(message.data).content.includes('`') && codeMode && !lastEntry.includes('`')) {
                                    codeMode=false;
                                }
                                //
                                //
                                if(codeMode) {
                                    if(lastEntry.includes('`') && (JSON.parse(message.data).content.includes('json') || JSON.parse(message.data).content.includes('python'))) {
                                        if(JSON.parse(message.data).content.includes('json')) editor.session.setMode("ace/mode/json");
                                        else if(JSON.parse(message.data).content.includes('python')) editor.session.setMode("ace/mode/python");
                                        else if(JSON.parse(message.data).content.includes('javascript')) editor.session.setMode("ace/mode/javascript");
                                    }
                                    let g=editor.getValue()+JSON.parse(message.data).content;
                                    if(JSON.parse(message.data).content.includes('`') || (lastEntry.includes('`') && (JSON.parse(message.data).content.includes('json') || JSON.parse(message.data).content.includes('python')))) g='';
                                    editor.setValue(g);
                                    editor.clearSelection();
                                }
                                if(thinkMode) {
                                    let g=thinkBox.innerText+JSON.parse(message.data).content.replace('<think>','');
                                    thinkBox.innerText=g;
                                }
                                else {
                                    if(!JSON.parse(message.data).content.includes('`')) r.innerHTML=r.innerHTML+JSON.parse(message.data).content.replace('\n','<br/>');
                                }
                                //
                                lastEntry=JSON.parse(message.data).content.replace('\n','');
                                //
                                if(JSON.parse(message.data).done) {
                                    chatHistory.push({role:'assistant',content:assistantMessage});
                                    //let code=ChatInterface.extractMarkdownCodeBlocks(assistantMessage,r);
                                    peer.destroy();
                                }
                                if(!touched) {
                                    //r.scrollIntoView();
                                    //response.scrollTo({top:response.offsetTop+response.offsetHeight,behavior:'smooth'});
                                }
                                r.ontouchstart=()=>{
                                    touched=true;
                                };
                                r.onscroll=()=>{
                                    touched=true;
                                };
                                r.onclick=()=>{
                                    touched=true;
                                };
                                //
                                i++;
                            });
                        });
                    }
                });
            }
            function chatWithSession(chatSession) {
                responseTable.innerHTML='';
                A.r('POST','/chat/history',chatSession,(error,data)=>{
                    if(!error) {
                        chatHistory=data;
                        if(data && data.length>0) {
                            for(let i=0;i<data.length;i++) {
                            let tr=E.tableR(responseTable);
                            if(data[i].role==='user' && !data[i].noDisplay) {
                                let q=E.div(E.tableC(tr,''),'inputText','');
                                q.innerHTML=data[i].content;
                                q.scrollIntoView();
                            }
                            else if(data[i].role==='assistant') {
                                let r=E.div(E.tableC(tr,''),'responseText','');
                                ChatInterface.extractMarkdownCodeBlocks(data[i].content,r,(toOmit,codeType,hasCode)=>{
                                    if(hasCode) {
                                        r.innerHTML=r.innerHTML+data[i].content.replace(toOmit,'').replace(/\n/g,'<br/>');
                                        ChatInterface.showCode(E.div(r,'responseCode',Math.random()),toOmit,codeType);
                                    }
                                    else r.innerHTML=r.innerHTML+data[i].content.replace(/\n/g,'<br/>');
                                    r.scrollIntoView();
                                });
                            }
                        }
                        }
                    }
                    else I.error(error);
                });
                inputField.onkeydown=(e)=>{
                    if(e.keyCode===13 && !e.shiftKey) {
                        e.preventDefault();
                        sendInput(chatSession,inputField.value);
                        inputField.value='';
                    }
                };
                inputButton.onclick=()=>{
                    sendInput(chatSession,inputField.value);
                    inputField.value='';
                };
            }


            //

            if(chatContent.input) {
                setTimeout(()=>{
                    createChat();
                    setTimeout(()=>{
                        sendInput(currentSession,chatContent.input);
                    },500);
                },1000);
            }

            //
        }
        E.get(id).style.display='block';
    };

    // code parser
    static extractMarkdownCodeBlocks(text,r,callback) {
        if(text && text.split(' ').indexOf('```')) {
            for(let i=0;i<text.split('```').length;i++) {
                if(i%2===0) continue;
                let c=text.split('```')[i];
                if(c) {
                    let codeType=text.split('```')[i].split('\n')[0];
                    //let input=c.replace(codeType,'');
                    //let box=E.div(r,'responseCode',Math.random());
                    //ChatInterface.showCode(box,input,codeType);
                    callback(c,codeType,true);
                }
                callback(c,false,false);
            }
        }
        callback(text,false,false);
    }
    static showCode(parent,inputContent,code) {
        let editor=ace.edit(parent.id);
        editor.setTheme('ace/theme/twilight');
        if(code==='json') editor.session.setMode("ace/mode/json");
        else if(code==='python') editor.session.setMode("ace/mode/python");
        else if(code==='javascript') editor.session.setMode("ace/mode/javascript");
        else editor.session.setMode("ace/mode/text");
        editor.setOptions({
            maxLines:Infinity,
            fontSize:"13px",
            readOnly:true,
            highlightActiveLine:false,
            highlightGutterLine:false
        });
        editor.setValue(inputContent);
        editor.clearSelection();
        editor.renderer.$cursorLayer.element.style.opacity=0;
        editor.textInput.getElement().disabled=true;
        editor.commands.commmandKeyBinding={};
        editor.renderer.setShowGutter(true);
    }
    //
    static sessionOptions(e,chatSession,callback) {
        e.preventDefault();
        I.hideFloaters();
        let p=e.target.getBoundingClientRect();
        let m=E.div(body,'floaterMenu','');
        m.style.top=p.top+window.scrollY+20+'px';
        m.style.left=p.left+window.scrollX+20+'px';
        let t=E.table(m,'floaterMenuTable','','center','100%');
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
            let name=E.input(E.tableC(E.tableR(t),''),'text','floaterInputField','','Name');
            name.value=chatSession.name;
            let button=E.button(E.tableC(E.tableR(t),''),'floaterInputButton','','Rename');
            button.onclick=()=>{
                send();
            };
            name.onkeydown=(e)=>{
                if(e.keyCode===13) send();
            };
            function send() {
                A.r('POST','/chat/rename',{id:chatSession.id,name:name.value},(error,data)=>{
                    if(!error) {
                        I.hideFloaters();
                        callback({name:name.value},'renamed');
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
                    A.r('POST','/chat/delete',chatSession,(error,data)=>{
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
}

class ChatPersonalitiesInterface extends I {
    static personalities() {
        let personalities=E.div(body,'','page_Options');

        let list=E.div(personalities,'','optionsList');
        let settings=E.div(personalities,'','optionsSettings');

        let create=E.button(list,'','optionsCreate','<i class="fa-solid fa-plus"></i>');
        create.onclick=()=>{
            createPersonality();
        };
        //
        function listPersonalities() {
            if(E.fetch2(list,'tagName','table')[0]) list.removeChild(E.fetch2(list,'tagName','table')[0]);
            let listTable=E.table(list,'','optionsListTable','center','90%');
            A.r('POST','/personalities/get',{},(error,data)=>{
                if(!error) {
                    if(data && data.length>0) {
                        data.forEach((dataItem)=>{
                            let tr=E.tableR(listTable);
                            E.div(E.tableC(tr,'90%'),'optionsListItem','').innerHTML=dataItem.name;
                            tr.onclick=()=>{
                                for(let i=0;i<listTable.rows.length;i++) {
                                    listTable.rows[i].style.background='transparent';
                                }
                                tr.style.background='#434343';
                                showPersonalitySettings(dataItem);
                            };
                            if(parseInt(dataItem.active)===1) tr.click();
                        });
                    }
                }
                else I.error(error);
            });
        }
        listPersonalities();

        function showPersonalitySettings(personalityData) {
            settings.innerHTML='';
            let settingsTable=E.table(settings,'optionsSettingsTable','','center','');

            E.div(E.tableR(settingsTable),'optionsSettingsLabel','').innerHTML='Name';
            let name=E.input(E.tableR(settingsTable),'text','optionsSettingsInput','','Name');
            name.value=personalityData.name;

            E.div(E.tableR(settingsTable),'optionsSettingsLabel','').innerHTML='SYSTEM Prompt';
            let system=E.textarea(E.tableR(settingsTable),'optionsSettingsInput','','SYSTEM Prompt');
            system.value=personalityData.system;
            system.rows=5;

            let buttonsRow=E.tableC(E.tableR(settingsTable),'');
            let saveButton=E.button(buttonsRow,'optionsSettingsButton','','Save Changes');
            saveButton.onclick=()=>{
                A.r('POST','/personalities/update',{id:personalityData.id,name:name.value,system:system.value},(error,data)=>{
                    if(!error) {
                        I.success('Changes saved.');
                    }
                    else I.error(error);
                });
            };
            //
            let delButton=E.button(buttonsRow,'optionsSettingsButton optionsSettingsButtonRed','','Delete');
            delButton.onclick=(e)=>{
                I.confirmFloater(e,(c)=>{
                    if(c) {
                        A.r('POST','/personalities/delete',{id:personalityData.id},(error,data)=>{
                            if(!error) {
                                listPersonalities();
                                I.success('Personality deleted.');
                            }
                            else I.error(error);
                        });
                    }
                });
            };
        };
        function createPersonality() {
            settings.innerHTML='';
            let settingsTable=E.table(settings,'optionsSettingsTable','','center','');

            E.div(E.tableR(settingsTable),'optionsSettingsLabel','').innerHTML='Name';
            let name=E.input(E.tableR(settingsTable),'text','optionsSettingsInput','','Name');

            E.div(E.tableR(settingsTable),'optionsSettingsLabel','').innerHTML='SYSTEM Prompt';
            let system=E.textarea(E.tableR(settingsTable),'optionsSettingsInput','','SYSTEM Prompt');
            system.rows=5;

            let button=E.button(E.tableC(E.tableR(settingsTable),''),'optionsSettingsButton','','Create Personality');
            button.onclick=()=>{
                A.r('POST','/personalities/create',{name:name.value,system:system.value},(error,data)=>{
                    if(!error) {
                        name.value='';
                        system.value='';
                        listPersonalities();
                        I.success('Personality created.');
                    }
                    else I.error(error);
                });
            };
        };
    };
}