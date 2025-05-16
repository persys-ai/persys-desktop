class CardclipInterface extends I {
    static cardclip() {
        let cardclip=E.div(body,'','page_Cardclip');
        let cards=E.div(cardclip,'','cardclipCards');

        let rag=E.div(cardclip,'','cardclipRagButton');
        rag.innerHTML=ragIcon;
        rag.onclick=()=>{
            if(cardsList && cardsList.length>0) {
                let ragArray=[];
                for(let i=0;i<cardsList.length;i++) {
                    ragArray.push('Contact First Name: '+cardsList[i].firstName+'. Contact Last Name: '+cardsList[i].lastName+'. Contact Phone Number: '+cardsList[i].phone+'. Contact Email: '+cardsList[i].email);
                }
                I.rag(rag,'App_CardClip','These are my contacts.',ragArray);
            }
            else I.error('I need more information.');
        };

        let cardsList=[];
        A.r('POST','/cardclip/get',{},(error,data)=>{
            if(!error) {
                if(data && data.length>0) {
                    data.forEach((dataItem)=>{
                        cardsList.push(dataItem);
                        cardItem(cards,dataItem);
                    });
                    //
                    search.onkeydown=()=>{
                        I.searchBox(cards,'cardclipCard',search.value)
                    };
                }
            }
            else I.error(error);
        });

        function cardItem(cards,cardData) {
            let card=E.div(cards,'cardclipCard','');
            //
            let thumb=E.img(card,'cardclipCardThumb','','cardclip.png');
            if(cardData.thumb) thumb.src=apiUrl+'/cardclip/get-thumb/?publicToken='+publicToken+'&cardId='+cardData.id;
            let name=E.div(card,'cardclipCardRow cardclipCardRowPrimary','');
            //
            let fName=E.div(name,'cardclipCardPrimary','');
            fName.contentEditable=true;
            let lName=E.div(name,'cardclipCardPrimary','');
            lName.contentEditable=true;
            let phone=E.div(card,'cardclipCardRow cardclipCardSecondary','');
            phone.contentEditable=true;
            let email=E.div(card,'cardclipCardRow cardclipCardSecondary','');
            email.contentEditable=true;
            //
            if(cardData.firstName) fName.innerHTML=T.s(cardData.firstName,15);
            if(cardData.lastName) lName.innerHTML=T.s(cardData.lastName,15);
            if(cardData.phone) phone.innerHTML=T.s(cardData.phone,15);
            if(cardData.email) email.innerHTML=T.s(cardData.email,18);
            //
            let opt=E.button(card,'cardclipCardOpt','','<i class="fa-solid fa-ellipsis"></i>');
            opt.onclick=(e)=>{
                CardclipInterface.cardclipOptions(e,cardData,(newData,action)=>{
                    if(action==='deleted') cards.removeChild(card);
                });
            };
            //
            fName.onkeyup=()=>{
                updateCard();
            };
            lName.onkeyup=()=>{
                updateCard();
            };
            phone.onkeyup=()=>{
                updateCard();
            };
            email.onkeyup=()=>{
                updateCard();
            };
            thumb.onclick=()=>{
                updateThumb();
            };
            function updateCard() {
                let p={id:cardData.id,firstName:fName.innerHTML,lastName:lName.innerHTML,phone:phone.innerHTML,email:email.innerHTML,thumb:cardData.thumb};
                A.r('POST','/cardclip/update',p,(error,data)=>{
                    if(!error) {}
                    else I.error(error);
                });
            };
            function updateThumb() {
                let f=E.file(card,'','');
                f.click();
                f.onchange=()=>{
                    let form=new FormData();
                    form.append('id',cardData.id);
                    form.append('file',f.files[0]);
                    form.append('fileName',f.files[0].name);
                    A2.r('POST','/cardclip/upload-thumb',form,(error,data)=>{
                        if(!error) {
                            card.removeChild(f);
                            thumb.src=apiUrl+'/cardclip/get-thumb/?publicToken='+publicToken+'&cardId='+cardData.id+'&v?='+Math.random();
                        }
                        else I.error(error);
                    });
                };
            };
        }

        let actions=E.div(cardclip,'','cardclipActions');
        let search=E.input(actions,'search','','cardclipActionsSearch','Search cards');
        let add=E.button(actions,'','cardclipActionsAdd','<i class="fa-solid fa-plus"></i>')
        add.onclick=()=>{
            let card=E.div(cards,'cardclipCard','');
            let firstName=E.input(card,'text','cardclipCardInput','','First Name');
            let lastName=E.input(card,'text','cardclipCardInput','','Last Name');
            let phone=E.input(card,'tel','cardclipCardInput','','Phone');
            let email=E.input(card,'email','cardclipCardInput','','Email');
            let button=E.button(card,'cardclipCardButton','','Add Card');
            button.onclick=()=>{
                let p={
                    firstName:firstName.value,
                    lastName:lastName.value,
                    phone:phone.value,
                    email:email.value,
                    thumb:false
                };
                A.r('POST','/cardclip/create',p,(error,data)=>{
                    if(!error) {
                        cards.removeChild(card);
                        cardItem(cards,data);
                    }
                    else I.error(error);
                });
            };
            //
            let close=E.button(card,'cardclipCardAddClose','','<i class="fa-solid fa-xmark"></i>');
            close.onclick=()=>{
                cards.removeChild(card)
            };
            //
            card.scrollIntoView();
        };

        //
    };

    static cardclipOptions(e,cardData,callback) {
        e.preventDefault();
        I.hideFloaters();
        let p=e.target.getBoundingClientRect();
        let m=E.div(body,'floaterMenu','');
        m.style.top=p.top+window.scrollY+20+'px';
        m.style.left=p.left+window.scrollX+20+'px';
        let t=E.table(m,'floaterMenuTable','','center','100%');
        //
        let removeTr=E.tableR(t);
        let remove=E.div(E.tableC(removeTr,''),'floaterMenuItem','');
        remove.innerHTML='Delete';
        remove.onclick=(e)=>{
            I.confirmFloater(e,(c)=>{
                if(c) {
                    A.r('POST','/cardclip/delete',cardData,(error,data)=>{
                        if(!error) {
                            I.hideFloaters();
                            callback({},'deleted');
                        }
                        else I.error(error);
                    });
                }
            });
        };
    };
}