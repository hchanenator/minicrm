// my sample app, demonstrating a mini-CRM in the form of a contact manager

// import needed libraries (modules, in the parlance of Node)
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Express Validator usage
const { check, validationResult } = require('express-validator/check');

// set up some variables
var port = 3000;

// initialize the app
var app = express();

// defining the middleware
// these "intercepts" the req/res object and allows you to do something

/*
// creating a simple logger.  Takes the request, response objects
// as well as a next object, which is a callback function
var logger = function(req, res, next) {
    // log something to the console
    console.log('Just doing something... ' + res.statusCode);
    next();
};


// After the middleware have been defined, you have to use them in
// the app.
// The order of the middleware is important!!!
app.use(logger);
*/

// Add the Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Add a templating engine.  In this example, EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static path
app.use(express.static(path.join(__dirname, 'public')));

// Express Validator


// for demonstration
var dude = {
  name: 'The Rock',
  age: 45
};


// Array of contacts
var contacts = [
    {
        id: 1,
        first_name: 'Clark',
        last_name:  'Kent',
        alias:      'Superman'
    },
    {
        id: 2,
        first_name: 'Diana',
        last_name:  'Prince',
        alias:      'Wonder Woman'
    },
    {
        id: 3,
        first_name: 'Bruce',
        last_name:  'Wayne',
        alias:      'Batman'
    },
];

// set up my routes
app.get('/', function(req, res) {
   // res.type('text/html');
   // res.send('<b><font color="#5f9ea0">Hello Herb!</font> </b>');
   //  res.json(dude);
    res.render('index', {
        name: 'Kaeley',
        contacts
    });
});

app.post('/contacts/add', [
    check('first_name').isEmpty()
], function (req, res) {

    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${location}[${param}]: ${msg}`;
    };

    const result = validationResult(req).formatWith(errorFormatter);

    if (!result.isEmpty()) {
        // Response will contain something like
        // { errors: [ "body[password]: must be at least 10 chars long" ] }
        return res.json({ errors: result.array() });
    }

    if (errors) {
        console.log('Houston, we have a problem')
    } else {
        var newContact = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            alias: req.body.alias
        };

        console.log(newContact);
    }


});

// define port to listen on
app.listen(port, function () {
    console.log('Server started on port ' + port);
});

