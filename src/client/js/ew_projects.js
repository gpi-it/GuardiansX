function getProjectByName(projects, name) {
    for(var i=0; i<projects.length; i++) {
        if (projects[i].name == name) return projects[i];
    }
}

function getProjects(callback){
    var projectsUrl='js/projects.json';
    var request = new XMLHttpRequest();
    request.open('GET', projectsUrl, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            callback(data);
        }
    };
    request.send();
}

function zoomToProject(map, projectGeometry){
    var projectBounds = projectGeometry.getBounds(); 
    map.fitBounds(projectBounds.pad(-1));
}

function isZoneWithinProject(projectGeometry, zone){
    var poly1 = projectGeometry.toGeoJSON().features[0].geometry;
    var poly2 = L.polygon(zone.getHexCoords(), null).toGeoJSON().geometry;
    var res= turf.intersect(poly1, poly2);
    return res!==undefined;
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
    // to be sure to get all the zones, dived by two
    zonewidth = zonewidth/2;

    var zones = [];
    for (var x = xmin; x < xmax; x+=zonewidth) {
        for (var y = ymin; y < ymax; y+=zoneheight) {
            var zone = GEOHEX.getZoneByLocation(y,x,_project.hexlevel);
            if(!haszone(zones,zone.code)){
                var isWithin = isZoneWithinProject(projectGeometry,zone);
                if(isWithin){
                    zones.push(zone);
                }
            }
        }
    }
    return zones;
}

function getSelectedProject(){
    var s=document.getElementById('selectBookmark');
    _aoi = _aois.payload[s.selectedIndex];
}

function addProjectGeometryToMap(map, projectGeometry){
    var polygon = L.geoJson(projectGeometry, {fill: false});
    polygon.id="project";
    polygon.addTo(map);
    return polygon;
}
