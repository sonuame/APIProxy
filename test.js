var axios = require("axios").default;

var options = { method: 'GET',
  url: 'https://dev.tripsaathi.com/api/v1/services/offers',
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'Accept-Encoding': 'gzip, deflate',
     Host: 'dev.tripsaathi.com',
     'Postman-Token': '3b34a8b7-bd23-40b0-aaa9-2859016f2f5c,ba6ee343-6e77-43c2-87a6-c3030544b15b',
     'Cache-Control': 'no-cache',
     Accept: '*/*',
     'User-Agent': 'PostmanRuntime/7.19.0',
     apikey: '0e477496-ee94-449e-a706-e16a39fa99bc',
     'Content-Type': 'application/json' } };

axios(options).then(res => console.log(res.data));
