class PlaintextInterface extends I {
    static plaintext(file) {
        let text=E.div(body,'','page_Plaintext');
        let actions=E.div(text,'','plaintextActions');
        let content=E.div(text,'','plaintextContent');
        content.contentEditable=true;

        let fileName=E.input(actions,'text','','plaintextActionsFileName','File Name');
        let saveButton=E.button(actions,'','plaintextActionsSave','Save');

        let rag=E.div(text,'','plaintextRagButton');
        rag.innerHTML=ragIcon;
        rag.onclick=()=>{
            let document=content.innerHTML.replace('\n','').split('. ');
            let ragArray=[];
            if(document && document.length>0) {
                for(let i=0;i<document.length;i++) {
                    if(document[i].length>1) ragArray.push(document[i].replace(/<\/?[^>]+(>|$)/g, ""));
                }
                I.rag(rag,fileName.value,'',ragArray);
            }
            else I.error('More context needed.');

        };

        saveButton.onclick=()=>{
            let fileBlob=new Blob([content.innerHTML],{type:'text/plain'});
            let form=new FormData();
            form.append('fileName',fileName.value);
            form.append('path',file.path);
            form.append('file',fileBlob);
            A2.r('POST','/files/upload',form,(error,data)=>{
                if(!error) {
                    I.success('Plaintext file saved.');
                }
                else I.error(error);
            });
        };

        if(file.file) {
            A.r('POST','/files/plaintext',file,(error,data)=>{
                if(!error) {
                    fileName.value=file.file.name;
                    content.innerHTML=atob(data);
                }
                else I.error(error);
            });
        }
    }
}