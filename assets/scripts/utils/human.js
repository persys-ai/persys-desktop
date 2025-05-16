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