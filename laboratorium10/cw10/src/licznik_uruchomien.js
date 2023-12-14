import { argv } from 'node:process';
import { readFile, readFileSync, writeFile, writeFileSync } from 'node:fs';
import {exec} from 'node:child_process';
import readline from 'readline';

function read_sync() {
  let to_print = readFileSync('licznik', 'utf8');
  console.log('Liczba uruchomień: ', to_print);
  writeFileSync('licznik', (parseInt(to_print)+1).toString());
}


function read_async() {
  readFile('licznik', 'utf8',(err, data) => {
	if (err) throw err;
	console.log('Liczba uruchomień: ', data);
	let to_write = (parseInt(data)+1).toString();
	writeFile('licznik', to_write, (err) => {
	  if (err) throw err;
	});
  });
}

function execute_cmd(cmd) {
  exec(cmd, (err,output) => {
	if (err) throw err;
	console.log(output);
  });
}


function main(){
  const mode = argv[2];

  if (mode == '--sync') {read_sync();}
  else if (mode == '--async') {read_async();}
  else {
	console.log('Wprowadź komendy — naciśnięcie Ctrl+D kończy wprowadzanie danych');

	const read_input = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	let infinite_user = () => {
	  read_input.question("", cmd => {
		if (cmd){
		  execute_cmd(cmd);
		  infinite_user();
		}
	  });
	};
	infinite_user();
  }
}

main();
