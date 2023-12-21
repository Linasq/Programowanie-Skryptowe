import http from 'node:http';
import { URL } from 'node:url';
import { readFileSync, writeFileSync } from 'node:fs'; 

function dodaj_wpis(){
  // pobranie pliku reservations.json, guests.json
  var read_guest = readFileSync('guests.json', 'utf8');
  var guests = JSON.parse(read_guest);

  var read_res = readFileSync('reservations.json', 'utf8');
  var reservations = JSON.parse(read_res);

  var return_str="";
  //TODO dodac wszystkie pierdoly do stringa
  // przemyslec co i jak wyswietlac
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
	// utworzenie karty
	return_str+=`<div class="w3-card w3-mobile" style="width: 33%; display: inline-block;" id="card+${i}">`

	// dodanie zdjecia
	return_str+=`<img src="pictures/pokoj${i}.jpg" class="w3-round" style="width: 100%; height: 227px; object-fit: cover;">`

	// utworzenie tekstu Pokoj nr x
	return_str+=`<h2>Pokoj nr ${i}</h2>`;

	// dodanie info o pokoju
	var cena = rooms[`pokoj${i}`]['price'];
	return_str += `<p>Cena - ${cena} </p>`

	var miejsce = rooms[`pokoj${i}`]['av_rooms'];
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
		<input type="text" id="name" name="input" required>
		<br>

		<label for="surname">Nazwisko:</label>
		<input type="text" id="surname" name="input" required>
		<br>

		<label for="room">Pokoj:</label>
		<input type="number" id="room" name="input" required>
		<br>

		<label for="data_p">Data zakwaterowania:</label>
		<input type="date" id="data_p" name="input" required>
		<br>

		<label for="data_z">Data wykwaterowania:</label>
		<input type="date" id="data_z" name="input" required>
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
  /* Route "GET('/dodaj_wpis')" */
  /* ---------------------- */
  else if (url.pathname === '/dodaj_wpis' && request.method === 'GET') {
	// pobieramy plik json i iterujemy po nim
	let read_json = readFileSync('wpis.json', 'utf8');
	let tab = JSON.parse(read_json);

	// uposledzone liczenie dlugosci
	let ctr = 0;
	for (let c  in tab) {ctr+=1;}
	ctr +=1;
	tab[`${ctr}`] = {"name": url.searchParams.get('name'), "opis": url.searchParams.get('area')};

	// zapis do pliku
	writeFileSync('wpis.json', JSON.stringify(tab));

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
