import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();
app.set('view engine', 'pug');

app.locals.pretty = app.get('env') === 'development'; // The resulting HTML code will be indented in the development environment

/* ************************************************ */

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))


// some things from mistero polako
let students = [
      {
            fname: 'Jan',
            lname: 'Kowalski'
      },
      {
            fname: 'Anna',
            lname: 'Nowak'
      },
];

let table = {siteStudents: students};


/* ******** */
/* "Routes" */
/* ******** */

app.get('/', (request, response) => {
    response.render('index', table); // Render the 'index' view
});

/* ************************************************ */

/* ---------------------- */
/* Route "GET('/submit')" */
/* ---------------------- */
app.get('/submit', (request, response) => {
    response.render('hello', {message: `Hello ${request.query.name}`});
});

/* ---------------------- */
/* Route "POST('/')" */
/* ---------------------- */
app.post('/', (request, response) => {
    response.render('hello', {message:`Hello ${request.body.name}`});
});

app.listen(8000, () => {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});          
