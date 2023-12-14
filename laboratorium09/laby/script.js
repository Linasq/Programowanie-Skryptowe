// Pozdrawiam, Jakub Liana

// funkcja, do tego by sie css nie wysral
function myFunction(a) {
  var x = document.getElementById(a);
  if (x.className.indexOf("w3-show") == -1) { 
	x.className += " w3-show";
  } else {
	x.className = x.className.replace(" w3-show", "");
  }
}

// map dla pokojow
let rooms = new Map();
rooms.set(1, [1, 350, 1]);
rooms.set(2, [3, 250, 3]);
rooms.set(3, [2, 300, 2]);

// tablica gosci
let guests = []; 
// guests.push(["Jan", "Kowalski"]);

// map dla rezerwacji
let reservations = {};
// reservations[["Jan", "Kowalski"]] = [[1, "2012-12-12", "2012-12-14"]];


// funkcja do wyswietlenia jaki gosc zarezerwowal dane pokoje
function room(guest){
  // pobranie elementu glownego
  const out = document.getElementById("output");

  //sprawdzamy, czy juz stworzylismy takiego diva
  const temp = document.getElementById("funkcja")
  if (temp != null) {temp.remove();}

  // stworzenie karty
  const karta = document.createElement("div");
  karta.className = "w3-card w3-mobile";
  karta.id = "funkcja";

  // stworzenie img
  const image = document.createElement("img");
  image.src = "pictures/rooms.png";
  image.style = "width: 100%; object-fit: cover;";
  
  // stworzenie headera
  const header = document.createElement("h2");
  header.textContent = `Pokoje wynajęte przez: ${guest[0]} ${guest[1]}`;

  const ul = document.createElement("ul");
  for (let key in reservations) {
	key = key.split(",");
	if (key.every(function(value, index){return value == guest[index]})) {
	  for (pokoj of reservations[key]) {
		const date1 = new Date(pokoj[1],);
		const date2 = new Date(pokoj[2]);
		let diffDays = (date2 - date1) / (1000 * 60 * 60 * 24);
		let cena = diffDays * rooms.get(pokoj[0])[1];

		// stworzenie listy
		const li = document.createElement("li");
		li.textContent = `Pokoj nr ${pokoj[0]}\t cena: ${cena}`;
		ul.appendChild(li);
	  }
	  break;
	}
  }
  // dodanie wszystkiego
  karta.appendChild(image);
  karta.appendChild(header);
  karta.appendChild(ul);

  out.appendChild(karta);
}


// funkcja do wyswietlenia wszystkich gosci hotelu
function guest() {
  // pobranie elementu glownego
  const out = document.getElementById("output");

  //sprawdzamy, czy juz stworzylismy takiego diva
  const temp = document.getElementById("funkcja")
  if (temp != null) {temp.remove();}

  // stworzenie karty
  const karta = document.createElement("div");
  karta.className = "w3-card w3-mobile";
  karta.id = "funkcja";

  // stworzenie img
  const image = document.createElement("img");
  image.src = "pictures/goscie.jpg";
  image.style = "width: 100%; object-fit: cover;";
  
  // stworzenie headera
  const header = document.createElement("h2");
  header.textContent = "Goscie w Naszym Hotelu"

  // stworzenie listy li
  const ul = document.createElement("ul");
  for (g of guests) {
	const li = document.createElement("li");
	li.textContent = `${g[0]} ${g[1]}`;
	ul.appendChild(li);
  }

  // dodanie wszystkiego
  karta.appendChild(image);
  karta.appendChild(header);
  karta.appendChild(ul);

  out.appendChild(karta);
}


// funkcja do rezerwowania gosci
function book(imie, nazwisko, nr, dataP, dataK){
  nr = parseInt(nr);
  // sprawdzamy czy sa wolne miejsca w danym pokoju
  if (rooms.get(nr)[2] == 0) {alert("Brak wolnych miejsc w pokoju")}
  else if (new Date(dataP) > new Date(dataK)) {alert("Data wykwaterowania jest wczesniej niz data zameldowania")}
  else {
	let alreadyIn = 1;
	for (g of guests){
	  if (g[0] == imie && g[1] == nazwisko) {alreadyIn = 0}
	} 
	if(alreadyIn){
		guests.push([imie, nazwisko]);
		reservations[[imie, nazwisko]] = [];
	  }
	let tmp = rooms.get(nr);
	tmp[2] -= 1;
	rooms.set(nr, tmp);
	reservations[[imie, nazwisko]].push([nr, dataP, dataK]);

	// aktualizacja wolnych pokoi
	if (tmp[2] == 0) {
	  const karta = document.getElementById(`card${nr}`);
	  karta.style = "background-color: red; width: 33%; display: inline-block;";
	}
	const p = document.getElementById(`p2${nr}`);
	p.textContent = `Wolnych miejsc - ${tmp[2]}`;
	alert("Pomyślnie zarejestrowano");
  }
}


// funkcja do generowania kart hotelowych
function generateCards() {
  const pokoje_id = document.getElementById("karty");
  for (let i = 1; i <= 3; i++) {
	// utworzenie karty
	const card = document.createElement('div');
	card.className = "w3-card w3-mobile";
	card.style = "width: 33%; display: inline-block;";
	card.id = "card"+i;

	// utworzenie tekstu Pokoj nr x
	const header = document.createElement('h2');
	header.textContent = "Pokoj nr "+i;

	// dodanie zdjecia
	const image = document.createElement('img');
	// tu sa te cudzyslowy co sa na ~
	image.src = `pictures/pokoj${i}.jpg`;
	image.className = "w3-round";
	image.style = "width: 100%; height: 227px; object-fit: cover;";

	// dodanie info o pokoju
	const p1 = document.createElement('p');
	// moze kiedys sie to przyda
	// p1.id = `p1${i}`;
	p1.textContent = `Cena - ${rooms.get(i)[1]}`;

	const p2 = document.createElement('p');
	p2.id = `p2${i}`;
	p2.textContent = `Wolnych miejsc - ${rooms.get(i)[2]}`; 

	// dodanie wszystkiego do karty
	card.appendChild(image);
	card.appendChild(header);
	card.appendChild(p1);
	card.appendChild(p2);

	pokoje_id.appendChild(card);
  }
}


document.addEventListener('DOMContentLoaded', function(event){generateCards();});

document.addEventListener('submit', function(event){
  event.preventDefault();

  var userInput = document.getElementById("textInput").value;
  console.log("You have entered: ", userInput);

  var tab = userInput.split(' ');

  // wyswietlenie wykazu wynajec pokoi
  if (tab[0] == "rooms") {
	if (tab.length == 3) {room([tab[1], tab[2]])}
	else {alert("Niepoprawna ilosc argumentow")}
  }
  // wynajecie pokoju na podany okres
  else if (tab[0] == "book") {
	if (tab.length == 6) {book(tab[1], tab[2], tab[3], tab[4], tab[5])}
	else {alert("Niepoprawna ilosc argumentow")}
  }
  // wyswietlenie listy aktualnych gosci
  else if (tab[0] == "guests") {guest()}
  // ostrzezenie, nie ma takiej komendy
  else {
	alert("Brak komendy, wiecej instrukcji znajdziesz w konsoli");
	console.group("Uzywanie komendy");
	console.warn("Brak podanej komendy");
	console.warn("Ponizej sa przyklady uzyc");
	console.log("book imie nazwisko nr_pokoju YYYY-MM-DD YYYY-MM-DD");
	console.log("rooms imie nazwisko");
	console.log("guests");
	console.log("hotel");
	console.groupEnd("Uzywanie komendy");
  }
});
