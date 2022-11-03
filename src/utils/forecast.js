const request = require('request')

const forecast = (loc,callback) =>{
    const forecastURL = 'http://api.weatherstack.com/current?access_key=bfb422b18e1e55c5e6c246360d0d655b&query='+ loc
    request({url:forecastURL,json:true},(error,response)=>{
        if(error){
            // we are not providing any argument Js will automatically set data to undefined
            callback('Unable to connect',undefined)
        }else if(response.body.error === 0){
            callback('Unable to find the location',undefined)
        }else{
            callback(undefined,'It is a ' + response.body.current.temperature +' degress out.There is a ' +  response.body.current.precip + ' % chance of rain.')
        }
    }) 
}

module.exports = forecast