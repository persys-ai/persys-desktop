class SettingsInterface extends I {
    static settings() {
        let personalities=E.div(body,'','page_Options');

        let list=E.div(personalities,'','optionsList');
        let settings=E.div(personalities,'','optionsSettings');

        let listTable=E.table(list,'','optionsListTable','center','90%');
        //
        let aboutTr=E.tableR(listTable);
        let about=E.div(E.tableC(aboutTr,'90%'),'optionsListItem','');
        about.innerHTML='About';
        about.onclick=()=>{
            toggle(aboutTr);
            SettingsInterface.about(settings);
        };
        about.click();
        //
        let wallpaperTr=E.tableR(listTable);
        let wallpaper=E.div(E.tableC(wallpaperTr,'90%'),'optionsListItem','');
        wallpaper.innerHTML='Wallpaper';
        wallpaper.onclick=()=>{
            toggle(wallpaperTr);
            SettingsInterface.wallpaper(settings);
        };
        //
        let modelsTr=E.tableR(listTable);
        let models=E.div(E.tableC(modelsTr,'90%'),'optionsListItem','');
        models.innerHTML='Models';
        models.onclick=()=>{
            toggle(modelsTr);
            SettingsInterface.models(settings);
        };
        //
        let passcodeTr=E.tableR(listTable);
        let passcode=E.div(E.tableC(passcodeTr,'90%'),'optionsListItem','');
        passcode.innerHTML='Passcode';
        passcode.onclick=()=>{
            toggle(passcodeTr);
            SettingsInterface.passcode(settings);
        };
        //
        let sessionsTr=E.tableR(listTable);
        let sessions=E.div(E.tableC(sessionsTr,'90%'),'optionsListItem','');
        sessions.innerHTML='Sessions';
        sessions.onclick=()=>{
            toggle(sessionsTr);
            SettingsInterface.sessions(settings);
        };
        //
        let wifiTr=E.tableR(listTable);
        let wifi=E.div(E.tableC(wifiTr,'90%'),'optionsListItem','');
        wifi.innerHTML='WiFi';
        wifi.onclick=()=>{
            toggle(wifiTr);
            SettingsInterface.wifi(settings);
        };
        //
        let firmwareTr=E.tableR(listTable);
        let firmware=E.div(E.tableC(firmwareTr,'90%'),'optionsListItem','');
        firmware.innerHTML='Firmware';
        firmware.onclick=()=>{
            toggle(firmwareTr);
            SettingsInterface.firmware(settings);
        };
        //
        let servicesTr=E.tableR(listTable);
        let services=E.div(E.tableC(servicesTr,'90%'),'optionsListItem','');
        services.innerHTML='Services';
        services.onclick=()=>{
            toggle(servicesTr);
            SettingsInterface.services(settings);
        };

        function toggle(focus) {
            settings.innerHTML='';
            for(let i=0;i<listTable.rows.length;i++) {
                listTable.rows[i].style.background='transparent';
            }
            focus.style.background='#434343';
        }
    };
    //
    static about(box) {
        E.div(box,'optionsSettingsTitle','').innerHTML='Persys (Personal System)';
        let settingsTable=E.table(box,'optionsSettingsTable','','center','');

        A.r('POST','/about',{},(error,data)=>{
            if(!error) {
                if(data) {
                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsLabel','').innerHTML='Device Name';
                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsListItem','').innerHTML=data.deviceName;

                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsLabel','').innerHTML='WiFi SSID';
                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsListItem','').innerHTML=data.deviceName;

                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsLabel','').innerHTML='Firmware Version';
                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsListItem','').innerHTML=data.firmwareVersion;

                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsLabel','').innerHTML='Client Version';
                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsListItem','').innerHTML=env.clientVersion;

                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsLabel','').innerHTML='Serial Number';
                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsListItem','').innerHTML=data.serialNumber;

                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsLabel','').innerHTML='<br/>';
                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsListItem','').innerHTML='<br/>';

                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsLabel','').innerHTML='AdulisAI, Inc.';
                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsLabel','').innerHTML='All Rights Reserved &copy; '+new Date().getFullYear();
                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsLabel','').innerHTML='support@persys.ai';
                    E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsLabel','').innerHTML='persys.ai';
                }
            }
            else I.error(error);
        });
    };
    static wallpaper(box) {
        let settingsTable=E.table(box,'optionsSettingsTable','','center','');

        E.div(E.tableR(settingsTable),'optionsSettingsLabel','').innerHTML='Current Wallpaper';
        let thumb=E.img(E.tableC(E.tableR(settingsTable),''),'optionsSettingsThumb','',apiUrl+"/wallpapers/current/?publicToken="+publicToken);

        E.div(E.tableR(settingsTable),'optionsSettingsLabel','').innerHTML='Previous Wallpapers';
        let inactive=E.div(E.tableC(E.tableR(settingsTable),''),'optionsSettingsThumbList','');
        function showWallpapers() {
            inactive.innerHTML='';
            A.r('POST','/wallpapers/list',{},(error,data)=>{
                if(!error) {
                    if(data && data.length>0) {
                        data.forEach((dataItem)=>{
                            let img=E.img(inactive,'optionsSettingsThumbSmall','',apiUrl+"/wallpapers/get/?publicToken="+publicToken+'&fileName='+dataItem.name);
                            img.onclick=(e)=>{
                                SettingsInterface.wallpaperOptions(e,dataItem,(newData,action)=>{
                                    if(action==='activated') {
                                        thumb.src=apiUrl+"/wallpapers/get/?publicToken="+publicToken+'&fileName='+dataItem.name;
                                    }
                                    else if(action==='deleted') inactive.removeChild(img);
                                });
                            };
                        });
                    }
                }
                else I.error(error);
            });
        }
        showWallpapers();

        E.div(E.tableR(settingsTable),'optionsSettingsLabel','').innerHTML='<br/>';

        E.div(E.tableR(settingsTable),'optionsSettingsLabel','').innerHTML='Upload Wallpaper';
        let trigger=E.input(E.tableR(settingsTable),'text','optionsSettingsUploadTrigger','','Select Image File');
        trigger.readOnly=true;

        let f=E.file(box,'','');
        trigger.accept='image/*';
        trigger.onclick=()=>{
            f.click();
        };
        f.onchange=()=>{
            upload(f.files[0]);
        };
        function upload(f) {
            let form=new FormData();
            form.append('fileName',f.name);
            form.append('file',f);
            A2.r('POST','/wallpapers/upload',form,(error,data)=>{
                if(!error) {
                    I.success('Wallpaper updated');
                    thumb.src=apiUrl+"/wallpapers/current/?publicToken="+publicToken+'&v='+Math.random();
                    showWallpapers();
                }
                else I.error(error);
            });
        }

    };
    static models(box) {
        E.div(box,'optionsSettingsTitle','').innerHTML='Active Models';
        let currentTable=E.table(box,'optionsSettingsTable','','center','90%');
        function activeModels() {
            currentTable.innerHTML='';
            let headerTr=E.tableR(currentTable);
            E.div(E.tableC(headerTr,'90%'),'optionsSettingsLabel','').innerHTML='Model';
            E.div(E.tableC(headerTr,'10%'),'optionsSettingsLabel','').innerHTML='Size';
            E.div(E.tableC(headerTr,'10%'),'optionsSettingsLabel','').innerHTML='Quant';
            E.div(E.tableC(headerTr,'10%'),'optionsSettingsLabel','').innerHTML='';
            A.r('POST','/models/ps',{},(error,data)=>{
                if(!error) {
                    if(data && data.length>0) {
                        data.forEach((dataItem)=>{
                            let tr=E.tableR(currentTable);
                            E.div(E.tableC(tr,'90%'),'optionsSettingsListItem','').innerHTML=dataItem.name;
                            E.div(E.tableC(tr,'10%'),'optionsSettingsListItem','').innerHTML=dataItem.details.parameter_size;
                            E.div(E.tableC(tr,'10%'),'optionsSettingsListItem','').innerHTML=dataItem.details.quantization_level;
                            let opt=E.div(E.tableC(tr,'10%'),'optionsSettingsListOpt','');
                            opt.innerHTML=optIcon;
                            opt.onclick=(e)=>{
                                SettingsInterface.activeModelOptions(e,dataItem,(newData,action)=>{
                                    if(action==='stopped') currentTable.deleteRow(tr.rowIndex);
                                });
                            };
                        });
                    }
                }
                else I.error(error);
            });
        }
        activeModels();

        E.div(box,'optionsSettingsTitle','').innerHTML='Installed Models';
        let allTable=E.table(box,'optionsSettingsTable','','center','90%');
        function installedModels() {
            let headerAllTr=E.tableR(allTable);
            E.div(E.tableC(headerAllTr,'90%'),'optionsSettingsLabel','').innerHTML='Model';
            E.div(E.tableC(headerAllTr,'10%'),'optionsSettingsLabel','').innerHTML='Size';
            E.div(E.tableC(headerAllTr,'10%'),'optionsSettingsLabel','').innerHTML='Quant';
            E.div(E.tableC(headerAllTr,'10%'),'optionsSettingsLabel','').innerHTML='';
            A.r('POST','/models/list',{},(error,data)=>{
                if(!error) {
                    if(data && data.length>0) {
                        data.forEach((dataItem)=>{
                            let tr=E.tableR(allTable);
                            E.div(E.tableC(tr,'90%'),'optionsSettingsListItem','').innerHTML=dataItem.name;
                            E.div(E.tableC(tr,'10%'),'optionsSettingsListItem','').innerHTML=dataItem.details.parameter_size;
                            E.div(E.tableC(tr,'10%'),'optionsSettingsListItem','').innerHTML=dataItem.details.quantization_level;
                            let opt=E.div(E.tableC(tr,'10%'),'optionsSettingsListOpt','');
                            opt.innerHTML=optIcon;
                            opt.onclick=(e)=>{
                                SettingsInterface.installedModelOptions(e,dataItem,(newData,action)=>{
                                    if(action==='created') activeModels();
                                });
                            };
                        });
                    }
                }
                else I.error(error);
            });
        }
        installedModels();

    };
    static passcode(box) {
        let settingsTable=E.table(box,'optionsSettingsTable','','center','');

        E.div(E.tableR(settingsTable),'optionsSettingsLabel','').innerHTML='Current Passcode';
        let currentPasscode=E.input(E.tableR(settingsTable),'password','optionsSettingsInput','','Current Passcode');

        E.div(E.tableR(settingsTable),'optionsSettingsLabel','').innerHTML='New Passcode';
        let newPasscode=E.input(E.tableR(settingsTable),'password','optionsSettingsInput','','New Passcode');

        E.div(E.tableR(settingsTable),'optionsSettingsLabel','').innerHTML='Confirm New Passcode';
        let confirmPasscode=E.input(E.tableR(settingsTable),'password','optionsSettingsInput','','Confirm New Passcode');

        let buttonsRow=E.tableC(E.tableR(settingsTable),'');
        let saveButton=E.button(buttonsRow,'optionsSettingsButton','','Update Passcode');
        saveButton.onclick=()=>{
            if(newPasscode.value!==confirmPasscode.value) I.error('New passcodes do not match.');
            else if(!currentPasscode.value) I.error('Current passcode is required');
            else if(!newPasscode.value || !confirmPasscode.value) I.error('Enter a new passcode.');
            else {
                A.r('POST','/settings/update-passcode',{currentPasscode:sha256_digest(currentPasscode.value),newPasscode:sha256_digest(newPasscode.value)},(error,data)=>{
                    if(!error) {
                        I.success('Changes saved.');
                        currentPasscode.value='';
                        newPasscode.value='';
                        confirmPasscode.value='';
                    }
                    else I.error(error);
                });
            }
        };
    };
    static sessions(box) {
        let settingsTable=E.table(box,'optionsSettingsTable','','center','90%');

        let headerTr=E.tableR(settingsTable);
        E.div(E.tableC(headerTr,'90%'),'optionsSettingsLabel','').innerHTML='Sessions';
        E.div(E.tableC(headerTr,'10%'),'optionsSettingsLabel','').innerHTML='';
        A.r('POST','/sessions/all',{},(error,data)=>{
            if(!error) {
                if(data && data.length>0) {
                    data.forEach((dataItem)=>{
                        let tr=E.tableR(settingsTable);
                        let t=E.div(E.tableC(tr,'90%'),'optionsSettingsListItem','');
                        t.innerHTML=H.casDateTime(dataItem.timestamp);
                        if(dataItem.current) {
                            t.style.color=activeColor;
                            t.innerHTML=H.casDateTime(dataItem.timestamp)+' <span class="optionsSettingsListTag">Current</span>';
                        }
                        if(!dataItem.current) {
                            let opt=E.div(E.tableC(tr,'10%'),'optionsSettingsListOpt','');
                            opt.innerHTML=optIcon;
                            opt.onclick=(e)=>{
                                SettingsInterface.sessionOptions(e,dataItem,(newData,action)=>{
                                    if(action==='deleted') settingsTable.deleteRow(tr.rowIndex);
                                });
                            };
                        }
                    });
                }
            }
            else I.error(error);
        });
    };
    static wifi(box) {
        box.innerHTML="<iframe src='http://"+apiRoot+":5000' height='100%' width='100%' style='border:0;'></iframe>";
    };
    static firmware(box) {
        let settingsTable=E.table(box,'optionsSettingsTable','','center','90%');

        E.div(E.tableR(settingsTable),'optionsSettingsLabel','').innerHTML='Firmware File';
        let trigger=E.input(E.tableR(settingsTable),'text','optionsSettingsUploadTrigger','','Select .zip File');
        trigger.readOnly=true;

        E.div(E.tableR(settingsTable),'optionsSettingsLabel','').innerHTML='Passcode';
        let passcode=E.input(E.tableR(settingsTable),'password','optionsSettingsInput','','Passcode');

        let f=E.file(box,'','');
        f.accept='application/zip';
        trigger.onclick=()=>{
            f.click();
        };
        f.onchange=()=>{
            trigger.value=f.files[0].name;
        };

        let buttonsRow=E.tableC(E.tableR(settingsTable),'');
        let uploadButton=E.button(buttonsRow,'optionsSettingsButton','','Upload Firmware');
        uploadButton.onclick=()=>{
            upload(f.files[0]);
        };

        function upload(f) {
            let form=new FormData();
            form.append('fileName',f.name);
            form.append('passcode',sha256_digest(passcode.value));
            form.append('file',f);
            A2.r('POST','/settings/upload-firmware',form,(error,data)=>{
                passcode.value='';
                if(!error) {
                    I.success('Firmware uploaded.');
                    trigger.value='';
                }
                else I.error(error);
            });
        }
    };
    static services(box) {
        let settingsTable=E.table(box,'optionsSettingsTable','','center','');

        let buttonsRow=E.tableC(E.tableR(settingsTable),'');
        let uploadButton=E.button(buttonsRow,'optionsSettingsButton','','Restart Services');
        uploadButton.onclick=()=>{
            A.r('POST','/settings/restart-services',{},(error,data)=>{
                I.success('Services restarted');
            });
        };
    };

    //
    //

    static wallpaperOptions(e,wallpaperData,callback) {
        e.preventDefault();
        I.hideFloaters();
        let p=e.target.getBoundingClientRect();
        let m=E.div(body,'floaterMenu','');
        m.style.top=p.top+window.scrollY+20+'px';
        m.style.left=p.left+window.scrollX-120+'px';
        let t=E.table(m,'floaterMenuTable','','center','100%');
        //
        let activateTr=E.tableR(t);
        let activate=E.div(E.tableC(activateTr,''),'floaterMenuItem','');
        activate.innerHTML='Make Wallpaper';
        activate.onclick=(e)=>{
            A.r('POST','/wallpapers/activate',wallpaperData,(error,data)=>{
                if(!error) {
                    I.hideFloaters();
                    callback({},'activated');
                }
                else I.error(error);
            });
        };
        //
        let removeTr=E.tableR(t);
        let remove=E.div(E.tableC(removeTr,''),'floaterMenuItem','');
        remove.innerHTML='Delete';
        remove.onclick=(e)=>{
            I.confirmFloater(e,(c)=>{
                if(c) {
                    A.r('POST','/wallpapers/delete',wallpaperData,(error,data)=>{
                        if(!error) {
                            I.hideFloaters();
                            callback({},'deleted');
                        }
                        else I.error(error);
                    });
                }
            });
        };
    }
    //
    static activeModelOptions(e,modelData,callback) {
        e.preventDefault();
        I.hideFloaters();
        let p=e.target.getBoundingClientRect();
        let m=E.div(body,'floaterMenu','');
        m.style.top=p.top+window.scrollY+20+'px';
        m.style.left=p.left+window.scrollX-160+'px';
        let t=E.table(m,'floaterMenuTable','','center','100%');
        //
        let removeTr=E.tableR(t);
        let remove=E.div(E.tableC(removeTr,''),'floaterMenuItem','');
        remove.innerHTML='Stop';
        remove.onclick=(e)=>{
            I.confirmFloater(e,(c)=>{
                if(c) {
                    A.r('POST','/models/stop',modelData,(error,data)=>{
                        if(!error) {
                            I.hideFloaters();
                            callback({},'stopped');
                        }
                        else I.error(error);
                    });
                }
            });
        };
    }
    static installedModelOptions(e,modelData,callback) {
        e.preventDefault();
        I.hideFloaters();
        let p=e.target.getBoundingClientRect();
        let m=E.div(body,'floaterMenu','');
        m.style.top=p.top+window.scrollY+20+'px';
        m.style.left=p.left+window.scrollX-160+'px';
        let t=E.table(m,'floaterMenuTable','','center','100%');
        //
        let startTr=E.tableR(t);
        let start=E.div(E.tableC(startTr,''),'floaterMenuItem','');
        start.innerHTML='Start';
        start.onclick=()=>{
            start.innerHTML='';
            E.img(start,'ragLoader','','loading2.gif');
            A.r('POST','/models/create',modelData,(error,data)=>{
                if(!error) {
                    start.innerHTML='Start';
                    I.hideFloaters();
                    callback({},'created');
                }
                else I.error(error);
            });
        };
    }
    //
    static sessionOptions(e,sessionData,callback) {
        e.preventDefault();
        I.hideFloaters();
        let p=e.target.getBoundingClientRect();
        let m=E.div(body,'floaterMenu','');
        m.style.top=p.top+window.scrollY+20+'px';
        m.style.left=p.left+window.scrollX-120+'px';
        let t=E.table(m,'floaterMenuTable','','center','100%');
        //
        let removeTr=E.tableR(t);
        let remove=E.div(E.tableC(removeTr,''),'floaterMenuItem','');
        remove.innerHTML='Delete';
        remove.onclick=(e)=>{
            I.confirmFloater(e,(c)=>{
                if(c) {
                    A.r('POST','/sessions/delete',sessionData,(error,data)=>{
                        if(!error) {
                            I.hideFloaters();
                            callback({},'deleted');
                        }
                        else I.error(error);
                    });
                }
            });
        };
    }
}