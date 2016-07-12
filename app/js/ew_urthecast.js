function setPeriod(days){
    var now = new Date();
    acquired_lte = now.toISOString();
    now.setDate(now.getDate()-days);
    acquired_gte = now.toISOString();
}


function getLayerUrl(){
    var layerurl = 
    "https://tile-{s}.urthecast.com/v1/" + renderer + "/{z}/{x}/{y}?" +
        "api_key=" + api_key +
        "&api_secret=" + api_secret +
        "&platform=" + platform +
        "&cloud_coverage_lte=" + cloud_coverage +
        "&acquired_gte=" + acquired_gte +
        "&acquired_lte=" + acquired_lte;
    return layerurl;
}

function addUrthecastLayer(days){
    setPeriod(days);
    var url= getLayerUrl();
    urthecastlayer = new L.TileLayer(url, {minZoom: minZoom});
    urthecastlayer.id="urthecast";
    map.addLayer(urthecastlayer);
}

