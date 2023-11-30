'use strict';
function sum(x,y) {
    return x+y;
}

function sum_strings(a) {
  let sum = 0;
  let x = 0;
  for (const value of a) {
	x = parseInt(value);
	if (!isNaN(x)){
	  sum += x;
	}
  }
  return sum
}

function digits(s){
  let tab = [0,0];
  for (const value of s) {
	let x = parseInt(value);
	if(!isNaN(x)) {
	  if (x % 2 == 1) tab[0] += x;
	  else tab[1] += x;
	}
  }
  return tab
}

function letters(s) {
  let tab = [0,0];
  for (const value of s) {
	if (/^[a-z]$/.test(value)) {tab[0]+=1;}
	else if (/^[A-Z]$/.test(value)) {tab[1]+=1;}
  }
  return tab;
}
