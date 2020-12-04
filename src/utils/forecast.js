const request = require('postman-request')



const forecast=(lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=48ea5b38e046a1e2a3d8c4e3fc9dbd02&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)

    request({url , json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect ',undefined)
        }
        else if(body.error){
            callback('unable to find location',undefined)
        }
        else{
            
            callback(undefined,body.current.weather_descriptions+' It is currently '+ body.current.temperature+ ' it feels like '+body.current.feelslike)
             }
    })
}


module.exports = forecast