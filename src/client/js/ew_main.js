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
    document.getElementById('dateOfScene').innerHTML = acquired_gte + " - " + acquired_lte;

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
        document.getElementById('divQuestion').innerHTML = question;
    }
}

function removeLayers(id){
    map.eachLayer(function (layer) {
        if(layer.id==id){
            map.removeLayer(layer);
        }
    });  
}