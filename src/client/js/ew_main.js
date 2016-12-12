function getSelectedProject(){
    var s=document.getElementById('selectBookmark');
    _aoi = _aois.payload[s.selectedIndex];
}

function addProjectGeometryToMap(projectGeometry){
    var polygon = L.geoJson(projectGeometry, {fill: false});
    polygon.addTo(map);
}

function createHexagon(projectGeometry, hexlevel){
    var hexagonCode = getRandomHexagonCode(projectGeometry, hexlevel);
    var hexagon = getHexagon(map, hexagonCode);
    return hexagon;
}

function startNewHexagon(){
    removeHexagons();
    _hexagon = createHexagon(_aoi.geometry, _project.hexlevel);
    map.addLayer(_hexagon);
    var bounds=_hexagon.getBounds();
    map.fitBounds(bounds.pad(-2));
    refreshScenes(toWKT(_hexagon));
}

function startProject(){
    getSelectedProject();
    _project = getProjectByName(_projects,_aoi.name);
    addProjectGeometryToMap(_aoi.geometry);
    if(_project != null){
        printQuestion(_project.question, _project.options);
    }
    startNewHexagon();
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

function removeHexagons(){
    map.eachLayer(function (layer) {
        if(layer.id=="hexagon"){
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

function selectPeriodImages(){
    var periodSelect=document.getElementById('selectPeriodImages');
    days = periodSelect.options[periodSelect.selectedIndex].value;

    map.eachLayer(function (layer) {
        if(layer.id=="urthecast"){
            map.removeLayer(layer);
            addUrthecastLayer(days);
        }
    });
    refreshScenes(toWKT(_hexagon));
}

function selectClouds(){
    var cloudSelect=document.getElementById('selectClouds');
    cloud_coverage = cloudSelect.options[cloudSelect.selectedIndex].value;

    map.eachLayer(function (layer) {
        if(layer.id=="urthecast"){
            map.removeLayer(layer);
            addUrthecastLayer(days);
        }
    });
    refreshScenes(toWKT(_hexagon));
}

