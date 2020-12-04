const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')
const { error } = require('console')
//console.log(__dirname)
//console.log(__filename)
//to get path
//console.log(path.join(__dirname,'../public/index.html'))

const app= express()
const port =process.env.PORT || 3000

const publicpath =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')//views is default changing to templates
const partialsPath= path.join(__dirname,'../templates/partials')

//setup handlebars engine 
app.set('view engine','hbs')//setting up the express which engine  and value which module
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//serveup the static directory in single use
app.use(express.static(publicpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'divya'
    })
})


// app.get('',(req,res)=>{
//     res.send('hello express')
// })

//app.com/help

 app.get('/help',(req,res)=>{
     res.render('help',{
         title:'Help',
         name :'divya',
         descp:'How can I help you'
     })
})

//app.com/weather

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.render('404',{
                title:'404',
                name:'Andrew',
                errormessage:'Page not found'
            })
    }
    const adrs = req.query.address
    geocode(adrs,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })

    })
    
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    //console.log(req.query.search)
    res.send({
        products:[]
    })
})
//app.com/about
app.get('/about',(req,res)=>{
     res.render('about',{
         title:'about me',
         name :'divya'
     })
 })



//error 
app.get('/help/*',(req,res)=>{
    res.render('404',
    {
        title:'404',
        name:'divya',
        errormessage:'help not found'
    })
})

app.get('*',(req,res)=>{
  //res.send('My 404 page')
  res.render('404',{
      title:'404',
      name:'Andrew',
      errormessage:'Page not found'

  })
})

app.listen(port,()=>{
    console.log('server is up on port '+port)
})