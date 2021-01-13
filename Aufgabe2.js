function setupAufgabe2(){
	amounts = [1, 1, 1];
	setupInputs();	
}

function setupInputs2(){
	let result;
	let sum = sumAmount();
	
	// 2x gleiche Farbe
	result = 0;
	for (let i = 0; i < amounts.length; i++){
		result += amounts[i]*amounts[i];
	}
	result /= sum*sum;
	inputs.push(new Input(width - 100, 150, result));
	
	// kein rot
	result = 0;
	for (let i = 0; i < amounts.length; i++){
		for (let j = 0; j < amounts.length; j++){
			if (i*j > 0){
				result += amounts[i]*amounts[j];
			}
		}
	}
	result /= sum*sum;
	inputs.push(new Input(width - 100, 200, result));	
}

function submit2(){
	checkInputs();
	if (correct){;
		setupInputs2();
		draw2b = true;
		buttonNext.hide();
	}else{
		wrong = 100;
	}
}