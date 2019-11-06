var axios = require('axios').default;
const request = require('request');

module.exports = class API{
    constructor(toHost){
        this.host = toHost;
        this.headers = {};
    }

    async call(reqObject, data){
        
        let options = {
            url : this.host + reqObject.path,
            headers : reqObject.headers,
            params : reqObject.query,
            data : data,
            method: reqObject.method.toLowerCase(),
        }
        options.headers['host'] = this.host.replace('http://','').replace('https://','').split(':')[0];
        return await new Promise((resolve, reject)=>{
            axios(options).then(res => resolve(res.data)).catch(err => {
                console.log(err);
                reject({
                    status : err.response.status,
                    statusText : err.response.statusText,
                    config : err.response.config,
                    response: err.response.data
                });
            });
        })
    }
}