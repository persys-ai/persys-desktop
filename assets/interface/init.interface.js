class E {
    static get(id) {
        return document.getElementById(id);
    };
    static fetch(type,value) {
        let e;
        switch(type) {
            case 'className':
                e=document.getElementsByClassName(value);
                break;
            case 'tagName':
                e=document.getElementsByTagName(value);
                break;
        }
        return e;
    }
    static fetch2(parent,type,value) {
        let e;
        switch(type) {
            case 'className':
                e=parent.getElementsByClassName(value);
                break;
            case 'tagName':
                e=parent.getElementsByTagName(value);
                break;
        }
        return e;
    }
    static bool(e) {
        let val;
        if(e.checked===true) val=1;
        if(e.checked===false) val=0;
        return val;
    };
    static script(parent,src) {
        let e=document.createElement('div');
        parent.appendChild(e);
        e.src=src;
        return e;
    };

    static div(parent,className,id) {
        let e=document.createElement('div');
        parent.appendChild(e);
        e.className=className;
        e.id=id;
        return e;
    };
    static span(parent,className,id) {
        let e=document.createElement('span');
        parent.appendChild(e);
        e.className=className;
        e.id=id;
        return e;
    };
    static form(parent,method) {
        let e=document.createElement('form');
        parent.appendChild(e);
        e.method=method;
        return e;
    };
    static a(parent,className,id,href,target) {
        let e=document.createElement('a');
        parent.appendChild(e);
        e.className=className;
        e.id=id;
        e.href=href;
        if(target) e.target=target;
        return e;
    };
    static table(parent,className,id,align,width) {
        let e=document.createElement('table');
        parent.appendChild(e);
        e.className=className;
        e.id=id;
        e.align=align;
        e.width=width;
        return e;
    };
    static tableR(table) {
        return table.insertRow(table.rows.length);
    };
    static tableC(tr,width) {
        let e=tr.insertCell(tr.cells.length);
        e.width=width;
        return e;
    };
    static tableC2(tr,width,style) {
        let e=tr.insertCell(tr.cells.length);
        e.width=width;
        e.style.background=style.background;
        return e;
    };
    static tableH(tr,width) {
        let e=document.createElement('th');
        tr.appendChild(e);
        e.width=width;
        return e;
    };
    static tableH2(tr,colspan) {
        let e=document.createElement('th');
        tr.appendChild(e);
        e.colSpan=colspan;
        return e;
    };
    static tableHV(tr,rowspan) {
        let e=document.createElement('th');
        tr.appendChild(e);
        e.rowSpan=rowspan;
        return e;
    };
    static img(parent,className,id,src) {
        let e=document.createElement('img');
        parent.appendChild(e);
        e.className=className;
        e.id=id;
        e.src=src;
        return e;
    };
    static video(parent,className,id,src,mime) {
        let e=document.createElement('video');
        e.className=className;
        e.id=id;
        e.setAttribute("width", "1000");
        e.setAttribute("height", "450");
        e.setAttribute("controls","controls");
        e.setAttribute("preload","metadata");
        let s=document.createElement('source');
        s.src=src;
        s.type=mime;
        e.appendChild(s);
        parent.appendChild(e);
        return e;
    };
    static audio(parent,className,id,src,mime) {
        let e=document.createElement('audio');
        parent.appendChild(e);
        e.className=className;
        e.id=id;
        e.setAttribute("width", "100%");
        e.setAttribute("controls","controls");
        let s=document.createElement('source');
        s.src=src;
        s.type=mime;
        e.appendChild(s);
        return e;
    };
    static object(parent,className,id,src) {
        let e=document.createElement('object');
        e.className=className;
        e.id=id;
        e.data=src;
        e.type="application/pdf";
        parent.appendChild(e);
        e.setAttribute("width", "100%");
        e.setAttribute("height", "100%");
        return e;
    };
    static canvas(parent,className,id,width,height) {
        let e=document.createElement('canvas');
        parent.appendChild(e);
        e.className=className;
        e.id=id;
        e.width=width;
        e.height=height;
        e.style.width=width;
        e.style.height=height;
        return e;
    };

    static input(parent,type,className,id,placeholder) {
        let e=document.createElement('input');
        parent.appendChild(e);
        e.type=type;
        e.className=className;
        e.id=id;
        e.placeholder=placeholder;
        return e;
    };
    static textarea(parent,className,id,placeholder) {
        let e=document.createElement('textarea');
        parent.appendChild(e);
        e.className=className;
        e.id=id;
        e.placeholder=placeholder;
        return e;
    };
    static button(parent,className,id,text) {
        let e=document.createElement('button');
        parent.appendChild(e);
        e.className=className;
        e.id=id;
        e.innerHTML=text;
        return e;
    };
    static select(parent,className,id,options) {
        let e=document.createElement('select');
        parent.appendChild(e);
        e.className=className;
        e.id=id;
        if(options.length>0) {
            for(let i=0;i<options.length;i++) {
                let o=document.createElement('option');
                o.innerHTML=options[i].text;
                o.value=options[i].value;
                if(options[i].selected===1) o.selected=true;
                e.add(o);
            }
        }
        return e;
    };
    static option(parent,value,text) {
        let e=document.createElement('option');
        e.value=value;
        e.innerHTML=text;
        parent.add(e);
        return e;
    };
    static optionGroup(parent,label) {
        let e=document.createElement('optgroup');
        e.label=label;
        parent.add(e);
        return e;
    };
    static option2(parent,value,text) {
        let e=document.createElement('option');
        e.value=value;
        e.innerHTML=text;
        parent.appendChild(e);
        return e;
    };
    static toggle(parent,className,id) {
        let l=document.createElement('label');
        parent.appendChild(l);
        l.className='switch';
        let e=document.createElement('input');
        l.appendChild(e);
        e.type='checkbox';
        e.className=className;
        e.id=id;
        let s=document.createElement('span');
        l.appendChild(s);
        s.className='slider';
        return e;
    };
    static label(parent,className,id) {
        let e=document.createElement('label');
        parent.appendChild(e);
        e.className=className;
        e.id=id;
        return e;
    }
    static checkbox(parent,className,id) {
        let e=document.createElement('input');
        parent.appendChild(e);
        e.type='checkbox';
        e.className=className;
        e.id=id;
        return e;
    };
    static radio(parent,className,id,name,value) {
        let e=document.createElement('input');
        parent.appendChild(e);
        e.type='radio';
        e.className=className;
        e.id=id;
        e.name=name;
        e.value=value;
        return e;
    };
    static file(parent,id,name) {
        let e=document.createElement('input');
        parent.appendChild(e);
        e.type='file';
        e.className='fileField';
        e.id=id;
        e.name=name;
        return e;
    };

    static slider(parent,className,id) {
        let e=document.createElement('input');
        parent.appendChild(e);
        e.type='range';
        e.className=className;
        e.id=id;
        return e;
    };
}
class H {
    //y-m-d
    static date(date) {
        let parts=date.match(/(\d+)/g);
        let start=new Date(parts[0],parts[1]-1,parts[2]);
        return start.getMonth()+1+'/'+start.getDate();
    };

    // hh:mm
    static time(time) {
        let c;
        let a=parseInt(time.substr(-time.length,2));
        let b=time.substr(3,2);
        if(a<12) c='am';
        else {
            c='pm';
            if(a===13) a=1;
            if(a===14) a=2;
            if(a===15) a=3;
            if(a===16) a=4;
            if(a===17) a=5;
            if(a===18) a=6;
            if(a===19) a=7;
            if(a===20) a=8;
            if(a===21) a=9;
            if(a===22) a=10;
            if(a===23) a=11;
        }
        return a+':'+b+c;
    };

    // timestamp
    static casDate(timestamp) {
        if(!timestamp || timestamp===0 || timestamp===null || timestamp==='') return '';
        timestamp=timestamp*1000;
        let m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let start=new Date(timestamp);
        return m[start.getMonth()]+' '+start.getDate()+', '+start.getFullYear();
    };

    // y-m-d
    static casDate2(date) {
        let parts=date.match(/(\d+)/g);
        let m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let start=new Date(parts[0],parts[1]-1,parts[2]);
        return m[start.getMonth()]+' '+start.getDate()+', '+start.getFullYear();
    };

    // timestamp
    static casDateTime(timestamp) {
        if(!timestamp || timestamp===0 || timestamp===null || timestamp==='') return '';
        timestamp=timestamp*1000;
        let m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let start=new Date(timestamp);
        let a,i,t=start.getHours();
        if(start.getHours()<12) a='am';
        else {
            a='pm';
            if(t===13) t=1;
            if(t===14) t=2;
            if(t===15) t=3;
            if(t===16) t=4;
            if(t===17) t=5;
            if(t===18) t=6;
            if(t===19) t=7;
            if(t===20) t=8;
            if(t===21) t=9;
            if(t===22) t=10;
            if(t===23) t=11;
        }
        if(start.getMinutes()<10) {
            i='0'+start.getMinutes();
        }
        else i=start.getMinutes();
        return m[start.getMonth()]+' '+start.getDate()+', '+start.getFullYear()+' - '+t+':'+i+' '+a;
    };

    static casTime(timestamp) {
        if(!timestamp || timestamp===0 || timestamp===null || timestamp==='') return '';
        timestamp=timestamp*1000;
        let m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let start=new Date(timestamp);
        let a,i,t=start.getHours();
        if(start.getHours()<12) a='am';
        else {
            a='pm';
            if(t===13) t=1;
            if(t===14) t=2;
            if(t===15) t=3;
            if(t===16) t=4;
            if(t===17) t=5;
            if(t===18) t=6;
            if(t===19) t=7;
            if(t===20) t=8;
            if(t===21) t=9;
            if(t===22) t=10;
            if(t===23) t=11;
        }
        if(start.getMinutes()<10) {
            i='0'+start.getMinutes();
        }
        else i=start.getMinutes();
        return t+':'+i+' '+a;
    };

    // timestamp
    static boolDate(timestamp) {
        if(!timestamp || timestamp===0 || timestamp===null || timestamp==='') return 'NO';
        timestamp=timestamp*1000;
        let m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let start=new Date(timestamp);
        let a,i,t=start.getHours();
        if(start.getHours()<12) a='am';
        else {
            a='pm';
            if(t===13) t=1;
            if(t===14) t=2;
            if(t===15) t=3;
            if(t===16) t=4;
            if(t===17) t=5;
            if(t===18) t=6;
            if(t===19) t=7;
            if(t===20) t=8;
            if(t===21) t=9;
            if(t===22) t=10;
            if(t===23) t=11;
        }
        if(start.getMinutes()<10) {
            i='0'+start.getMinutes();
        }
        else i=start.getMinutes();
        return 'YES ['+m[start.getMonth()]+' '+start.getDate()+', '+start.getFullYear()+' - '+t+':'+i+' '+a+']';
    };

    static fileSize(bytes) {
        let decimals=2;
        if (!+bytes) return '0 Bytes'

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    static numberNotation(number,metricAttributes) {
        if(metricAttributes && metricAttributes.notation==='short') {
            let decimals=1;
            if (!+number) return '0'

            const k = 1000
            const dm = decimals < 0 ? 0 : decimals
            const sizes = ['', 'K', 'M', 'B']

            const i = Math.floor(Math.log(number) / Math.log(k))

            return `${parseFloat((number / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`
        }
        else return number;
    }

    static audioTime(t) {
        function padZero(v) {
            return (v < 10) ? "0" + v : v;
        }
        return padZero(parseInt((t / (60 * 60)) % 24)) + ":" + padZero(parseInt((t / (60)) % 60)) + ":" + padZero(parseInt((t) % 60));
    }
}
class T {

    // parse nulls
    static t(text) {
        if(!text) return '';
        if(text==='null') return '';
        if(text==null || text=='') return '';
        if(typeof text===undefined) return '';
        else return text;
    };

    static nullFloat(text) {
        if(!text) return '0.00';
        if(text==='null') return '0.00';
        if(text==null || text=='') return '0.00';
        if(typeof text===undefined) return '0.00';
        else return text;
    };

    // shorten text
    static s(text,limit) {
        if(text===null) return "";
        if(text.split("").length>limit) return text.substr(0,limit)+" ...";
        else return text;
    };

    // check empty
    static e(text) {
        if(text===null || text==='' || !text) return true;
        else return false;
    }

    static e404(url) {
        let http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        if(http.status===404) return true;
        else return false;
    };

    static yn(val) {
        if(parseInt(val)===1) return 'YES';
        else return 'NO';
    };

    static nullOrNot(val) {
        if(val) return 'YES';
        else return 'NO';
    };

    static finishTime(startTime,hours) {
        let today=new Date(startTime).getTime()/1000;
        let nextDate=today+(hours*3600);
        let finishTime=new Date(nextDate*1000);
        return finishTime.toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true});
    };

    static isPrimary(isPrimary) {
        if(isPrimary===1) return '<span class="contentListTag contentListTagGreen">Primary</span>';
        else return '<span class="contentListTag">Backup</span>';
    };
    static active(active) {
        if(active===1) return '<span class="contentListTag contentListTagGreen">Active</span>';
        else return '<span class="contentListTag">Inactive</span>';
    };
    static required(required) {
        if(required===1) return 'Required';
        else return 'Optional';
    };
    static tagColor(hexColor) {
        const hex = hexColor.replace('#', '');
        const c_r = parseInt(hex.substr(0, 2), 16);
        const c_g = parseInt(hex.substr(2, 2), 16);
        const c_b = parseInt(hex.substr(4, 2), 16);
        const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
        //return brightness > 155;
        if((brightness < 155)) return '#FFFFFF';
        else return '#222222';
    };
    static isMe(userId) {
        if(userId===currentUser.id) return ' <span class="contentListTag">Me</span>';
        else return '';
    };
    static isOwner(isOwner) {
        if(parseInt(isOwner)===1) return ' <span class="contentListTag">Owner</span>';
        else return '';
    };

    static isAdmin(isAdmin) {
        if(parseInt(isAdmin)===1) return ' <span class="contentListTag">Admin</span>';
        else return '';
    };
    static isCurrent(isCurrent) {
        if(parseInt(isCurrent)===1) return ' <span class="contentListTag">This Session</span>';
        else return '';
    };
    static isDefault(isDefault) {
        if(parseInt(isDefault)===1) return ' <span class="contentListTag">Default</span>';
        else return '';
    };
    static sourceMethod(method) {
        if(method) return '<span class="contentListTag">'+method.toUpperCase()+'</span> ';
        else return '';
    };
    static isObjectEmpty(obj) {
        for(const prop in obj) {
            if(Object.hasOwn(obj,prop)) {
                return false;
            }
        }
        return true;
    }
    static hasParam(obj,param) {
        if(obj) {
            if(obj[param]) return obj[param];
        }
        return 'n/a';
    }
}
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
class C {
    static date(year,month,day) {
        let start=new Date(year,month,day);
        let m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let d=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        let timestamp=Math.floor(start.getTime()/1000);
        let startMonth,monthS,dayS;
        startMonth=start.getMonth()+1;
        //
        if(startMonth<10) monthS='0'+startMonth;
        else monthS=startMonth;
        //
        if(start.getDate()<10) dayS='0'+start.getDate();
        else dayS=start.getDate();
        //
        return {"day":dayS,"name":d[start.getDay()],"dayNumber":start.getDay(),"monthNumber":monthS,"month":m[start.getMonth()],"year":start.getFullYear(),"date":start.getFullYear()+'-'+monthS+'-'+dayS,"safeDate":start.getFullYear()+'-'+monthS+'-'+dayS,"timestamp":timestamp};
    };
    static dates(year,month) {
        return new Date(year,month+1,0).getDate();
    };
    static month(year,month) {
        let start=new Date(year,month+1,0);
        let m=["January","February","March","April","May","June","July","August","September","October","November","December"];
        return m[start.getMonth()];
    };
    static m(year,month) {
        let start=new Date(year,month+1,0);
        let m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return m[start.getMonth()];
    };
    static day(dayNumber) {
        let d=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        return d[dayNumber];
    };

    static safeDate(date) {
        let parts=date.match(/(\d+)/g);
        let start=new Date(parts[0],parts[1]-1,parts[2]);
        //
        let startMonth,monthS,dayS;
        startMonth=start.getMonth()+1;
        //
        if(startMonth<10) monthS='0'+startMonth;
        else monthS=startMonth;
        //
        if(start.getDate()<10) dayS='0'+start.getDate();
        else dayS=start.getDate();
        //
        return start.getFullYear()+'-'+monthS+'-'+dayS;
    };
}

// json
class A  {
    //
    static r(method,path,payload,callback) {
        let request=new XMLHttpRequest();
        request.onreadystatechange=()=>{
            if(request.readyState===4 && request.status===200) {
                let responseData=JSON.parse(request.responseText);
                callback(responseData.error,responseData.data);
            }
        };
        this.send(method,path,request,payload);
    };
    static send(method,path,request,payload) {
        let query='';
        if(method==='GET' && payload) {
            query='?';
            for(const [key, value] of Object.entries(payload)) {
                query=query+'&'+key+'='+value;
            }
        }
        request.open(method,apiUrl+path+query,true);
        if(method!=='GET') request.setRequestHeader('Content-Type','application/json');
        request.setRequestHeader('Access-Control-Allow-Headers','*');
        request.setRequestHeader('Public-Token',publicToken);
        //request.setRequestHeader('Public-Token','test1234567890');
        if(method!=='GET') request.send(JSON.stringify(payload));
        else request.send();
    }
}

// multipart-form
class A2  {
    //
    static r(method,path,form,callback) {
        let request=new XMLHttpRequest();
        request.onreadystatechange=()=>{
            if(request.readyState===4 && request.status===200) {
                let responseData=JSON.parse(request.responseText);
                callback(responseData.error,responseData.data);
            }
        };
        this.send(method,path,request,form);
    };
    static send(method,path,request,form) {
        request.open(method,apiUrl+path,true);
        //request.setRequestHeader('Content-Type','multipart/form-data');
        //request.setRequestHeader('Accept','multipart/form-data');
        //request.setRequestHeader('Content-Type','boundary=&');
        request.setRequestHeader('Access-Control-Allow-Headers','*');
        request.setRequestHeader('Public-Token',publicToken);
        //request.setRequestHeader('Public-Token','test1234567890');
        request.send(form);
    }
}

// public token
class P {
    static pt(callback) {
        let cookies=document.cookie.split(";");
        let found=false;
        for(let i=0;i<cookies.length;i++) {
            if(cookies[i].indexOf("persys_pt")>-1) found=cookies[i].split("=")[1];
        }
        callback(found);
    };
    static host(callback) {
        let cookies=document.cookie.split(";");
        let found=false;
        for(let i=0;i<cookies.length;i++) {
            if(cookies[i].indexOf("persys_host")>-1) found=cookies[i].split("=")[1];
        }
        callback(found);
    };
}