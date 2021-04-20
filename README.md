# II1302-Project-Office-Enviroment-Monitor

## Run web app in development
### Required
- Node.Js
- .env (a file called .env in project root folder specifying "cloudant_url", "cloudant_username" and "cloudant_password")
### Install dependencies and run the app
The web app requires both the server and client to be running.
Run following commands to start the server and client:
- npm install && npm run dev (in project root folder)
- npm install && npm start   (in client folder)

## Run tests
- Start the application in development following the section above
- npm test

## Build and deploy web app for production
IBM Cloud Foundry, Cloudant, ...
Since app.js in root folder serves the static files client/build, the following commands has to be run:
- npm install (in project root folder, install server dependencies)
- cd client && npm install && npm run build (in client folder, install frontend dependencies).


