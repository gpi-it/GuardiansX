
function random(low, high) {
    return Math.random() * (high - low) + low;
}

function getRandomHexagon(project, geohexlevel) {
    var poly1 = {"type": "Feature","geometry": project};
    var isInside = false;
    var env = turf.envelope(project);
    var bbox = env.geometry.coordinates[0];

    while (!isInside) {
        var lon_rnd = random(bbox[0][0], bbox[1][0]);
        var lat_rnd = random(bbox[0][1], bbox[2][1]);
        // check if point is inside polygon
        var pt = turf.point([lon_rnd, lat_rnd]);
        isInside = turf.inside(pt, poly1);
    }
    return GEOHEX.getZoneByLocation(lat_rnd, lon_rnd, geohexlevel).code;
}

function drawHexagon(map, geohex) {
    var polygonName = "hexagon" + geohex;
    var style = {
        color: "#FF0000",
        weight: 2,
        opacity: 0.65,
        label: geohex,
        fillOpacity: 0
    };

    var polygon = getGeohexPolygon(geohex, style);
    polygon.name = polygonName;
    map.addLayer(polygon);
    return polygon;
}

function getGeohexPolygon(geohexCode, style) {
    var zone = GEOHEX.getZoneByCode(geohexCode);
    return L.polygon(zone.getHexCoords(), style);
}


