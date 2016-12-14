


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


function haszone(zones, code) {
    for (var i = 0; i < zones.length; i++) {
        if (zones[i].code === code) {
            return true;
        }
    }
    return false;
}
