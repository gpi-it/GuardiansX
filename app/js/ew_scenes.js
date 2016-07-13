function getScenes(aoi_id, callback){
    var aoiUrl='https://api.urthecast.com/v1/archive/scenes?'+
    "api_key=" + api_key + 
    "&api_secret=" + api_secret +
    "&limit=100" + 
    "&geometry_intersects=" + aoi_id + 
    "&acquired_gte=" + acquired_gte +
    "&acquired_lte=" + acquired_lte + 
    "&cloud_coverage_lte=" +cloud_coverage
        
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
