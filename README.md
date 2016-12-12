# GuardiansX

## Installation on local dev machine

```
$ git clone https://github.com/gpi-it/GuardiansX.git

$ cd GuardiansX

$ npm install

$ docker run -d -p 27017:27017 -p 28017:28017 -e MONGODB_PASS="admin" tutum/mongodb

$ node server.js
```

browser: open http://localhost:3000

## Experimental Docker instance

```
$ docker run -p 3000:3000 bertt/earthwatchers
```

Build command:

```
$ docker build -t bertt/earthwatchers .
```

Nb: database is not (yet) available in Docker

<br><br>

##Interface Concepts
<img src='https://github.com/gpi-it/GuardiansX/blob/master/interface/guardianWIP.png?raw=true'></img>
