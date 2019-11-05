# APIProxy

This program is just a API request forwarder. It can run as a middleware between rest client and the api server.


1. Run npm init
2. Call node index --port 8888 --host "https://xxxxxx.com"


Now all the requests from "htps://localhost:8888" will be redirected to the new host
