function startProject(){
    // todo clean things up...
    removeLayers("hexagon");
    removeLayers("urthecast");
    removeLayers("project");
    
    getSelectedProject();
    _project = getProjectByName(_projects,_aoi.name);
    cloud_coverage = _project.max_clouds;
    acquired_lte = _project.image_acquired_lte;
    acquired_gte = _project.image_acquired_gte;

    var projectGeometry = addProjectGeometryToMap(map, _aoi.geometry);
    zoomToProject(map,projectGeometry);
    var zones= getProjectZones(projectGeometry,_project.hexlevel);
    var style = {
        color: "#000000",
        weight: 4,
        opacity: 0.65,
        fillOpacity: 0
    };

    drawZones(map, zones,style);
    addUrthecastLayer(days);

    if(_project != null){
        printQuestion(_project.question, _project.options);
    }
}

function refreshScenes(hexagonWkt){
    getScenes(hexagonWkt,function(scenes){
        console.log("get scenes"+ scenes.payload.length);
        if(scenes.payload.length>0){
            var isodate = scenes.payload[0].acquired;
            var day = moment(isodate);
            var res = day.format('YYYY-MM-DD HH:MM');
            document.getElementById('dateOfScene').innerHTML = res;
        }
        else{
            document.getElementById('dateOfScene').innerHTML = "-no images-";
        }
    });
}

function removeLayers(id){
    map.eachLayer(function (layer) {
        if(layer.id==id){
            map.removeLayer(layer);
        }
    });  
}

function addPointToScore(){
    _score++;
    document.getElementById('score').innerHTML = _score;
}

function clickOption(option){
    // todo 1: post observation to server
    // todo 2: update score
    addPointToScore();
    // todo 3: go to next hexagon
    startNewHexagon();
}

function printQuestion(question, options){
    document.getElementById('divQuestion').innerHTML = question;
    var divOptions = document.getElementById('divOptions');
    while ( divOptions.firstChild ) divOptions.removeChild( divOptions.firstChild );
    for(i=0;i<options.length;i++){
        var option=options[i];
        var div = document.createElement('span');
        div.innerHTML=option;
        div.addEventListener('click', function (event) {
            clickOption(event.currentTarget.innerHTML);
         });
        div.setAttribute('id', 'spanOption');
        divOptions.appendChild(div);
    }
}