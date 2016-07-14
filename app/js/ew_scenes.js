function getScenes(hexagonWkt, callback){
    var scenesUrl='https://api.urthecast.com/v1/archive/scenes?'+
    "api_key=" + api_key + 
    "&api_secret=" + api_secret +
    "&limit=100" + 
    "&geometry_intersects=" + hexagonWkt + 
    "&acquired_gte=" + acquired_gte +
    "&acquired_lte=" + acquired_lte + 
    "&cloud_coverage_lte=" +cloud_coverage +
    "&sort=-acquired" +
    "&platform="+ platform;

    var request = new XMLHttpRequest();
    request.open('GET', scenesUrl, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            callback(data);
        }
    };
    request.send();
}
