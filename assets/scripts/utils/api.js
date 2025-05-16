// v1
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

//

/**
 * API
 */
class API {
    constructor(publicToken) {
        this.apiBase=apiUrl;
        this.apiVersion=env.apiVersion;
        this.clientPlatform=env.clientPlatform;
        this.clientVersion=env.clientVersion;
        this.publicToken=publicToken;
    }

    async request(method,path,payload) {
        try {
            //const response = await fetch(this.apiBase+this.apiVersion+path,{
            const response = await fetch(this.apiBase+path,{
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers':'*',
                    'Public-Token':this.publicToken,
                    'Client-Platform':this.clientPlatform,
                    'Client-Version':this.clientVersion,
                },
                body: JSON.stringify(payload),
            });
            const responseJson=await response.json();
            if(responseJson.error) throw new Error(responseJson.error);
            return responseJson.data;
        }
        catch(error) {
            throw error;
        }
    };
}