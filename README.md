## WHAT IS THIS ?

This is an interview task for similarweb.

## How to run.
1. First download and run redis container.

   ```
   docker run -p 6379:6379 -it redis/redis-stack-server:latest
   ```
2. Go to the backend folder install module & run the server.

   ```
   cd backend
   ```
   ```
   npm i
   ```
   ```
   npm start
   ```
3. Next, go to the backend folder install module & run the server.
   ```
   cd frontend
   ```
   ```
   npm i
   ```
   ```
   npm run serve
   ```

4. open the broswer and go to: [http://localhost:8080](http://localhost:8080).

## Short description of what the task includes.

- The task include frontend (in vuejs), backend (nodejs) and redis server.
- The client and the backend talking with websocket so the update will happened immediately.
- Also, to suppose future scalling of the system I implemented redis sub/pub so if clients connected to more then one server and update happened ALL clients will be notify.

## If I had more time I will probably do

- Environments (development, staging, production), with "dotenv" & ".env file" etc...
- The system is small, bigger system will require other files structure.
- Implement locking, in case more then one client try to change (add/remove) video.
- I choose redis, but if the data increased or need to be more "presistned" will connect to database.
- Centralize all the string in the backend/frontend, and use constants in the code.
- Add more unit test to the vue app, and to the backend side.
- I'm not disconnecting from redis or the websocket since we only on this page. but in a bigger app it's needed.
- Some data should pulled in runtime from a "secret manager" external service, in this app it's hard-coded (youtube api key for example).
- Add Dockerfiles.
- Probably better looking UI.