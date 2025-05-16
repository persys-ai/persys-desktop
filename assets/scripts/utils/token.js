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

class Token {
    static get(tokenName) {
        let cookies=document.cookie.split(";");
        let found=false;
        for(let i=0;i<cookies.length;i++) {
            if(cookies[i].indexOf(tokenName)>-1) found=cookies[i].split("=")[1];
        }
        return found;
    };
}