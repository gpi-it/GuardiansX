function startProject(){
    getSelectedProject();
    _project = getProjectByName(_projects,_aoi.name);

    var projectGeometry = addProjectGeometryToMap(_aoi.geometry);
    zoomToProject(projectGeometry);
    var zones= getProjectZones(projectGeometry,_project.hexlevel);
    var style = {
        color: "#000000",
        weight: 4,
        opacity: 0.65,
        fillOpacity: 0
    };

    drawZones(map, zones,style);

    if(_project != null){
        printQuestion(_project.question, _project.options);
    }
}

function drawZones(map, zones,style){
    for (var i = 0; i < zones.length ; i++) {
        var zone= zones[i];
        drawZone(map, zone,style);
    }
}

function drawZone(map, zone, style){
    var poly = L.polygon(zone.getHexCoords(), style);
    poly.id="zone";
    poly.name="test";
    poly.addTo(map);
}

function zoomToProject(projectGeometry){
    var projectBounds = projectGeometry.getBounds(); 
    map.fitBounds(projectBounds.pad(-1));
}

function haszone(zones, code) {
    for (var i = 0; i < zones.length; i++) {
        if (zones[i].code === code) {
            return true;
        }
    }
    return false;
}

function getProjectZones(projectGeometry,hexlevel){
    var projectBounds = projectGeometry.getBounds(); 
    var xmin = projectBounds.getWest();
    var xmax = projectBounds.getEast();
    var ymin = projectBounds.getSouth();
    var ymax = projectBounds.getNorth();

    var zonell = GEOHEX.getZoneByLocation(ymin,xmin,_project.hexlevel);
    var poly = L.polygon(zonell.getHexCoords(), null);
    var bounds = poly.getBounds();
    var zonewidth = bounds.getEast()- bounds.getWest();
    var zoneheight = bounds.getNorth()- bounds.getSouth();
    // 
    zonewidth = zonewidth/2;

    var zones = [];
    for (var x = xmin; x < xmax; x+=zonewidth) {
        for (var y = ymin; y < ymax; y+=zoneheight) {
            var zone = GEOHEX.getZoneByLocation(y,x,_project.hexlevel);
            if(!haszone(zones,zone.code)){
                zones.push(zone);
            }
        }
    }
    return zones;
}

function getSelectedProject(){
    var s=document.getElementById('selectBookmark');
    _aoi = _aois.payload[s.selectedIndex];
}

function addProjectGeometryToMap(projectGeometry){
    var polygon = L.geoJson(projectGeometry, {fill: false});
    polygon.addTo(map);
    return polygon;
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

