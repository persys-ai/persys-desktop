class I {
    static search(box,searchTerm) {
        let boxes=box.getElementsByClassName('gridItem');
        for(let i=0;i<=boxes.length;i++) {
            if(boxes[i].innerHTML.toUpperCase().indexOf(searchTerm.toUpperCase())>-1) {
                boxes[i].style.display='unset';
            }
            else {
                boxes[i].style.display='none';
            }
        }
    };
    static searchBox(box,className,searchTerm) {
        let boxes=box.getElementsByClassName(className);
        for(let i=0;i<=boxes.length;i++) {
            if(boxes[i].innerHTML.toUpperCase().indexOf(searchTerm.toUpperCase())>-1) {
                boxes[i].style.display='unset';
            }
            else {
                boxes[i].style.display='none';
            }
        }
    };
    static searchTable(table,searchTerm) {
        let rows=table.getElementsByTagName('tr');
        for(let i=0;i<=rows.length;i++) {
            if(rows[i].innerHTML.toUpperCase().indexOf(searchTerm.toUpperCase())>-1) {
                rows[i].style.display='unset';
            }
            else {
                rows[i].style.display='none';
            }
        }
    };
    static error(e) {
        let box=E.get('notificationBox');
        box.style.background='#E83A3A';
        box.style.visibility='visible';
        box.style.right='25px';
        box.innerHTML='<i class="fa-solid fa-triangle-exclamation"></i> '+e;
        setTimeout(()=>{
            box.style.right='-500px';
        },4000);
    };
    static success(m) {
        let box=E.get('notificationBox');
        box.style.background='#35C185';
        box.style.visibility='visible';
        box.style.right='25px';
        box.innerHTML='<i class="fa-solid fa-circle-check"></i> '+m;
        setTimeout(()=>{
            box.style.right='-500px';
        },4000);
    };
    static info(m) {
        let box=E.get('notificationBox');
        box.style.background='#444444';
        box.style.visibility='visible';
        box.style.right='25px';
        box.innerHTML='<i class="fa-solid fa-square-info"></i> '+m;
        setTimeout(()=>{
            box.style.right='-500px';
        },4000);
    };
    static hideFloaters() {
        for(let x=0;x<E.fetch2(body,'className','floaterMenu').length;x++) {
            body.removeChild(E.fetch2(body,'className','floaterMenu')[x]);
        }
        for(let x=0;x<E.fetch2(body,'className','floaterWhatis').length;x++) {
            body.removeChild(E.fetch2(body,'className','floaterWhatis')[x]);
        }
    };
    static confirmFloater(e,callback) {
        //I.hideFloaters();
        let p=e.target.getBoundingClientRect();
        let m=E.div(body,'floaterMenu','');
        m.style.top=p.top+window.scrollY+15+'px';
        m.style.left=p.left+window.scrollX-160+'px';
        let b=E.div(m,'floaterMenuButton floaterMenuButtonRed','');
        b.innerHTML='<i class="fa-solid fa-triangle-exclamation"></i> Confirm';
        b.onclick=()=>{
            callback(true);
            I.hideFloaters();
        };
    };
    static containers() {
        let containers=E.fetch('className','container');
        if(containers && containers.length>0) {
            for(let i=0;i<containers.length;i++) {
                containers[i].style.display='none';
            }
        }
    };
    static popup(state,height,width,callback) {
        if(height===null || height==='') height=400;
        if(width===null || width==='') width=600;
        if(state==="close") {
            E.get('popupBox').style.top='1000px';
            E.get('popupBox').style.visibility='hidden';
            E.get('popupBox').style.opacity='0';
            setTimeout(()=> {
                E.get('popupBlanket').style.background='rgba(0,0,0,0)';
                E.get('popupBlanket').style.visibility='hidden';
                E.get('popupBoxTitle').innerHTML="";
                E.get('popupBoxContent').innerHTML="";
            },200);
        }
        if(state==="open") {
            if(!E.get('popupBlanket')) {
                var blanket=E.div(body,'','popupBlanket');
                var box=E.div(blanket,'','popupBox');
                var close=E.div(box,'','popupBoxClose');
                close.innerHTML='<i class="fa-solid fa-xmark"></i>';
                close.onclick=()=>{
                    I.popup("close",'','',()=>{});
                };
                var title=E.div(box,'','popupBoxTitle');
                var content=E.div(box,'','popupBoxContent');
            }
            else {
                var blanket=E.get('popupBlanket');
                var box=E.get('popupBox');
                var title=E.get('popupBoxTitle');
                var content=E.get('popupBoxContent');
            }
            blanket.style.height=window.innerHeight+'px';
            box.style.height=(height+50)+'px';
            box.style.width=width+'px';
            content.style.height=height+'px';
            content.style.width=width+'px';
            //
            blanket.style.visibility='visible';
            blanket.style.background='rgba(0,0,0,0.9)';
            setTimeout(()=>{
                box.style.visibility='visible';
                box.style.opacity='1';
                box.style.top='50px';
            },100);
            callback(title,content);
        }
    };
    static setCookies(cookies) {
        apiRoot=cookies.content[0].value;
        apiUrl='http://'+apiRoot+':3000';
        chatStreamConfig={host:apiRoot,port:9000,path:"/chat"};
        statStreamConfig={host:apiRoot,port:4000,path:"/stats"};
        ragStreamConfig={host:apiRoot,port:7000,path:"/rag"};
        publicToken=cookies.content[1].value;
    };

    static rag(trigger,fileName,descriptor,contentArray) {
        trigger.innerHTML='';
        E.img(trigger,'ragLoader','','loading2.gif');
        let toEmbed=[];
        if(descriptor) toEmbed.push(descriptor);
        if(contentArray && contentArray.length>0) {
            for(let i=0;i<contentArray.length;i++) {
                if(contentArray[i].length>1) toEmbed.push(contentArray[i]);
            }
            A.r('POST','/embeddings/create', {name:fileName,content:toEmbed},(error,data)=>{
                if(!error) {
                    trigger.innerHTML='<i class="fa-solid fa-comment"></i>';
                    persys.rag({name:fileName});
                }
                else I.error(error);
            });
        }
        else I.error('I need more content.');
    }
}