function getSelectedProject(){
    var s=document.getElementById('selectBookmark');
    _aoi = _aois.payload[s.selectedIndex];
}

function createHexagon(projectGeometry, hexlevel){
    var hexagonCode = getRandomHexagonCode(projectGeometry, hexlevel);
    var polygon = L.geoJson(projectGeometry, {fill: false});
    polygon.addTo(map);
    var hexagon = getHexagon(map, hexagonCode);
    return hexagon;
}

function startProject(){
    removeHexagons();
    getSelectedProject();
    var project = getProjectByName(_projects,_aoi.name);
    printQuestion(project.question, project.options);
    var hexagon = createHexagon(_aoi.geometry, project.hexlevel);
    map.addLayer(hexagon);
    map.fitBounds(hexagon.getBounds());
    refreshScenes();
}

function refreshScenes(){
    var aoid = _aoi.id;
    getScenes(aoid,function(scenes){
        document.getElementById('numberOfScenes').innerHTML = scenes.payload.length;
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
            refreshScenes();
        }
    });
}

function selectClouds(){
    var cloudSelect=document.getElementById('selectClouds');
    cloud_coverage = cloudSelect.options[cloudSelect.selectedIndex].value;

    map.eachLayer(function (layer) {
        if(layer.id=="urthecast"){
            map.removeLayer(layer);
            addUrthecastLayer(days);
            refreshScenes();
        }
    });
}

