import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import csurf from 'csurf';
import helmet from 'helmet';

/* *************************** */
/* Configuring the application */
/* *************************** */
const csrfProtection = csurf({ cookie: true });
const app = express();

app.locals.pretty = app.get('env') === 'development'; // The resulting HTML code will be indented in the development environment

/* ************************************************ */
app.use(helmet());

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


/* *********** */
/* "Functions" */
/* *********** */


function dodaj_wpis(guests, reservations, rooms){
  var return_str="";
  return_str+=`<div clas="w3-card w3-mobile w3-center">`
  return_str+= `<img src="img/rooms.png" class="w3-round" style="width:100%; object-fit: cover;">`

  for (var i = 0; i < Object.keys(guests).length; i++) {
	var name = guests[i]["name"];
	var surname = guests[i]["surname"];
	return_str+=`<h2>${name} ${surname}</h2>`
	return_str+=`<ul>`
	for (var j = 0; j < Object.keys(reservations).length; j++) {
	  var reservation = reservations[j];
	  if (reservation['name'] == name && reservation['surname'] == surname) {
		const date1 = new Date(reservation['date_s']);
		const date2 = new Date(reservation['date_e']);
		const diff_days = (date2 - date1) / (1000 * 60 * 60 * 24);
		const price = diff_days * parseInt(rooms[parseInt(reservation['room']) - 1]['price']);
		return_str += `<li>Rezerwacja nr ${j}</li>`
		return_str += `<ol>`;
		return_str += `<li>Pokoj nr ${reservation['room']}</li><li>Ilosc dni: ${diff_days}</li><li>Cena: ${price}</li>`;
		return_str += `</ol>`;
	  }
	}
	return_str+=`</ul>`
  }

  return_str+=`</div>`
  return return_str;
}


// dodawanie kart
function dodaj_karty(rooms){
  // zapisywanie wszystkiego do jednego stringa
  var return_str = "";

  for (let i = 0; i < 3; i++) {
	var cena = rooms[i]['price'];
	var miejsce = rooms[i]['av_rooms'];
	// utworzenie karty
	return_str+= miejsce != '0' ? `<div class="w3-card w3-mobile" style="width: 33%; display: inline-block;" id="card+${i}">` : `<div class="w3-card w3-mobile" style="width: 33%; display: inline-block; background-color:red;" id="card+${i}">`

	// dodanie zdjecia
	return_str+=`<img src="/img/pokoj${i+1}.jpg" class="w3-round" style="width: 100%; height: 227px; object-fit: cover;">`

	// utworzenie tekstu Pokoj nr x
	return_str+=`<h2>Pokoj nr ${i+1}</h2>`;

	// dodanie info o pokoju
	return_str += `<p>Cena - ${cena} </p>`
	return_str += `<p id="p2${i+1}">Wolnych miejsc - ${miejsce}</p>`;
	return_str+='</div>';
  }
  return return_str;
}

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

  response.setHeader('X-Frame-Options', 'DENY');
  response.send(`
   <!DOCTYPE html>
<html lang="pl">
  <head>
	<meta charset="UTF-8">
	<meta name="viewport"
		  content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><!-- Icons -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
	<title>
	  Agroturystyka "Olszyny"
	</title>
  </head>
  <body>
	<script src="https://www.w3schools.com/lib/w3.js"></script>

	<!-- div od samego headera -->
	<div class="w3-bar w3-grey w3-large"> 
	  <div class="w3-bar-item w3-text-larger w3-mobile" style="font-size: larger;"><i class="fa-solid fa-cow fa-lg"></i> <b> Agroturystyka "Olszyny"</b></div>

	  <button class="w3-bar-item w3-button w3-hide-large w3-hide-medium w3-center" onclick="myFunction('demo')">&#9776;</button>
	  <div id="demo" class="w3-dropdown-content w3-bar-block w3-border w3-hide-large w3-hide-medium">
		<a href="#form" class="w3-bar-item w3-button">Zarezerwuj</a>
		<div class="w3-dropdown-click w3-right w3-mobile w3-hide-large w3-hide-medium">

		  <button class="w3-button w3-text-grey" style="font-size: medium;" onclick="myFunction('test')">Oferta  <i class="fa fa-caret-down"></i></button>

		  <div id="test" class="w3-dropdown-content w3-bar-block w3-border">
			<a href="#" class="w3-bar-item w3-button">Noclegi</a>
			<a href="#" class="w3-bar-item w3-button">Wyżywienie</a>
			<a href="#" class="w3-bar-item w3-button">Atrakcje</a>
		  </div>

		</div>
	  </div>

	  <a href="#form" class="w3-bar-item w3-button w3-right w3-text-grey w3-mobile w3-hide-small" style="font-size: medium;">Zarezerwuj</a>

	  <div class="w3-dropdown-click w3-right w3-mobile w3-hide-small">

		<button class="w3-button w3-text-grey" style="font-size: medium;" onclick="myFunction('menu')">Oferta  <i class="fa fa-caret-down"></i></button>

		<div id="menu" class="w3-dropdown-content w3-bar-block w3-border">
		  <a href="#" class="w3-bar-item w3-button">Noclegi</a>
		  <a href="#" class="w3-bar-item w3-button">Wyżywienie</a>
		  <a href="#" class="w3-bar-item w3-button">Atrakcje</a>
		</div>

	  </div>
	</div>


	<!-- placeholder dla naszych kart -->
	<div class="w3-container w3-mobile" id="karty">`+dodaj_karty(rooms)+`</div>


	<!-- div od formularza -->
	<div class="w3-container w3-center w3-mobile" style="width: 33%;margin: auto;">
	  <form action="/" method="post" id="form" class="w3-form">

		<label for="name">Imie:</label>
		<input type="text" id="name" name="name" required>
		<br>

		<label for="surname">Nazwisko:</label>
		<input type="text" id="surname" name="surname" required>
		<br>

		<label for="room">Pokoj:</label>
		<input type="number" id="room" name="room" required>
		<br>

		<label for="data_p">Data zakwaterowania:</label>
		<input type="date" id="data_p" name="data_p" required>
		<br>

		<label for="data_z">Data wykwaterowania:</label>
		<input type="date" id="data_z" name="data_z" required>
		<br>

		<button type="submit">Zarezerwuj</button>
	  </form>
	</div>


	<!-- div ktory wyswietla output dla komend: guests oraz rooms -->
	<div class="w3-container w3-mobile" id="output" style="width: 33%; margin: auto;">`+dodaj_wpis(guests, reservations, rooms)+`</div>


	<!-- div od stopki na dole -->
	<div class="w3-container w3-mobile" style="width: 100%;margin: auto;">
	  <div class="w3-container w3-grey" style="width: 100%;text-align: right;">
		<i class="fa-regular fa-copyright"></i> Jakub Liana
	  </div>
	  <div class="w3-container">
		<p class="w3-text-blue" style="text-decoration: underline;">+48 123 123 123</p>
		<a href="mailto:olszyny@tarnow.pl" class="w3-text-blue">olszyny@tarnow.pl</a>
	  </div>
	</div>
	<script>
	  function myFunction(a) {
		var x = document.getElementById(a);
		if (x.className.indexOf("w3-show") == -1) { 
		  x.className += " w3-show";
		} else {
		  x.className = x.className.replace(" w3-show", "");
		}
	  }
	</script>
  </body>
</html>
`); // Send the response to the browser
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
  try {
	let x0 = new Date(start_date);
	let x1 = new Date(end_date);
	if (x0 >= x1) {update = false;}
	if (isNaN(x0.getDate())) {update = false;}
	if (isNaN(x1.getDate())) {update = false;}
	for (var i = 0; i < parseInt(name.length); i++) {
	  var l = name[i].charCodeAt();
	  if(!((l >= 65 && l <= 90) || (l >= 97 && l <= 122))) {update = false;}
	}
	for (var i = 0; i < parseInt(surname.length); i++) {
	  var l = surname[i].charCodeAt();
	  if(!((l >= 65 && l <= 90) || (l >= 97 && l <= 122))) {update = false;}
	}
  } catch (e) {
	update = false;
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
		console.log(av);
		collectionRom.updateOne({room:room}, {$set:{av_rooms:av}});
		collectionRes.insertOne({name:name, surname:surname, room:room, date_s:start_date, date_e:end_date});
	  }
	  catch (e) {
		console.log(e);
	  }
	  response.writeHead(302, {'Location':'/'});
	  response.end();
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
