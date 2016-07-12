function refreshScenes(){
    var aoid = _aoi.id;
    getScenes(aoid,function(scenes){
        document.getElementById('numberOfScenes').innerHTML = scenes.payload.length;
    });
}

function zoomToBookmark(){
    var s=document.getElementById('selectBookmark');
    _aoi = _aois.payload[s.selectedIndex];
    var geom = _aoi.geometry;
    var firstHexagon = getRandomHexagon(geom, 4);
    var polygon = L.geoJson(geom, {fill: false});
    map.fitBounds(polygon.getBounds());
    polygon.addTo(map);
    drawHexagon(map, firstHexagon);
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

getAois(function (aois){
    _aois=aois;
    var s=document.getElementById('selectBookmark');
    
    var amount = aois.payload.length;
    for(var i=0;i<amount;i++){
        var option = document.createElement("option");
        option.text=aois.payload[i].name;
        s.add(option);                    
    }

    // now select the first option, map zooms in to this project
    s.selectedIndex=0;
    zoomToBookmark();
})
