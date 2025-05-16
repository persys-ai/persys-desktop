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