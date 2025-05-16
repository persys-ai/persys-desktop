class LoginInterface extends I {
    static login(hostCache) {
        I.containers();
        let id='login';
        if(!E.get(id)) {
            let login=E.div(body,'container',id);

            let loginBox=E.div(login,'','loginBox');
            let table=E.table(loginBox,'','','center','100%');
            E.img(E.tableC(E.tableR(table),''),'loginIcon','','device.png');
            E.div(E.tableC(E.tableR(table),''),'loginTitle','').innerHTML='Welcome to Persys';
            E.div(E.tableC(E.tableR(table),''),'loginBlurb','').innerHTML='Login with your passcode.';
            let host=E.input(E.tableC(E.tableR(table),'100%'),'text','loginField','','Device ID')
            if(hostCache) host.value=hostCache;
            let passcode=E.input(E.tableC(E.tableR(table),'100%'),'password','loginField','','Passcode')
            let button=E.button(E.tableC(E.tableR(table),'100%'),'loginButton','','Log in');

            button.onclick=async ()=>{
                await send();
            }
            host.onkeydown=async (e)=>{
                if(e.keyCode===13) await send();
            };
            passcode.onkeydown=async (e)=>{
                if(e.keyCode===13) await send();
            };

            async function send() {
                if(host.value && passcode.value) {
                    apiRoot=host.value;
                    apiUrl='http://'+apiRoot+':3000';
                    //
                    //
                    try {
                        const api=new API('');
                        const data=await api.request('POST','/authenticate',{passcode:sha256_digest(passcode.value)});
                        persys.setCookie({host:apiRoot,name:'host',value:apiRoot});
                        persys.setCookie({host:apiRoot,name:'publicToken',value:data});
                        persys.launch();
                    }
                    catch(err) {
                        I.error(err);
                    }
                }
                else {
                    if(!host.value) I.error('Host name is required');
                    if(!passcode.value) I.error('Passcode is required');
                }
            }
        }
        E.get(id).style.display='block';
    };
}