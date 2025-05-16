class TodoInterface extends I {
    static todo() {
        let todo=E.div(body,'','page_Todo');
        let list=E.div(todo,'','todoList');
        let calendar=E.div(todo,'','todoCalendar');

        E.div(list,'','todoListTitle');
        let add=E.button(list,'','todoListAdd','<i class="fa-solid fa-plus"></i>');
        add.onclick=()=>{
            let addTable=E.table(listBox,'','todoListAddTable','center','');
            let tr=E.tableR(addTable);
            let text=E.input(E.tableC(tr,'85%'),'text','todoListItemAddText','','New Item');
            text.focus();
            let button=E.button(E.tableC(tr,'10%'),'todoListItemAddButton','','Add');
            let close=E.button(E.tableC(tr,'5%'),'todoListItemAddClose','','<i class="fa-solid fa-xmark"></i>');
            close.onclick=()=>{
                listBox.removeChild(addTable)
            };
            text.onkeydown=(e)=>{
                if(e.keyCode===13) addTodo();
            };
            button.onclick=()=>{addTodo();};
            function addTodo() {
                A.r('POST','/todo/create',{text:text.value,checked:false,date:currentDate.date},(error,data)=>{
                    if(!error) {
                        listBox.removeChild(addTable)
                        listTodos(currentDate);
                    }
                    else I.error(error);
                });
            }
        };
        let rag=E.div(list,'','todoListRagButton');
        rag.innerHTML=ragIcon;
        rag.onclick=()=>{
            if(currentList && currentList.length>0) {
                let ragArray=[];
                for(let i=0;i<currentList.length;i++) {
                    ragArray.push('To Do Item: "'+currentList[i].text+'". Due Date: '+currentList[i].date+'. Is complete: '+T.yn(currentList[i].checked));
                }
                I.rag(rag,'App_ToDo','This is my to do list for the day',ragArray);
            }
            else I.error('Pick a date with to-do items.');
        };

        let listBox=E.div(list,'','todoListBox');
        let listTable=E.table(listBox,'','todoListTable','center','');
        let currentList=[];
        function listTodos(showDate) {
            listTable.innerHTML='';
            A.r('POST','/todo/get',{},(error,data)=>{
                if(!error) {
                    if(data && data.length>0) {
                        data.forEach((dataItem)=>{
                            if(dataItem.date===showDate.date) {
                                currentList.push(dataItem);
                                let tr=E.tableR(listTable);
                                let check=E.checkbox(E.tableC(tr,'10%'),'todoListItemCheckbox','');
                                check.onchange=()=>{
                                    updateTodo();
                                };
                                let text=E.div(E.tableC(tr,'85%'),'todoListItemText','','Item');
                                text.contentEditable=true;
                                text.innerHTML=dataItem.text;
                                text.onkeyup=(e)=>{
                                    updateTodo();
                                };
                                text.onkeydown=(e)=>{
                                    if(e.keyCode===13) e.preventDefault();
                                };
                                if(dataItem.checked) {
                                    text.style.color='#999999';
                                    check.checked=true;
                                }
                                let opt=E.button(E.tableC(tr,'5%'),'todoListItemOpt','','<i class="fa-solid fa-ellipsis"></i>');
                                opt.onclick=(e)=>{
                                    TodoInterface.todoOptions(e,dataItem,(newData,action)=>{
                                        if(action==='deleted') listTable.deleteRow(tr.rowIndex);
                                    });
                                };
                                function updateTodo() {
                                    A.r('POST','/todo/update',{id:dataItem.id,checked:check.checked,text:text.innerHTML},(error,data)=>{
                                        if(!error) {}
                                        else I.error(error);
                                    });
                                }
                            }
                        });
                    }
                }
                else I.error(error);
            });
        }


        let currentDate={};
        let calendarOptions=E.div(calendar,'','todoCalendarOptions');
        let selectYear=E.select(calendarOptions,'','todoCalendarOptionsSelect',[]);
        for(let i=2024;i<2035;i++) {
            let o=E.option(selectYear,i,i);
            if(i===new Date().getFullYear()) o.selected=true;
        }
        //
        let calendarGrid=E.div(calendar,'','todoCalendarGrid');
        function showCalendar(selectedYear) {
            calendarGrid.innerHTML='';
            A.r('POST','/todo/get',{},(error,data)=>{
                let deviceStartYear=2024;
                let k=selectedYear;
                let deviceStartMonth=1;
                let deviceStartDay=1;
                for(let j=0;j<12;j++) { //month
                    if(j<parseInt(deviceStartMonth-1) && k===deviceStartYear) continue;
                    E.div(calendarGrid,'calendarMonth','calendarMonth'+j+k).innerHTML=C.month(k,j);
                    let calendarTable=E.table(calendarGrid,'calendarTable','','center','95%');
                    for(let i=1;i<=C.dates(k,j);i++) {
                        let tr;
                        if(calendarTable.rows.length===0) tr=E.tableR(calendarTable);
                        else if(calendarTable.rows[calendarTable.rows.length-1].cells.length>=7) tr=E.tableR(calendarTable);
                        else tr=calendarTable.rows[calendarTable.rows.length-1];
                        let dateCell=E.tableC(tr,'14%');
                        let datePayload=C.date(k,j,i);
                        //
                        if(dateCell.cellIndex===datePayload.dayNumber) {
                            let date=E.div(dateCell,'calendarItem','');
                            date.innerHTML="<div class='calendarItemDay'>"+datePayload.day+"<span class='calendarItemDot'><i class='fa-solid fa-circle'></i></span></div><div class='calendarItemMonth'>"+datePayload.name+"</div>";
                            //
                            date.onclick=()=>{
                                for(let z=0;z<E.fetch('className','calendarItem').length;z++) {
                                    E.fetch('className','calendarItem')[z].style.background='transparent';
                                    E.fetch('className','calendarItem')[z].style.color='#CCCCCC';
                                }
                                date.style.background='#86B5B5';
                                date.style.color='#222222';
                                currentDate=datePayload;
                                E.get('todoListTitle').innerHTML=datePayload.date;
                                listTodos(datePayload);
                            };
                            // if date is in the past
                            if(datePayload.timestamp<C.date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).timestamp) {
                                if(data) {
                                    let c=data.reduce((n,val)=>{
                                        return n+(val.date===datePayload.date && val.checked!==true);
                                    },0);
                                    if(c>0) E.fetch2(date,'className','calendarItemDot')[0].style.color='#E83A3A';
                                }
                            }
                            else {
                                if(data) {
                                    let c=data.reduce((n,val)=>{
                                        return n+(val.date===datePayload.date && val.checked!==true);
                                    },0);
                                    if(c>0) E.fetch2(date,'className','calendarItemDot')[0].style.color='#86B5B5';
                                }
                            }
                            //
                            // today's date
                            if(datePayload.timestamp===C.date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).timestamp) {
                                date.style.border='1px solid #86B5B5';
                                date.click();
                            }
                            //
                        }
                        else {
                            i--;
                        }
                        //
                    }
                }
                E.get('calendarMonth'+parseInt(new Date().getMonth())+parseInt(new Date().getFullYear())).scrollIntoView();
                E.get('calendarMonth'+parseInt(new Date().getMonth())+parseInt(new Date().getFullYear())).style.background='#86B5B5';
                E.get('calendarMonth'+parseInt(new Date().getMonth())+parseInt(new Date().getFullYear())).style.color='#222222';
            });
        };
        showCalendar(new Date().getFullYear());
        selectYear.onchange=()=>{
            showCalendar(parseInt(selectYear.value));
        };
    };

    static todoOptions(e,todoItem,callback) {
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
                    A.r('POST','/todo/delete',todoItem,(error,data)=>{
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