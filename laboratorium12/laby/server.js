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
app.use(express.static('public'));

/* ******** */
/* "Routes" */
/* ******** */


/* Get / */
app.get('/', async function (request, response) {
  // polaczenie z baza danych
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  const db = client.db('Hotel');
  const collectionRom = db.collection('Rooms');
  const collectionGue = db.collection('Guests');
  const collectionRes = db.collection('Reservations');

  const guests = await collectionGue.find().toArray();
  const reservations = await collectionRes.find().toArray();
  const rooms = await collectionRom.find().toArray();

  response.render('index', {"guests":guests, "reservations":reservations, "rooms":rooms});
 });


/* POST / */
app.post('/', async function (request, response) {
  var name = request.body.name;
  var surname = request.body.surname;
  var room = parseInt(request.body.room);
  var start_date = request.body.data_p;
  var end_date = request.body.data_z;
  var update = true;

  // sprawdzanie poprawnosci danych
  if (room > 3 || room < 1) {update = false;}
  if (new Date(start_date) > new Date(end_date)) {update = false;}
  for (var i = 0; i < name.length; i++) {
	var l = name[i].charCodeAt();
	if(!((l >= 65 && l <=90) || (l >=97 && l <= 122))) {update = false;}
  }
  for (var i = 0; i < surname.length; i++) {
	var l = surname[i].charCodeAt();
	if(!((l >= 65 && l <=90) || (l >=97 && l <= 122))) {update = false;}
  }

  if (update == true)  {
	// polaczenie z baza danych
	const client = new MongoClient('mongodb://127.0.0.1:27017');
	await client.connect();
	const db = client.db('Hotel');
	const collectionGue = db.collection('Guests');
	const collectionRes = db.collection('Reservations');
	const collectionRom = db.collection('Rooms');

	// dodanie guesta jak go nie bylo
	if ((await collectionGue.find({name:name, surname:surname}).toArray()).length == 0){
	  collectionGue.insertOne({name:name, surname:surname});
	}

	// proba dodania zmiany dostepnosci pokoju
	var avaibility = await collectionRom.find({room:room}).toArray();
	var avaibility = parseInt(avaibility[0]['av_rooms']);
	if (avaibility == 0) {
	  response.status(404).json({error:"This room is not available anymore"})
	}
	else{
	  try {
		var av = avaibility-1;
		collectionRom.updateOne({room:room}, {$set:{av_rooms:av}});
		collectionRes.insertOne({name:name, surname:surname, room:room, date_s:start_date, date_e:end_date});
	  }
	  catch (e) {
		console.error(e);
	  }
	  response.status(200);
	}
  }
  else {
	response.status(404).json({error:"Hello Hecker, nice try"});
  }
});


app.listen(8000, () => {
  console.log('The server was started on port 8000');
  console.log('To stop the server, press "CTRL + C"');
});     
