class MonitorInterface extends I {
    static monitor() {
        let monitor=E.div(body,'','page_Monitor');
        //
        let render=E.div(monitor,'homeDeviceBoxes','stlRender');
        render.style.position='relative';
        render.style.textAlign='center';
        render.style.top='40px';
        render.style.height='200px';
        render.style.width='125px';
        render.style.margin='0 auto';
        if(apiRoot.split('-').indexOf('persys')>-1) new StlViewer(render,{ models:[{id:-1,filename:apiUrl+'/stl-render/?publicToken='+publicToken,color:'#FFFFFF',display:'smooth',animation:{delta:{rotationy:1, msec:2000, loop:true}}}]});
        //
        let space=E.div(monitor,'homeDeviceBoxes','');
        E.div(space,'homeDeviceBoxTitles','').innerHTML='Space';
        let info=E.div(space,'','homeDeviceSpaceInfo');
        let bar=E.div(space,'','homeDeviceSpaceBar');
        let used=E.div(bar,'','homeDeviceSpaceUsed');
        //
        let cpu=E.div(monitor,'homeDeviceBoxes','');
        E.div(cpu,'homeDeviceBoxTitles','').innerHTML='CPU';
        let cpuInfo=E.div(cpu,'','homeDeviceSpaceInfo');
        let cpuBar=E.div(cpu,'','homeDeviceSpaceBar');
        let cpuUsed=E.div(cpuBar,'','homeDeviceSpaceUsed');
        //
        let mem=E.div(monitor,'homeDeviceBoxes','');
        E.div(mem,'homeDeviceBoxTitles','').innerHTML='Memory';
        let memInfo=E.div(mem,'','homeDeviceSpaceInfo');
        let memBar=E.div(mem,'','homeDeviceSpaceBar');
        let memUsed=E.div(memBar,'','homeDeviceSpaceUsed');
        //
        let peer = new Peer(publicToken,statStreamConfig);
        peer.on('open', (id)=> {
            peer.socket._socket.addEventListener('message', message => {
                let d=JSON.parse(message.data);
                //
                used.style.width=(100-Math.floor((parseFloat(d.disk.free)/parseFloat(d.disk.total))*100))+'%';
                info.innerHTML=H.fileSize(parseFloat(d.disk.free))+' available of '+H.fileSize(parseFloat(d.disk.total));
                //
                cpuUsed.style.width=Math.round(d.cpu*100)+'%';
                cpuInfo.innerHTML=Math.round(d.cpu*100)+'%';
                //
                memUsed.style.width=(100-Math.floor((d.freeMem/d.totalMem)*100))+'%';
                memInfo.innerHTML=parseFloat(d.freeMem/1000).toFixed(2)+' GiB available of '+parseFloat(d.totalMem/1000).toFixed(2)+'GiB';
            });
        });
    };
}