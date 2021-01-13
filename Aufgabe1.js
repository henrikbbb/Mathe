function setupAufgabe1(){
	amounts = [1, 1];
	setupInputs();
}

function submit1(){
	checkInputs();
	if (correct){
		for (let i = 0; i < inputs.length; i++){
			let input = inputs[i];
			input.input.hide();
		}
		inputs = [];
		aufgabe = 2;
		setupAufgabe2();
		//buttonNext.hide();
	}else{
		wrong = 100;
	}
}