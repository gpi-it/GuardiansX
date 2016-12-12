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
