
/*
===========================================================================================================================================
		
		Rita Rani Paul-Front-end Tech Degree student @ Treehouse 
		Project-VII: A Game Show App

	App.js is written to play a word gessing game -  Wheel of Success. Where player click a button from an onscreen keyboard
	to try to guess a random phrase. A player can keep choosing letter until five incorrect guesses. If the player completes 
	the phrase before they run out of guesses, a winning screen will display. If the player guesses incorrectly 5 times, a losing 
	screen will display.A player can guess a letter only once. After thr letter is  guessed the programming disable that letter.

	The testing also includes the three browsers: 

		1. Google Chrome
		2. Internet Explorer
		3. Mozilla Firefox

===========================================================================================================================================
*/

const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let start = document.getElementsByClassName("btn__reset");
const overlay =  document.getElementById("overlay");
let but = document.getElementsByTagName('button');
let letterFound;
let body = document.getElementsByTagName("body");
let div = document.getElementById("new-overlay");
//let div_tag=document.getElementsByClassName("win");
//let div_tag1=document.getElementsByClassName("lose");
let title=document.getElementsByClassName("title");

let missed = 0;
const phrases = [
	"Early in the morning Eat the frog",
	"Picture paints a thousand words",
	"Actions speak louder than words",
	"You cant judge a book by its cover",
	"Get up on the wrong side of the bed",
	
];

//=======================Hide the Overlay======================================

function hideIt(){
	overlay.style.display = 'none';
}

//=======================Get a random phrase===================================

function getRandomPhraseAsArray(arr){
	let randomNum = Math.floor(Math.random() * 5);
	arr[randomNum].toString();
	console.log("phrase from get random Phrase Array " + arr[randomNum]);
	/*let withoutSpace = arr[randomNum].replace(/ /g, '');*/
	//let phraseChars = withoutSpace.split('');
	//console.log("phrase from get random Phrase Array " + withoutSpace );
	//let phraseChars = splitChars.replace(/\s+/g, '') ;
	return arr[randomNum];
}

//=======================Display the Phrase=====================================

function addPhraseToDisplay(arr){
	/*const ul = document.getElementById('phrase');*/
	for(let i = 0; i <= arr.length-1; i += 1){
		//if(arr[i] != ' '){
			let li = document.createElement('li');
			li.textContent = arr[i];
			//li.className = "letter";

	 		phrase.appendChild(li);
	 		
	 	//}
	 	if(arr[i] != ' '){
	 			li.className = "letter";

	 	}else{
	 		li.className = "space";

	 	}
	}
}

let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

//==========================Verify the chosen letter=============================

function checkLetter(button){
	let letter = document.getElementsByClassName("letter");
	let letterChosen = button.textContent;
	let str = "";
	for(let i = 0; i <= letter.length-1; i += 1){
		str += letter[i].textContent;
		
	}		
	for(let i = 0; i <= letter.length-1; i += 1){
			console.log("the string is " + str);
			if(str.toLowerCase().includes(letterChosen)){
				var n = str.indexOf(letterChosen);
				//Show the the letter if it is correct
				showLetter(letterChosen);
				return str.charAt(n);
			}
			else {
				return null;
			}
	}
}
	
//=============================Play the Game======================================

for(let i = but.length-1; i >= 0; i--)
{
	but[i].addEventListener('click', (e) => {
		letterFound = checkLetter(but[i]);
		but[i].className = "chosen";
		but[i].disabled = "true";
		if(letterFound === null)
		{	
			let li = document.getElementsByClassName("tries");
			if(li.length != 0){
				let ol = li[0].parentNode;
				ol.removeChild(li[0]);
				missed += 1;
				if(missed === 5)
				{
					body[0].className = "lose";
					overlay.style.display = 'inline';
					start[0].textContent = "Try Again!" ;
					title[0].textContent = "Better Luck! Next time" ;
					//addButton();			// Reset the game
					disableKeyboard(true);
				//	div.className = "lose";
				}
			}
		}
		else {
			checkWin();
		}
	});
}

//==============================Check the Victory=====================================

const letter = document.getElementsByClassName("letter").length;
	
function checkWin(){
	 
 
	let show = document.getElementsByClassName("show").length;

	console.log("Length of LETTER = " + letter  );
	console.log("Length of SHOW = " + show  );

	if(letter === show){
		disableKeyboard(true);
		body[0].className = "win";
		
		//div.className = "win";
		overlay.style.display = 'inline';

		start[0].textContent = "Reset the Game";
		title[0].textContent = "Congratulations! You Won"
		//addButton();
	}
}

//================================== Helpers ==========================================

function disableKeyboard(flag){
	for (let i = 0; i <= but.length-1; i += 1){
		but[i].className = "reset_keyboard";
		but[i].disabled = flag;
		//div.className = "reset-overlay";
	}
}
//console.log("resetGame properties " + resetGame());



function  resetGame(){

	missed = 0;
	disableKeyboard(false);
	removePhraseFromDisplay();
	const phraseArray = getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(phraseArray);
	body[0].classList.remove("win");
	body[0].classList.remove("lose");
	

	div.textContent = " ";
	//addButton();	
	let ol = document.getElementsByTagName('ol')[0];
	for (let i = 0; i < 5; i++){
			const liveHeart = document.createElement("IMG");
			liveHeart.setAttribute("src", "images/liveHeart.png");
			liveHeart.setAttribute("width", "30");
			liveHeart.setAttribute("height", "35");
			let list = document.createElement('li');
			list.appendChild(liveHeart);
			list.className = "tries";
			ol.appendChild(list);
	}
	
}

function removePhraseFromDisplay(){
	let ul = document.querySelector("phrase");
	let li = document.getElementsByTagName("LI");
	let i;
	for(i = li.length-1; i >= 0; i--){
			let ul = li[i].parentNode;
			ul.removeChild(ul.children[0]);
		}
	}



/*function addButton(){
	var button = document.createElement("a");
	button.textContent = "Reset";
	button.className = "reset_game";
	div.appendChild(button);*/
	start[0].addEventListener('click', () => {
							console.log("You clicked the reset button");
							disableKeyboard(false);
							resetGame();
	});



function showLetter(selectLetter){
	const letter = document.getElementsByClassName("letter");
	for( let i = letter.length-1; i >= 0 ; i--){
		if(letter[i].textContent.toLowerCase() == selectLetter){
			letter[i].style.transition = "2s";
			//letter[i].className ="show";
			letter[i].classList.add('show');
			continue;
		}
	}
}

