import http from 'node:http';
import { URL } from 'node:url';
import { readFileSync, writeFileSync } from 'node:fs'; 

function dodaj_wpis(){
  // pobranie pliku reservations.json, guests.json, rooms.json
  var read_guest = readFileSync('guests.json', 'utf8');
  var guests = JSON.parse(read_guest);

  var read_res = readFileSync('reservations.json', 'utf8');
  var reservations = JSON.parse(read_res);

  var read_room = readFileSync('rooms.json', 'utf8');
  var rooms = JSON.parse(read_room);

  var return_str="";
  return_str+=`<div clas="w3-card w3-mobile w3-center">`
  return_str+= `<img src="pictures/rooms.png" class="w3-round" style="width:100%; object-fit: cover;">`

  for (var i = 1; i <= Object.keys(guests).length; i++) {
	var fullname = guests[`${i}`].split(" ");
	return_str+=`<h2>${fullname[0]} ${fullname[1]}</h2>`
	return_str+=`<ul>`
	for (var j = 1; j <= Object.keys(reservations).length; j++) {
	  var reservation = reservations[`${j}`];
	  if (reservation['name'] == fullname[0] && reservation['surname'] == fullname[1]) {
		const date1 = new Date(reservation['date_s']);
		const date2 = new Date(reservation['date_e']);
		const diff_days = (date2 - date1) / (1000 * 60 * 60 * 24);
		const price = diff_days * parseInt(rooms[`pokoj${reservation['room']}`]['price']);
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
function dodaj_karty(){
  // pobranie pliku rooms.json
  var read_json = readFileSync('rooms.json', 'utf8');
  var rooms = JSON.parse(read_json);

  // zapisywanie wszystkiego do jednego stringa
  var return_str = "";

  for (let i = 1; i <= 3; i++) {
	var cena = rooms[`pokoj${i}`]['price'];
	var miejsce = rooms[`pokoj${i}`]['av_rooms'];
	// utworzenie karty
	return_str+= miejsce != '0' ? `<div class="w3-card w3-mobile" style="width: 33%; display: inline-block;" id="card+${i}">` : `<div class="w3-card w3-mobile" style="width: 33%; display: inline-block; background-color:red;" id="card+${i}">`

	// dodanie zdjecia
	return_str+=`<img src="pictures/pokoj${i}.jpg" class="w3-round" style="width: 100%; height: 227px; object-fit: cover;">`

	// utworzenie tekstu Pokoj nr x
	return_str+=`<h2>Pokoj nr ${i}</h2>`;

	// dodanie info o pokoju
	return_str += `<p>Cena - ${cena} </p>`
	return_str += `<p id="p2${i}">Wolnych miejsc - ${miejsce}</p>`;
	return_str+='</div>';
  }
  return return_str;
}


function requestListener(request, response) {
  console.log('--------------------------------------');
  console.log(`The relative URL of the current request: ${request.url}`);
  console.log(`Access method: ${request.method}`);
  console.log('--------------------------------------');
  // Create the URL object
  const url = new URL(request.url, `http://${request.headers.host}`);
  /* ************************************************** */
  // if (!request.headers['user-agent'])
  if (url.pathname !== '/favicon.ico')
	console.log(url);  

  /* ******** */
  /* "Routes" */
  /* ******** */

  /* ---------------- */
  /* Route "GET('/')" */
  /* ---------------- */
  if (url.pathname === '/' && request.method === 'GET') {
	// Generating the form if the relative URL is '/', and the GET method was used to send data to the server'
	/* ************************************************** */
	// Creating an answer header — we inform the browser that the returned data is HTML
	response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	/* ************************************************** */
	// Setting a response body
	response.write(`
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
	<div class="w3-container w3-mobile" id="karty">`+dodaj_karty()+`</div>


	<!-- div od formularza -->
	<div class="w3-container w3-center w3-mobile" style="width: 33%;margin: auto;">
	  <form action="/add" method="get" id="form" class="w3-form">

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
	<div class="w3-container w3-mobile" id="output" style="width: 33%; margin: auto;">`+dodaj_wpis()+`</div>


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
`);
	/* ************************************************** */
	response.end(); // The end of the response — send it to the browser
  }

  /* ---------------------- */
  /* Route "GET('/pictures')" */
  /* ---------------------- */
  else if (url.pathname.split("/")[1] == 'pictures') {
	var image = url.pathname.split('/')[2];
	var ext = image.split('.')[1];
	var file_to_load = readFileSync(`pictures/${image}`);
	response.writeHead(200, { 'Content-Type': `image/${ext}; charset=utf-8` });
	response.end(file_to_load, 'binary');
  }
  /* ---------------------- */
  /* Route "GET('/add')" */
  /* ---------------------- */
  else if (url.pathname === '/add' && request.method === 'GET') {
	// bedziemy zapisywac do guests.json, reservatoins.json oraz rooms.json
	var read_res = readFileSync('reservations.json', 'utf8');
	var reservations = JSON.parse(read_res);

	var read_g = readFileSync('guests.json', 'utf8');
	var guests = JSON.parse(read_g);

	var read_r = readFileSync('rooms.json', 'utf8');
	var rooms = JSON.parse(read_r);

	// by sie nie pieprzyc to zapisujemy do zmiennych dane z formularza
	var name = url.searchParams.get('name');
	var surname = url.searchParams.get('surname');
	var room = url.searchParams.get('room');
	var date_s = new Date(url.searchParams.get('data_p'));
	var date_e = new Date(url.searchParams.get('data_z'));

	// poczatkowa walidacja danych z formularza

	console.log(`Siema mordy`);
	console.log(room);
	console.log(rooms[`pokoj${room}`]);
	// sprawdzamy miejsce w pokoju
	if (rooms[`pokoj${room}`]['av_rooms'] == '0') {console.error("Brak miejsca w danym pokoju");}
	//sprawdzamy date
	else if (date_e < date_s) {console.error("Data wykwaterowania wczesniejsza niz data zakwaretowania");}
	//lecimy dalej
	else {
	  // sprawdzamy czy gosc juz rezerwowal cos kiedys
	  var flag = 1;
	  for (var i=1; i <= Object.keys(guests).length; i++){
		if (guests[`${i}`] == `${name} ${surname}`) {
		  flag = 0;
		  break;
		}
	  }

	  // dodajemy goscia
	  if (flag) {
		var ctr = Object.keys(guests).length + 1;
		guests[`${ctr}`] = `${name} ${surname}`;
	  }

	  // zmiana dostepnosci pokoju
	  rooms[`pokoj${room}`]['av_rooms'] = parseInt(rooms[`pokoj${room}`]['av_rooms']) - 1;

	  // dodanie rezerwacji
	  var ctr = Object.keys(reservations).length + 1;
	  reservations[`${ctr}`] = {"name":name, "surname":surname, "room":room, "date_s":date_s, "date_e":date_e};

	}

	// zapis do pliku
	writeFileSync('guests.json', JSON.stringify(guests));
	writeFileSync('rooms.json', JSON.stringify(rooms));
	writeFileSync('reservations.json', JSON.stringify(reservations));

	// Creating an answer header — we inform the browser that the returned data is plain text
	response.writeHead(302, { 'Location': '/' });
	/* ************************************************** */
	response.end(); // The end of the response — send it to the browser
  }

  /* -------------------------- */
  /* If no route is implemented */
  /* -------------------------- */
  else {
	response.writeHead(501, { 'Content-Type': 'text/plain; charset=utf-8' });
	response.write('Error 501: Not implemented');
	response.end();
  }
}


/* ************************************************** */
/* Main block
/* ************************************************** */
const server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');
