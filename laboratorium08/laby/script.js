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
  console.group("Wykaz pokojow");
  console.log("Pokoje wynajete przez:", guest[0], guest[1]);
  console.log("| Nr | Cena |");

  for (let key in reservations) {
	key = key.split(",");
	if (key.every(function(value, index){return value == guest[index]})) {
	  for (pokoj of reservations[key]) {
		const date1 = new Date(pokoj[1],);
		const date2 = new Date(pokoj[2]);
		let diffDays = (date2 - date1) / (1000 * 60 * 60 * 24);
		let cena = diffDays * rooms.get(pokoj[0])[1];
		console.log("|", pokoj[0], " |", cena, "|");
	  }
	  break;
	}
  }

  console.groupEnd("Wykaz pokojow");
}


// funkcja do wyswietlenia wszystkich gosci hotelu
function guest() {
  console.group("Goscie");
  for (g of guests) {
	console.log(g[0], g[1]);
  }
  console.groupEnd("Goscie");
}


// funkcja do wyswietlenia stanu hotelu
function hotel(){
  console.group("Hotel Marmur");
  console.log("| Nr | Stan | Cena |");
  for ([key, value] of rooms){
	console.log("|", key, " | ", value[2], "  | ", value[1], "|");
  }
  console.groupEnd("Hotel Marmur");
}


// funkcja do rezerwowania gosci
function book(imie, nazwisko, nr, dataP, dataK){
  nr = parseInt(nr);
  // sprawdzamy czy sa wolne miejsca w danym pokoju
  if (rooms.get(nr)[2] == 0) {console.error("Brak wolnych miejsc w pokoju")}
  else if (new Date(dataP) > new Date(dataK)) {console.error("Data wykwaterowania jest wczesniej niz data zameldowania")}
  else {
	if (!guests.includes([imie, nazwisko])) {
	  guests.push([imie, nazwisko]);
	  reservations[[imie, nazwisko]] = [];
	}
	let tmp = rooms.get(nr);
	tmp[2] -= 1;
	rooms.set(nr, tmp);
	reservations[[imie, nazwisko]].push([nr, dataP, dataK]);
  }
}



document.addEventListener('submit', function(event){
  event.preventDefault();

  var userInput = document.getElementById("textInput").value;
  console.log("You have entered: ", userInput);

  var tab = userInput.split(' ');

  // wyswietlenie wykazu wynajec pokoi
  if (tab[0] == "rooms") {
	if (tab.length == 3) {room([tab[1], tab[2]])}
	else {console.error("Niepoprawna ilosc argumentow")}
  }
  // wynajecie pokoju na podany okres
  else if (tab[0] == "book") {
	if (tab.length == 6) {book(tab[1], tab[2], tab[3], tab[4], tab[5])}
	else {console.error("Niepoprawna ilosc argumentow")}
  }
  // wyswietlenie listy aktualnych gosci
  else if (tab[0] == "guests") {guest()}
  // wyswietlenie stanu hotelu
  else if (tab[0] == "hotel") {hotel()}
  // ostrzezenie, nie ma takiej komendy
  else {
	console.group("Uzywanie komendy");
	console.warn("Brak podanej komendy");
	console.warn("Ponizej sa przyklady uzyc");
	console.log("book imie nazwisko nr_pokoju YYYY-MM-DD YYYY-MM-DD");
	console.log("rooms imie nazwisko");
	console.log("guests");
	console.log("hotel");
	console.groupEnd("Uzywanie komendy");
  }


  // if sprawdza co wpisano, book, rooms, show i w zaleznosci od tego robimy kolejna czesc kodu
  // trzeba jeszcze gdzies zahardkodowac dane o gosciach i pokojach
});
