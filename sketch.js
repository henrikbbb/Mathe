let cNeutral;
let cTrue;
let cFalse;
let inputs = [];
let colors = [];
let results = [];
let aufgabe = 1;
let correct;
let wrong = 0;

let buttonNext;

// Beschriftung: 1./2. Ziehung

function setup() {
	createCanvas(1000, 800);
	
	cNeutral = color(255, 255, 255, 150);
	cTrue = color(0, 255, 0, 150);
	cFalse = color(255, 0, 0, 150);
	
	let red = color(255, 0, 0);
	let blue = color(0, 0, 255);
	let yellow = color(255, 255, 0);
	let green = color(0, 255, 0);
	let orange = color(255, 150, 0);
	let purple = color(140, 0, 200);
	colors.push(red);
	colors.push(blue);
	colors.push(yellow);
	colors.push(green);
	colors.push(orange);
	colors.push(purple);
	
	setupButtons();	
	setupAufgabe1();
}

function draw() {
	background(200);
	//drawAufgabe(aufgabe);	
	drawLines();
	
	// Anzahl Kugeln
	let n = results.length;
	textSize(50);
	textAlign(CENTER, CENTER);
	for (let i = 0; i < n; i++){
		fill(colors[i]);
		text(results[i], width-n*50+i*50, 50);
	}
	
	// Error Box
	if (wrong > 0){
		wrong--;
		noStroke();
		fill(0);
		rect(width/8, height/3, width*3/4, height/3);
		fill(255);
		textAlign(CENTER, CENTER);
		text('Es gibt noch Fehler.', width/2, height/2);
	}
	
	// Ziehung
	fill(0);
	noStroke();
	textAlign(CENTER, CENTER);
	textSize(20);
	text('1. Ziehung', 100, 50);
	text('2. Ziehung', 400, 50);
	
}

function drawAufgabe(n){
	if (n == 1){
		drawAufgabe1();
	} else if (n == 2){
		drawAufgabe2();
	}
}

function drawLines(){
	stroke(0);
	strokeWeight(5);
	let n = results.length;
	
	for (let i = 0; i < n; i++){
		let y = i*height/n + height/n/2;
		stroke(colors[i]);
		line(100, height/2, 400, y);
	}	
	
	for (let i = 0; i < n*n; i++){
		let p = int(i/n);
		let y1 = p*height/n + height/n/2;
		let y2 = i*height/(n*n) + height/(n*n)/2;
		stroke(colors[i%n]);
		line(400, y1, 700, y2);
	}
	
	fill(0);
	noStroke();
	let r = 20;
	circle(100, height/2, r);
	for (let i = 0; i < n; i++){
		let y1 = i*height/n + height/n/2;
		circle(400, y1, r);
	}
}

function checkInputs(){
	correct = true;
	for (let i = 0; i < inputs.length; i++){
		let input = inputs[i];		
		let value = input.input.value();
		let numbers = split(str(value), '/');
		let result = int(numbers[0])/int(numbers[1]);
		if (abs(result - input.result) < 1/1000){
			input.input.style('background-color', cTrue);
		}else{
			input.input.style('background-color', cFalse);
			correct = false;
		}
	}
}

function setupButtons(){
	let x = 100;
	let y = 50;
	
	let buttonCheck = createButton('überprüfen');
	buttonCheck.mousePressed(checkInputs);
	buttonCheck.position(width, 0);
	buttonCheck.size(x, y);
	
	let buttonClear = createButton('alles löschen');
	buttonClear.mousePressed(clearInputs);
	buttonClear.position(width, y);
	buttonClear.size(x, y);
	
	buttonNext = createButton('nächste Aufgabe');
	buttonNext.mousePressed(submit1);
	buttonNext.position(width, 2*y);
	buttonNext.size(x, y);	
}

function setupInputs(){	
	let sum = 0;
	for (let i = 0; i < results.length; i++){
		sum += results[i];
	}
	
	let n = results.length;
	
	// 1. Ziehung
	for (let i = 0; i < n; i++){
		let y = height*(n+1+i*2)/(4*n);
		let result = results[i]/sum;
		inputs.push(new Input(250, y, result));
	}	
	
	// 2. Ziehung
	for (let i = 0; i < n*n; i++){
		let p = int(i/n);
		let y = p*height/n+height*(n+1+(i%n)*2)/(4*n*n);
		let result = results[i % n]/sum;
		inputs.push(new Input(550, y, result));
	}
	
	// Pfad-WS
	for (let i = 0; i < n*n; i++){
		let y = i*height/(n*n) + height/(n*n)/2;
		let p = int(i/n);
		let result = inputs[p].result*results[i % n]/sum;
		inputs.push(new Input(740, y, result));
	}
}

function clearInputs(){
	for (let i = 0; i < inputs.length; i++){
		let input = inputs[i];
		input.input.value('');
		input.input.style('background-color', cNeutral);
	}
}

class Input{
	constructor(x, y, result){
		let inputW = 80;
		let inputH = 30;
		this.input = createInput('');
		this.input.size(inputW, inputH);
		this.input.position(x-inputW/2, y-inputH/2);
		this.input.style('background-color', cNeutral);
		this.input.style('font-size', '30px');
		this.result = result;
	}
}