
//--------------------- Requirements ------------------------------------//

const path = require('path');

const express = require('express'); 

const hbs = require('hbs');

//console.log(__dirname);
//console.log(path.join(__dirname, '../public'));

const forecast = require('./utils/forecast.js');

const geocode = require('./utils/geocode.js');



//Calling the express function 
const app = express();

//-------------------Variables for Page routes -------------------// 

const publicDirectory = path.join(__dirname, '../public');

const viewsPath = path.join(__dirname, '../templates/views'); //as we changed the file name from views to templates, this is the new directory

const partialsPath = path.join(__dirname, '../templates/partials');





//------------- Setup handlebars engine and views location --------------------//


app.set('view engine', 'hbs') //includes two parameters, key and value in this case is hbs  

app.set('views', viewsPath); //here we use views as default, and the name which is a variable for page route

hbs.registerPartials(partialsPath);

//--------------- Setup static directory to serve ----------------------------------// 



app.use(express.static(publicDirectory))

//--This is just an example purpose--//

//in this case get is a method when user clicks on the web which takes in two parameters, 1st the route such as /about page 2nd is the function of what we want to happen when the user clicks on page 
/*
app.get('', (req, res) => { //this callback function takes in two parameters 1st is the request 2nd is the response 
    res.send('<h1>Welcome to weather page </h1>')
}); 

*/
//------End of an example -----//


/*

app.get('/about', (req, res) => {
    res.send('<h1>This is about me page </h1>');
})


app.get('/fz', (req, res) => { //sending up the json example 
    res.send({ //here we created an object with properties and express detects us and gives up parsed json format
        name: 'Faro', 
        age: 28
    })
});

*/

//--------------------Practice purposes -----------------------// 

//to load the about page 
//app.use(express.static(aboutPage))

//to load the help page 
//app.use(express.static(helpPage))


//----------------------- End of practice samples ------------------//




//the about page 
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me', 
        name: 'Faro Zamani'
    })
});


//the help page 

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        question: 'How can you check make an accordion?',
        message: 'First you create html elements and then you style them with CSS then add JS. More easier with bootsrap',
        name: 'Faro Zamani'
    })
})


// render allows us to render a file from the views, in this method we enter as a string the file name in this case is index
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather application',
        name: 'Faro Zamani'
    }) 
});

//matching a specific pattern, in this case its after help page 
/*
app.get('/help/*', (req, res) =>{
    res.send('Help article not found')
})


//404 page handler - always needs to be last 
// * in Express it means match anything that hasnt been match so far 
app.get('*', (req, res) =>{
    res.send('this is my 404 page');
})

*/

/*
app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } /* the below could work as well. 
        console.log(req.query.search);
        res.send({
            products: []
        })
    */

/*
    console.log(req.query.search);
    res.send({
        products: []
    })
})

*/

//weather location service
app.get('/city', (req, res) => {
    
    if(!req.query.search){
        return res.send({
            error: 'please type the location'
        })
    }

    
    //console.log(req.query.search)
    
    /*
    res.send({
        weather: '18 degrees Celsius',
        city: req.query.search
    })

    */

    geocode(req.query.search, (error, {lat, long, location} = {} ) => {
        if(error){
            return res.send( {error} )
        } 

        forecast(lat, long, (error, forecastData) =>{
            if(error){
                return res.send( {error} )
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.search
            })
        })
    })

})



app.get('/help/*', (req, res) => {
    res.render('helpArticleNotFound', {
        title: 'Sorry article has not been found',
        message: 'Try different keywords'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 page not found',
        message: 'try next time'
    })
})

/*

app.get('/help', (req, res) => {
    res.send('for questions fill up the form')
});

//sending a object style format, which converts into JSON
app.get('/weather', (req, res) => {
    res.send({
        temp: 26,
        desc: 'Sunny',
        location: 'Madrid'
    })
});

*/ 
// app.com
// app.com/help
// app.com/about 

app.listen(3000, () => { //here we put listen method which involves two parameters (1st is the port and 2nd the callback )
    console.log('Server is up and running');
});