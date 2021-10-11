const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2luc2FyMSIsImEiOiJja3VmaHB5ajUxdWhzMnNsOWNhZXNvZm00In0.gC43g9z-a96TaJT9hImIKA&limit=1'
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect location services', undefined)
        } else if (body.message) {
            callback('Not Authorized - Invalid Token', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}



module.exports = geoCode