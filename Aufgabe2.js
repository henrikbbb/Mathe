function setupAufgabe2(){
	amounts = [1, 1, 1];
	setupInputs();	
}

function submit2(){
	checkInputs();
	if (cheat || correct){
		setupAufgabe3();
	}else{
		wrong = 100;
	}
}