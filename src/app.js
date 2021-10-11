const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./units/geocoder')
const forecast = require('./units/forecast')
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const views = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', views)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'andrew mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'sinsarul haq'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'may i help you'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must include a valid location'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'its snowing',
    //     loacation:'philadelphia',
    //     address:req.query.address
    // })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must include serach term in query'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'page not found'
    })
})

app.listen(port, () => console.log('server is on port 3000!' + port))