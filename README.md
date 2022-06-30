# Overview
Supervisor notification system built on a Node backend with a React frontend



# Running locally

With NodeJS installed, install the dependencies for this project. This install command only needs to be run once.
```
npm install
```

Then start the API server.
```
npm start
```

The server will run on port 8080 and will serve the built react project
If any changes are made to the react project then it will have to be built by running
1. cd client
2. npm run build

This API server provides two endpoints:
1. GET /api/supervisors
2. POST /api/submit



# Running with docker
To help ensure consistently correct startup across multiple platforms, you may choose to use Docker to containerize your application.  Installation steps for docker can be found on their main page.
https://docs.docker.com/engine/install/

With Docker installed, you can build your a new image. This build needs to be run after any changes are made to the source code.
```
docker build . -t test:latest
```

After the image builds successfully, run a container from that image.
```
docker run -d --name test -p 8080:8080 test:latest
```

This server will bind to port 8080, and respond to the same `curl` examples listed above.

When you are done testing, stop the server and remove the container.
```
docker rm -f test
```