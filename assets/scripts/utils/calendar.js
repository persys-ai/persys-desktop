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