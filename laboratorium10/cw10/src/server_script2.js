import http from 'node:http';
import { URL } from 'node:url';
import { readFileSync, writeFileSync } from 'node:fs'; 

function dodaj_wpis(){
  // zwracany string 
  let to_return = '';

  // pobieramy plik json i iterujemy po nim
  let read_json = readFileSync('wpis.json', 'utf8');
  let tab = JSON.parse(read_json);

  for (const i in tab) {
	let items = tab[i];
	to_return += `<h1>${items['name']}</h1>\n<p>${items['opis']}</p>`;
  }
  return to_return;
}

dodaj_wpis();

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
<html lang="en">
  <head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Czekam az ktos zapomni i zostawi Jakub Liana</title>
  </head>
  <body>
  <div>
  `+dodaj_wpis()+`
  </div>
	<main>
	  <h3>Nowy wpis:</h3>
	  <form method="GET" action="/dodaj_wpis">
		<label for="name">Twoje imię i nazwisko</label>
		<br>
		<input name="name">
		<br>
		<label for="area">Treść wpisu</label>
		<br>
		<textarea name="area">Napisz cos ... </textarea>
		<br>
		<input type="submit">
	  </form>
	</main>
  </body>
</html>`);
	/* ************************************************** */
	response.end(); // The end of the response — send it to the browser
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
