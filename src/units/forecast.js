const request = require('postman-request');

const foreCast = (latitude,longitude,callback)=>{
const url ='http://api.weatherstack.com/current?access_key=95d5116b67a6c6d994d726a556f49620&query='+latitude + ','+ longitude+'&units=m'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect weather services',undefined)
        }else if(body.error){
            callback('Access Restricted - Your current Subscription Plan does not support HTTPS Encryption.',undefined)
        }else{
            callback(undefined,body.current.temperature + " Degree " + body.current.feelslike + ' FeelsLike ' +body.current.weather_descriptions[0])
        }
    })
}

module.exports = foreCast
