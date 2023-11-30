 function funkcja_zwrotna() {
	let pole_tekstowe = document.forms[0].elements[0].value;
	let pole_liczbowe = document.forms[0].elements[1].value;
	console.log(pole_tekstowe, typeof pole_tekstowe);
	console.log(pole_liczbowe, typeof pole_liczbowe);
}

 for (let i = 0; i<4; i++) {
	let x = window.prompt("Wpisz cos: ");
	console.log(x, typeof x);
}

