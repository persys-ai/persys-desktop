class RagInterface extends I {
    static rag(file) {
        let rag=E.div(body,'','page_Rag');
        let response=E.div(rag,'','ragResponse');
        let input=E.div(rag,'','ragInput');

        let inputTable=E.table(input,'','','center','100%');
        let inputTr=E.tableR(inputTable);
        let inputField=E.input(E.tableC(inputTr,'90%'),'text','','inputField','Ask away...');
        let inputButton=E.button(E.tableC(inputTr,'10%'),'','inputButton','<i class="fa-solid fa-arrow-up"></i>');

        function send() {
            response.innerHTML='';
            let inputData=inputField.value;
            inputField.value='';
            let responseTable=E.table(response,'','chatTable','center','100%');
            let i=E.div(E.tableC(E.tableR(responseTable),''),'inputText','');
            i.innerHTML=inputData;
            let r=E.div(E.tableC(E.tableR(responseTable),''),'responseText','');
            A.r('POST','/embeddings/rag',{name:file.name,input:inputData},(error,data)=>{
                let peer=new Peer(publicToken,ragStreamConfig);
                if(!error) {
                    peer.on('open', (id)=>{
                        E.img(r,'','chatLoading','loading.gif');
                        let j=0;
                        peer.socket._socket.addEventListener('message',message =>{
                            if(j===0) r.innerHTML='';
                            r.innerHTML=r.innerHTML+JSON.parse(message.data).content.replace('\n','<br/>');
                            j++;
                            if(JSON.parse(message.data).done) {
                                peer.destroy();
                            }
                        });
                    });
                }
                else I.error(error);
            });
        }
        inputField.onkeydown=(e)=>{
            if(e.keyCode===13) send();
        };
        inputButton.onclick=()=>{
            send();
        };
    }
}