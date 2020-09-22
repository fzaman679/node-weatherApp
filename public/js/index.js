

/*
fetch('http://puzzle.mead.io/puzzle').then((response) =>{ //getting the data from the url and then running a function with a response parameter
    response.json().then((data) => {                         //response.json() function is to format the data into JSON format
        console.log(data)
    }) //second then function will be used when data has arrived and parsed into javascript object 
})

*/ 


/*
fetch('http://localhost:3000/city?search=london').then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error);
        } else {
            console.log(data.location);
            console.log(data.forecast)
        }
    })
})

*/

const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const message1 = document.querySelector('#message1')

const message2 = document.querySelector('#message2')


//message1.textContent = ' '; //leaving the message1 element for an empty string

message1.textContent = 'Loading...';



weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const location = search.value;

    //console.log(location);

    //if(!location){
      // message1.textContent = 'please type the location';
    //} else {
        
        fetch('http://localhost:3000/city?search= ' + location).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    //console.log(data.error);
                    message1.textContent = data.error;
                } else {

                    /*
                    console.log(data.location);
                    console.log(data.forecast);
                    */

                    message1.textContent = data.location;
                    message2.textContent = data.forecast;
                }
            })
        })
    //}

    
})