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