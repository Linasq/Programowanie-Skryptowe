import express, { Express, Request, Response } from "npm:express@^4";
import morgan from "npm:morgan@^1";
import { MongoClient } from 'mongodb';


function dodaj_wpis(wpis: Array<object>): string{
  // zwracany string 
  let to_return: string = '';

  // pobieramy plik json i iterujemy po nim

  for (const i in wpis) {
	console.log(i);
	let items = wpis[i];
	to_return += `<h1>${items['name']}</h1>\n<p>${items['area']}</p>`;
  }
  return to_return;
}


const app: Express = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

  /* ******** */
  /* "Routes" */
  /* ******** */

  /* ---------------- */
  /* Route "GET('/')" */
  /* ---------------- */
app.get('/', async function (request: Request, response: Response) {
	const client = new MongoClient('mongodb://127.0.0.1:27017');
	await client.connect();
	const db = client.db('ksiega_gosci');
	const collection = db.collection('wpis');

	const wpisy = await collection.find().toArray();

	response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	/* ************************************************** */
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
  `+dodaj_wpis(wpisy)+`
  </div>
	<main>
	  <h3>Nowy wpis:</h3>
	  <form method="POST" action="/">
		<label for="name">Twoje imię i nazwisko</label>
		<br>
		<input name="name">
		<br>
		<label for="area">Treść wpisu</label>
		<br>
		<textarea name="area"></textarea>
		<br>
		<input type="submit">
	  </form>
	</main>
  </body>
</html>`);
	/* ************************************************** */
	response.end();
});
  /* ------------------ */
  /* Route "POST('/')" */
  /* ---------------- */
app.post('/', async function (request: Request, response: Response) {
	const client = new MongoClient('mongodb://127.0.0.1:27017');
	await client.connect();
	const db = client.db('ksiega_gosci');
	const collection = db.collection('wpis');

	// collect input from form
	const name: string = request.body.name;
	const wpis: string = request.body.area;

	collection.insertOne({name:name, area:wpis});

	// Creating an answer header — we inform the browser that the returned data is plain text
	response.writeHead(302, { 'Location': '/' });
	/* ************************************************** */
	response.end(); // The end of the response — send it to the browser
});

/* ************************************************** */
/* Main block
/* ************************************************** */
app.listen(8000, function(){
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');
});
