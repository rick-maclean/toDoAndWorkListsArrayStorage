const express = require("express");
//const requestNode = require("request");
const app = express();
//note this line no longer is on the ejs github sample get started
let ejs = require('ejs');
app.set('view engine', 'ejs');

//const https = require("node:https");
const bodyParser = require('body-parser');

//use our own module
const currentDate = require(__dirname + "/date.js")

//tell express to use bodyParser to parse the html
app.use(bodyParser.urlencoded({extended: true})); 

// tell express where the static files are located, i.e. css and images
// had to add this for static files: css/style.css and images/someImage.jpg files to be found
app.use(express.static('public'));

// start the web site and listen on port 3000
// http://localhost:4000 is the url for the site
// app.listen(4000, function(){
//     console.log("Express server was started on port 4000");
//     console.log("localhost:4000");
//     console.log("using date.js module we have currentDate as: " +  currentDate.CurrentDate());
//     console.log("using date.js module we have currentDay as: " +  currentDate.CurrentDay());
// }); 

//modification to have it run on hosting service
const PORT = process.env.PORT || 4000;
// app.listen(PORT, function() {
//   console.log('Server started on port ${PORT}');
// });
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});



const months = ["January", "February", "March", "April", "May", "June", "July", 
"August", "September", "October", "November", "December"];

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", 
"Thursday", "Friday", "Saturday"];

// when someone access the root this is the html REST GET 
// app.get('/', function (req, res) {
//     console.log('home page was accessed');
//     var today = new Date();
//     var weekday = weekdays[today.getDay()];
//     var month = months[today.getMonth()];
//     if (today.getDay === (0 || 6))
//     {
//         res.send('<h1>It is a weekend</h1>'+
//         '<p>Today is '+weekday+' '+month+' '+today.getDate()+', '+
//             today.getFullYear()+' </p>');
//     } else {
//         res.sendFile(__dirname + "/index.html"); 
//     }
     
// });

var today = '';
var dateSpelledOut = '';
var weekday = '';
var month = '';
var weekendOrNot = '';
var monthDay = '';
var year = '';


async function getDateSpelledOut() {
    let myPromise = new Promise(function(resolve) {
        today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let dateSpelledOut = today.toLocaleDateString('en-US', options);
        resolve(dateSpelledOut);
    });
    return await myPromise;
}


var newItem = "";
var foodItems = ["Buy Food", "Cook Food", "Eat Food"];
var workItems = ["GuestWiFi Portal"];

app.get('/', function (req, res) { 
    console.log('home page was accessed');
    
    dateSpelledOut = currentDate.CurrentDate();

    let today = new Date();
    weekday = weekdays[today.getDay()];
    month = months[today.getMonth()];
    monthDay = today.getDate();
    year = today.getFullYear();
    // if (today.getDay === (0 || 6))
    // {
    //     res.send('<h1>It is a weekend</h1>'+
    //     '<p>Today is '+weekday+' '+month+' '+today.getDate()+', '+
    //         today.getFullYear()+' </p>');
    // } else {
    //     res.sendFile(__dirname + "/index.html"); 
    // }

    //items.forEach(element => console.log(element));
    // for (var i = 0; i < items.length; i++) {
    //     console.log(items[i]);
    //     //Do something
    // }
    
    // if (today.getDay === (0 || 6)) {
    //     weekendOrNot = 'weekend';
    // } else {
    //     weekendOrNot = 'weekday';
    // }

    let title = "ToDo List";

    res.render('list', {
        weekdayVar: weekday, 
        monthVar: month, 
        monthDay : monthDay,
        year : year,
        listTitle: title,
        kindOfDay : weekendOrNot,
        dateFromToLocaleDateString : dateSpelledOut,
        // newListItemHtml: newItem,
        items: foodItems
        } );    
});


app.get('/work', function (req, res) {
    console.log('WORK page was accessed');
    //console.log(req.body);

    dateSpelledOut =  currentDate.CurrentDate();

    res.render('list', {
        weekdayVar: weekday, 
        monthVar: month, 
        monthDay : monthDay,
        year : year,
        listTitle: "Work List",
        kindOfDay : weekendOrNot,
        dateFromToLocaleDateString : dateSpelledOut,
        // newListItemHtml: newItem,
        items: workItems
        } );    
});

app.get('/about', function (req, res) {
    console.log('ABOUT page was accessed');
    //console.log(req.body);

    let someText = "This text was passed to this page via EJS"
    res.render('about', {
        someText : someText
        } );    
});

app.post('/', function (req, res) {
    console.log("post receieved");
    console.log('req.body.newItem: ', req.body.newItem);
    console.log('req.body.AddButton: ', req.body.AddButton);
    //console.log('req.body: ', req.body);


    newItem = req.body.newItem;
    title = req.body.AddButton;

    if (title === "Work List") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        foodItems.push(newItem);
        res.redirect("/");
    }
    
    
    //res.redirect("/");
});

//Note this route is not hit by list.ejs since the form post action="/" goes to home/root
app.post('/work', function (req, res) {
    console.log("post receieved");
    console.log('req.body.newItem: ', req.body.newItem);
    console.log('req.body: ', req.body);
    newItem = req.body.newItem;
    workItems.push(newItem);

    res.redirect("/work");
    
    //res.redirect("/");
});