const request = require('postman-request')


//const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic3JpZGl2eWEiLCJhIjoiY2tpOHFhbmQ5MDg4YjJ5bzV0MWY5cjR5ZyJ9.et-2cwiumuIinZn9DZ-Enw&limit=1'

// const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/12what11.json?access_token=pk.eyJ1Ijoic3JpZGl2eWEiLCJhIjoiY2tpOHFhbmQ5MDg4YjJ5bzV0MWY5cjR5ZyJ9.et-2cwiumuIinZn9DZ-Enw&limit=1'
// request({url:geocodeurl , json : true},(error,response)=>{
//     if(error){
//         console.log('unable to connect the app')

//     }else if(response.body.features.length===0){
//         console.log('unable t find the location ...')

//     }
//     else{
//     console.log('latitude is '+response.body.features[0].center[1])
//     console.log('longitutude is ' +response.body.features[0].center[0])
//     }
// })

const geocode =(adress,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?access_token=pk.eyJ1Ijoic3JpZGl2eWEiLCJhIjoiY2tpOHFhbmQ5MDg4YjJ5bzV0MWY5cjR5ZyJ9.et-2cwiumuIinZn9DZ-Enw&limit=1'

    request({url ,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location',undefined)
        }else if(body.features.length===0){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name 
            })
        }
    })
}





module.exports = geocode
