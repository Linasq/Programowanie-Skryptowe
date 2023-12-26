import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

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

/* ******** */
/* "Routes" */
/* ******** */



app.get('/', (request, response) => {
  const app2Running = true;
  const app3Running = false;
  response.render('index', {app2Running, app3Running,"siteStudents":students}); // Render the 'index' view
});


/* ---------------------- */
/* Route "GET('/submit')" */
/* ---------------------- */
app.get('/submit', (request, response) => {
  response.render('hello', {message: `Hello ${request.query.name}`});
});

/* ---------------------- */
/* Route "GET('/WI')" */
/* ---------------------- */
app.get('/WI', async function  (request, response) {
  const app2Running = false;
  const app3Running = true;
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  const db = client.db('AGH');
  const collection = db.collection('students');
  const docs = await collection.find({wydzial:"WI"}).toArray();
  console.log(docs);
  response.render('index', {app2Running, app3Running, "students":docs});
  client.close();
});

/* ---------------------- */
/* Route "GET('/WIET')" */
/* ---------------------- */
app.get('/WIET', async function  (request, response) {
  const app2Running = false;
  const app3Running = true;
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  const db = client.db('AGH');
  const collection = db.collection('students');
  const docs = await collection.find({wydzial:"WIET"}).toArray();
  console.log(docs);
  response.render('index', {app2Running, app3Running, "students":docs});
  client.close();
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
