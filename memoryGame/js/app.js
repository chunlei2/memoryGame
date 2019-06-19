/*
 * Create a list that holds all of your cards
 */
const currentCards = []
const deck = document.querySelectorAll('.card')
// save class names into array
for (i = 0; i < deck.length; i++) {
    currentCards.push(deck[i].firstElementChild.className)
}
console.log(currentCards)


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// record current opened cards
 var openCards = [];
 
// record number of displayed
 var countCards = 0; 


// The reason I don't use openCards.length to count number of cards is I use setTimeout later
// So it may be possible that that card has been opened, you can't open more cards, but
// the card hasn't been added to the openCards array yet.
 var moveCount = 0;

 
// timer

var c = 0;
var t;
var timer_is_on = 0;

function timedCount() {
  document.getElementById("txt").value = c;
  c = c + 1;
  t = setTimeout(timedCount, 1000);
}

function startCount() {
  if (!timer_is_on) {
    timer_is_on = 1;
    timedCount();
  }
}

function stopCount() {
  clearTimeout(t);
  timer_is_on = 0;
}

startCount();

// Click the restart button
function restart() {
	// shuffle the cards
	const shuffledCards = shuffle(currentCards);
	// assign shuffled class name to each card
	for (i = 0; i < deck.length; i++) {
			deck[i].firstElementChild.className = shuffledCards[i];
			// make all cards unknown
			deck[i].className = "card";

	}
	// restart the moves
    document.querySelector(".moves").innerHTML = 0;
    document.querySelector(".stars").innerHTML = "<li><i class=\"fa fa-star\"></i></li>" +
        "<li><i class=\"fa fa-star\"></i></li>" +
            "<li><i class=\"fa fa-star\"></i></li>"
	moveCount = 0;
	countCards = 0;
	openCards = [];
	stopCount();
	c = 0;
	startCount();
 }

document.querySelector(".restart").onclick = function () { restart();}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 
 // display the card's symbol
 function displayCard(card){
	card.classList.add("open", "show");	
	countCards += 1;

 }
 
 function lockCards(cardA, cardB) {
	 cardA.classList.add("locked");
	 cardB.classList.add("locked");
 }
 
 // lock rest cards when matching
 
 // add card to open cards

 
 function addOpenCard(card) {
		if (openCards.length === 0) {
			openCards.push(card)
		}
		else {
			const firstCard = openCards.pop();
			if (card.firstElementChild.className === firstCard.firstElementChild.className) {
				lockCards(card, firstCard);
				countCards = 0;
			}
			else {
				card.className = "card";
				firstCard.className = "card";
				countCards = 0;
			}
		}
 }

function removeModal() {
    document.getElementById("myModal").style.display = "none";
}

// add click event to deck
document.querySelector(".deck").addEventListener('click', function(event) {
	if (event.target && event.target.nodeName == "LI" && !event.target.classList.contains("locked") && countCards <= 1 && event.target !== openCards[0]) {
		moveCount += 1
		document.querySelector(".moves").innerHTML = moveCount;
		displayCard(event.target);
		if (openCards.length === 0) {
			addOpenCard(event.target);
		}
		else {
			setTimeout(function () {addOpenCard(event.target)}, 1000);			
		}
		
	}
	if (moveCount === 30) {
		document.querySelector('.stars').removeChild(document.querySelector('.stars').lastElementChild);
	}
	if (moveCount === 45) {
		document.querySelector('.stars').removeChild(document.querySelector('.stars').lastElementChild);
	}
	if (moveCount === 60) {
		document.querySelector('.stars').removeChild(document.querySelector('.stars').lastElementChild);
	}
	if (document.querySelectorAll(".locked").length === 16) {
		stopCount();
		// Get the modal
		var modal = document.getElementById("myModal");
		modal.style.display = "block";

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		  modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		  if (event.target == modal) {
			modal.style.display = "none";
		  }
		}
		
		
		
		
	}
})



document.querySelector(".subB").onclick = function () {
    restart();
    removeModal();
}

