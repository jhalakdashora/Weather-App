// built in module
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast')
// const geocode = require('./utils/geocode')

const app = express()
// Define paths for express
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup statid directory to serve
app.use(express.static(publicDirectoryPath))


// rendering index.hbs page
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Jhalak'
    })
})

// rendering about page using template
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Jhalak'
    })
})

// rendering help page using template
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name:'Jhalak'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Jhalak',
        errorMessage: 'Help article not found'
    })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide a address'
        })
    }
    forecast(req.query.address,(error,forecastData) =>{
        if(error){
            return res.send({error})
        }

        res.send({
            forecast: forecastData,
            // location:,
            address:req.query.address
        })
    })


})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Jhalak',
        errorMessage: 'Page not Found'
    })
})


// * is a wildcard character
// app.get('*',(req,res)=>{
//     res.send('My 404 Page')
// })

//to start the server (used only one time)
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})