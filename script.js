var player = 'X';
var winCombinations = [
	[1, 2, 3],
	[1, 4, 7],
	[1, 5, 9],
	[2, 5, 8],
	[3, 6, 9],
	[3, 5, 7],
	[4, 5, 6],
	[7, 8, 9]
];

var box = document.getElementById('box');
var items = document.getElementsByClassName('item');
var reset = document.getElementById('reset');
var message = document.getElementById('message');
var stepsCount = 0;
var stepsX = [];
var stepsO = [];

for (let i = 0; i < items.length; i++) {
	items[i].addEventListener('click', move);
}

reset.addEventListener('click', resetGame);

function move () {
	if (this.textContent)
		return;

	let index = +this.getAttribute('data-index');
	stepsCount++;
	if (player == 'X') {
		stepsX.push(index);
	} else {
		stepsO.push(index);
	}
	this.innerHTML = player;

	if (!checkIfFinished()) 
		changePlayer();
}

function changePlayer () {
	player = player == 'X' ? 'O' : 'X';
	message.innerHTML = 'Player ' + player + ' step';
}

function checkIfFinished () {
	if (stepsX.length < 2 || stepsO.length < 2) {
		return false;
	}
	steps = player == 'X' ? stepsX : stepsO;
	for (let i = 0; i < winCombinations.length; i++) {
		let match = true;
		for (let j = 0; j < winCombinations[i].length; j++) {
			if (steps.indexOf(winCombinations[i][j]) == -1) {
				match = false;
			}
		}
		if (match) {
			message.innerHTML = 'Winner: ' + player;
			for (let i = 0; i < items.length; i++) {
				items[i].style.pointerEvents = 'none';
			}
			
			return true;
		}		
	}

	if (stepsCount == items.length) {
		message.innerHTML = 'Draw...Try again';
		return true;
	}
}

function resetGame () {
	stepsX = [];
	stepsO = [];
	player = 'X';
	message.innerHTML = 'Player ' + player + ' move';
	stepsCount = 0;
	for (let i = 0; i < items.length; i++) {
		items[i].style.pointerEvents = 'auto';
		items[i].innerHTML = '';
	}
}