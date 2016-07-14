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

function printQuestion(question, options){
    document.getElementById('divQuestion').innerHTML = question;
    var divOptions = document.getElementById('divOptions');
    for(i=0;i<options.length;i++){
        var option=options[i];
        var div = document.createElement('span');
        div.innerHTML=option;
        div.setAttribute('id', 'spanOption');
        divOptions.appendChild(div);
    }
}

function startProject(){
    removeHexagons();
    var s=document.getElementById('selectBookmark');
    _aoi = _aois.payload[s.selectedIndex];
    var geom = _aoi.geometry;
    var project = getProjectByName(_projects,_aoi.name);
    printQuestion(project.question, project.options)
    hexlevel = project.hexlevel;
    var hexagonCode = getRandomHexagonCode(geom, hexlevel);
    var polygon = L.geoJson(geom, {fill: false});
    polygon.addTo(map);
    var hexagon = getHexagon(map, hexagonCode);
    map.addLayer(hexagon);
    map.fitBounds(hexagon.getBounds());
    refreshScenes();
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

function getAois(callback){
    var aoiUrl='https://api.urthecast.com/v1/consumers/apps/me/aois?'+
    "api_key=" + api_key + 
    "&api_secret=" + api_secret;
    var request = new XMLHttpRequest();
    request.open('GET', aoiUrl, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            callback(data);
        }
    };
    request.send();
}

function fillAois(aois){
    var s=document.getElementById('selectBookmark');
    
    var amount = aois.payload.length;
    for(var i=0;i<amount;i++){
        var option = document.createElement("option");
        option.text=aois.payload[i].name;
        s.add(option);                    
    }

    // now select the first option, map zooms in to this project
    s.selectedIndex=0;
}